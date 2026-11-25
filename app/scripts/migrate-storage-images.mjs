#!/usr/bin/env node
/**
 * Backup + migracija gallery-media / cms-media → WebP thumb (~480) + large (~1600).
 *
 * NE pokretati protiv produkcije bez eksplicitnog odobrenja.
 * Pokrenuti tek kad je Supabase Free ponovno dostupan.
 *
 * Usage:
 *   node --env-file=.env.local scripts/migrate-storage-images.mjs --dry-run
 *   node --env-file=.env.local scripts/migrate-storage-images.mjs --backup-only
 *   node --env-file=.env.local scripts/migrate-storage-images.mjs --apply
 *
 * --dry-run      listira fileove, ništa ne piše
 * --backup-only  download originala u backups/supabase-media-YYYYMMDD/
 * --apply        backup (ako nema) + upload thumb/large pored originala (NE briše originale)
 */

import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const BUCKETS = ['gallery-media', 'cms-media'];
const THUMB_W = 480;
const LARGE_W = 1600;
const CACHE_CONTROL = 'public, max-age=31536000, immutable';

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run') || (!args.has('--apply') && !args.has('--backup-only'));
const backupOnly = args.has('--backup-only');
const apply = args.has('--apply');

function requireEnv(name) {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

function baseFromPath(storagePath) {
  return storagePath
    .replace(/-thumb\.webp$/i, '')
    .replace(/-large\.webp$/i, '')
    .replace(/-orig\.[^.]+$/i, '')
    .replace(/\.[^.]+$/, '');
}

function isAlreadyVariant(storagePath) {
  return (
    /-thumb\.webp$/i.test(storagePath) ||
    /-large\.webp$/i.test(storagePath) ||
    /-orig\.[^.]+$/i.test(storagePath)
  );
}

async function listAllFiles(supabase, bucket) {
  const out = [];
  async function walk(prefix = '') {
    const { data, error } = await supabase.storage.from(bucket).list(prefix, {
      limit: 1000,
      sortBy: { column: 'name', order: 'asc' },
    });
    if (error) throw error;
    for (const entry of data ?? []) {
      const full = prefix ? `${prefix}/${entry.name}` : entry.name;
      // folder: id null / no metadata size sometimes
      if (entry.id && entry.metadata) {
        out.push(full);
      } else if (!entry.id || entry.name) {
        // try recurse into "folders"
        if (!entry.metadata) {
          await walk(full);
        }
      }
    }
  }
  await walk('');
  // Deduplicate + filter image-like
  return [...new Set(out)].filter(
    (p) =>
      /\.(jpe?g|png|webp|gif|avif)$/i.test(p) &&
      !isAlreadyVariant(p),
  );
}

async function optimize(buffer) {
  const img = sharp(buffer, { failOn: 'none' }).rotate();
  const [thumb, large] = await Promise.all([
    img
      .clone()
      .resize({ width: THUMB_W, withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 78, effort: 4 })
      .toBuffer(),
    img
      .clone()
      .resize({ width: LARGE_W, withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 80, effort: 4 })
      .toBuffer(),
  ]);
  return { thumb, large };
}

async function main() {
  const url = requireEnv('NEXT_PUBLIC_SUPABASE_URL');
  const key = requireEnv('SUPABASE_SERVICE_KEY');
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const stamp = new Date().toISOString().slice(0, 10);
  const backupRoot = path.resolve(`backups/supabase-media-${stamp}`);

  console.log('Mode:', dryRun ? 'DRY-RUN' : backupOnly ? 'BACKUP-ONLY' : 'APPLY');
  console.log('Backup dir:', backupRoot);

  if (!dryRun) {
    await fs.mkdir(backupRoot, { recursive: true });
  }

  let totals = { files: 0, bytesIn: 0, bytesThumb: 0, bytesLarge: 0 };

  for (const bucket of BUCKETS) {
    console.log(`\n=== Bucket: ${bucket} ===`);
    const files = await listAllFiles(supabase, bucket);
    console.log(`Candidates (non-variant images): ${files.length}`);

    for (const storagePath of files) {
      totals.files += 1;
      const base = baseFromPath(storagePath);
      const thumbPath = `${base}-thumb.webp`;
      const largePath = `${base}-large.webp`;

      console.log(`- ${storagePath}`);
      console.log(`    → ${thumbPath}`);
      console.log(`    → ${largePath}`);

      if (dryRun) continue;

      const { data, error } = await supabase.storage.from(bucket).download(storagePath);
      if (error || !data) {
        console.error('  DOWNLOAD FAIL:', error?.message);
        continue;
      }

      const input = Buffer.from(await data.arrayBuffer());
      totals.bytesIn += input.length;

      const localDir = path.join(backupRoot, bucket, path.dirname(storagePath));
      await fs.mkdir(localDir, { recursive: true });
      await fs.writeFile(path.join(backupRoot, bucket, storagePath), input);

      if (backupOnly) continue;

      const { thumb, large } = await optimize(input);
      totals.bytesThumb += thumb.length;
      totals.bytesLarge += large.length;

      const upThumb = await supabase.storage.from(bucket).upload(thumbPath, thumb, {
        contentType: 'image/webp',
        cacheControl: CACHE_CONTROL,
        upsert: true,
      });
      if (upThumb.error) {
        console.error('  THUMB FAIL:', upThumb.error.message);
        continue;
      }

      const upLarge = await supabase.storage.from(bucket).upload(largePath, large, {
        contentType: 'image/webp',
        cacheControl: CACHE_CONTROL,
        upsert: true,
      });
      if (upLarge.error) {
        console.error('  LARGE FAIL:', upLarge.error.message);
        continue;
      }

      console.log(
        `  OK in=${(input.length / 1024).toFixed(0)}KB thumb=${(thumb.length / 1024).toFixed(0)}KB large=${(large.length / 1024).toFixed(0)}KB`,
      );
    }
  }

  console.log('\n=== Summary ===');
  console.log(JSON.stringify(totals, null, 2));
  if (dryRun) {
    console.log('\nRe-run with --backup-only or --apply when Supabase is available.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
