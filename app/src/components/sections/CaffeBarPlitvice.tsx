import fs from 'node:fs';
import path from 'node:path';
import { CaffeBarPlitviceClient } from './CaffeBarPlitviceClient';

const imageExtensions = /\.(jpe?g|png|webp|gif|avif)$/i;

function getCaffeBarImages() {
  const folder = path.join(process.cwd(), 'public', 'images', 'caffe-bar-plitvice');
  let files: string[] = [];

  try {
    files = fs
      .readdirSync(folder, { withFileTypes: true })
      .filter(entry => entry.isFile())
      .map(entry => entry.name)
      .filter(name => imageExtensions.test(name))
      .sort((a, b) => a.localeCompare(b, 'hr'));
  } catch {
    files = [];
  }

  const coverIdx = files.findIndex(file => /^cover\./i.test(file));
  if (coverIdx > 0) {
    const [cover] = files.splice(coverIdx, 1);
    files.unshift(cover);
  }

  return files.map(file => `/images/caffe-bar-plitvice/${file}`);
}

export function CaffeBarPlitvice() {
  const images = getCaffeBarImages();

  return <CaffeBarPlitviceClient images={images} />;
}
