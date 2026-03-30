import fs from 'node:fs';
import path from 'node:path';
import { ExperiencesClient, type ExperienceCategory } from './ExperiencesClient';

type CategoryWithFolder = Omit<ExperienceCategory, 'images'> & {
  folder: string;
};

const categories: CategoryWithFolder[] = [
  {
    id: 'priroda',
    label: 'Priroda',
    color: 'bg-forest',
    title: 'Netaknuta lička divljina',
    intro:
      'Lika je jedna od najočuvanijih regija Hrvatske – ovdje je priroda još uvijek na prvom mjestu. Oko kuće se rasprostiru prostrane šume, livade i planinski pejzaži koji mijenjaju lice sa svakim godišnjim dobom.',
    imageAlt: 'Netaknuta ličke šume i planinski pejzaž',
    folder: 'netaknuta-licka-divljina',
    activities: [
      { name: 'Nacionalni park Plitvička jezera', distance: '20 min vožnje', highlight: true },
      { name: 'Majerovo vrelo – izvor rijeke Gacke', distance: '10 min' },
      { name: 'Rijeka Gacka – kristalno čista voda', distance: '5 min' },
      { name: 'Planinarenje i pješačke staze', distance: 'od kuće' },
      { name: 'Vidikovci i panoramski pogledi', distance: 'u blizini' },
      { name: 'Šume, livade, svjež planinski zrak', distance: '840 m n.v.' },
    ],
  },
  {
    id: 'aktivnosti',
    label: 'Aktivnosti',
    color: 'bg-terracotta',
    title: 'Adrenalin i avantura',
    intro:
      'Za one koji traže više od pasivnog odmora – Rudopolje i okolica nude čitav spektar aktivnih doživljaja. Od najduljeg ziplinea u Europi do vožnje kvadovima kroz netaknutu prirodu.',
    imageAlt: 'Zipline avantura u prirodi',
    folder: 'adrenalin-i-avantura',
    activities: [
      { name: 'Zipline "Pazi Medo" – najduži u Europi', distance: 'tik uz kuću', highlight: true },
      { name: 'Vožnja kvadovima i motorima', distance: 'u okolici' },
      { name: 'Biciklističke rute kroz Liku', distance: 'od kuće' },
      { name: 'Ribolov na rijeci Gacki', distance: '5 min' },
      { name: 'Skijalište Mukinje (Plitvice)', distance: '20 min' },
      { name: 'Utočište medvjeda Kuterevo', distance: '30 min' },
    ],
  },
  {
    id: 'gastronomija',
    label: 'Gastronomija',
    color: 'bg-gold',
    title: 'Okusi Like',
    intro:
      'Uživajte u autentičnim okusima Like – lička mlada janjetina s ražnja, tradicionalna peka, domaći škripavac i basa, uz nezaobilaznu ličku kalju. U blizini kuće nalaze se restorani koje svakako vrijedi posjetiti i doživjeti pravu gastronomiju ovog kraja.',
    imageAlt: 'Tradicionalna lička hrana na roštilju',
    folder: 'okusi-like',
    activities: [
      { name: 'Restoran Big Bear (kamp)', distance: '3 min', highlight: true },
      { name: 'Restoran Jelen', distance: '5 min' },
      { name: 'Pizzeria Ruspante', distance: '20 min' },
      { name: 'Restorani u Otočcu', distance: '20 min' },
      { name: 'Vlastiti roštilj i pečenjara u kući', distance: 'u dvorištu' },
      { name: 'Konzum (Vrhovine / Otočac)', distance: '5–20 min' },
    ],
  },
  {
    id: 'izleti',
    label: 'Izleti',
    color: 'bg-oak',
    title: 'Sve što vrijedi vidjeti',
    intro:
      'Villa Velebita savršena je baza za istraživanje cijele regije. U sat vremena vožnje dostupne su najpopularnije atrakcije Like i Kvarnera – od UNESCO prirodne baštine do jadranskih plaža.',
    imageAlt: 'Plitvička jezera – UNESCO svjetska baština',
    folder: 'sve-sto-vrijedi-vidjeti',
    activities: [
      { name: 'Plitvička jezera (UNESCO)', distance: '20 min', highlight: true },
      { name: 'Lovište jelena lopatara u Ličkom Lešću', distance: '5 min' },
      { name: 'More – Senj / Karlobag', distance: '55 min' },
      { name: 'Grad Otočac', distance: '20 min' },
      { name: 'Pošta Vrhovine', distance: '5 min' },
      { name: 'Dom zdravlja Otočac', distance: '20 min' },
    ],
  },
];

export function Experiences() {
  const basePublicDir = path.join(process.cwd(), 'public', 'images', 'experiences');

  const categoriesWithImages: ExperienceCategory[] = categories.map(cat => {
    const diskDir = path.join(basePublicDir, cat.folder);
    let files: string[] = [];

    try {
      files = fs
        .readdirSync(diskDir, { withFileTypes: true })
        .filter(d => d.isFile())
        .map(d => d.name)
        .filter(name => /\.(jpe?g|png|webp|gif|avif)$/i.test(name))
        .sort((a, b) => a.localeCompare(b, 'hr'));
    } catch {
      files = [];
    }

    const coverIdx = files.findIndex(f => /^cover\./i.test(f));
    if (coverIdx > 0) {
      const [cover] = files.splice(coverIdx, 1);
      files.unshift(cover);
    }

    const images = files.map(file => `/images/experiences/${cat.folder}/${file}`);

    return {
      id: cat.id,
      label: cat.label,
      color: cat.color,
      title: cat.title,
      intro: cat.intro,
      imageAlt: cat.imageAlt,
      images,
      activities: cat.activities,
    };
  });

  return <ExperiencesClient categories={categoriesWithImages} />;
}
