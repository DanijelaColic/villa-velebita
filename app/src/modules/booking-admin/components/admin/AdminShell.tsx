'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LogOut,
  CalendarDays,
  Images,
  Newspaper,
  Type,
  Search,
} from 'lucide-react';
import clsx from 'clsx';
import { SITE_NAME } from '@/modules/booking-admin/booking.config';

const NAV_ITEMS = [
  { href: '/admin', label: 'Rezervacije', icon: CalendarDays, exact: true },
  { href: '/admin/gallery', label: 'Galerija', icon: Images },
  { href: '/admin/articles', label: 'Novosti', icon: Newspaper },
  { href: '/admin/content', label: 'Tekstovi', icon: Type },
  { href: '/admin/seo', label: 'SEO', icon: Search },
] as const;

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white sticky top-0 z-40 shadow-sm">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="font-serif text-lg font-semibold truncate">{SITE_NAME}</h1>
            <span className="text-white/50 text-sm hidden sm:inline shrink-0">Admin</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="text-white/70 hover:text-white flex items-center gap-1.5 text-sm transition-colors shrink-0"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Odjava</span>
          </button>
        </div>

        {/* Glavna navigacija – rezervacije + CMS sekcije */}
        <nav
          className="px-4 sm:px-6 pb-3 flex items-center gap-1 overflow-x-auto"
          aria-label="Admin navigacija"
        >
          {NAV_ITEMS.map(({ href, label, icon: Icon, ...rest }) => {
            const exact = 'exact' in rest && rest.exact;
            const active = isActive(pathname, href, exact);
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
                  active
                    ? 'bg-white text-primary'
                    : 'text-white/70 hover:text-white hover:bg-white/10',
                )}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</div>
    </div>
  );
}
