export const GALLERY_CATEGORIES = [
  { key: 'exterior-entrance', label: 'Eksterijer i ulaz' },
  { key: 'ground-floor', label: 'Prizemlje – kuhinja i druženje' },
  { key: 'first-floor', label: 'Kat – opuštanje i udobnost' },
  { key: 'attic', label: 'Potkrovlje – odmor i pogledi' },
  { key: 'gazebo', label: 'Sjenica – druženje na otvorenom' },
  { key: 'nature', label: 'Priroda i panoramski pogledi' },
  { key: 'tastes-of-lika', label: 'Okusi Like' },
] as const;

export type GalleryCategoryKey = (typeof GALLERY_CATEGORIES)[number]['key'];

export const DEFAULT_GALLERY_CATEGORY: GalleryCategoryKey = 'exterior-entrance';

export function isGalleryCategoryKey(value: string): value is GalleryCategoryKey {
  return GALLERY_CATEGORIES.some((category) => category.key === value);
}

export function getGalleryCategoryLabel(categoryKey: string) {
  return (
    GALLERY_CATEGORIES.find((category) => category.key === categoryKey)?.label ??
    'Bez kategorije'
  );
}
