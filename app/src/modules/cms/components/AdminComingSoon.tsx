'use client';

import { Newspaper, Type, Search } from 'lucide-react';

const ICONS = {
  articles: Newspaper,
  content: Type,
  seo: Search,
} as const;

type Props = {
  title: string;
  description: string;
  section: keyof typeof ICONS;
};

/** Privremeni placeholder dok se CMS sekcija ne implementira (koraci 3–7). */
export default function AdminComingSoon({ title, description, section }: Props) {
  const Icon = ICONS[section];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-16 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon size={22} />
      </div>
      <h2 className="font-serif text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 max-w-md mx-auto">{description}</p>
      <p className="mt-4 text-xs text-gray-400">Uskoro dostupno</p>
    </div>
  );
}
