'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type NavEntry =
  | { kind: 'route'; href: string; label: string }
  | { kind: 'hash'; id: string; label: string };

const navEntries: NavEntry[] = [
  { kind: 'route', href: '/smjestaj', label: 'O smještaju' },
  { kind: 'route', href: '/galerija', label: 'Galerija' },
  { kind: 'route', href: '/sadrzaji', label: 'Sadržaji' },
  { kind: 'route', href: '/cjenik', label: 'Cijene' },
  { kind: 'route', href: '/booking', label: 'Rezervacije' },
  { kind: 'hash', id: 'kontakt', label: 'Kontakt' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';
  /** Na početnoj: svijetli tekst iznad heroa dok nije skrol; na svim ostalim rutama uvijek tamni tekst na svijetloj traci. */
  const solidNav = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = cn(
    'text-sm font-medium tracking-wide transition-colors hover:text-terracotta',
    solidNav ? 'text-oak' : 'text-cream/90 drop-shadow',
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        solidNav
          ? 'bg-cream/95 backdrop-blur-md shadow-card border-b border-stone-pale/60'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className={cn(
              'font-display font-semibold text-xl md:text-2xl transition-colors',
              solidNav ? 'text-oak' : 'text-cream drop-shadow-md',
            )}
            onClick={e => {
              setOpen(false);
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            Villa <span className="text-terracotta-light">Velebita</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navEntries.map(entry => {
              if (entry.kind === 'route') {
                return (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className={linkClass}
                    onClick={() => setOpen(false)}
                  >
                    {entry.label}
                  </Link>
                );
              }
              const href = pathname === '/' ? `#${entry.id}` : `/#${entry.id}`;
              return (
                <a
                  key={entry.id}
                  href={href}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {entry.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+385919295907"
              className={cn(
                'flex items-center gap-1.5 text-sm font-medium transition-colors',
                solidNav ? 'text-oak hover:text-terracotta' : 'text-cream/90 hover:text-cream drop-shadow',
              )}
            >
              <Phone className="size-4" />
              <span>091 929 5907</span>
            </a>
            <Button size="sm" asChild>
              <Link href="/booking">Rezervirajte</Link>
            </Button>
          </div>

          <button
            onClick={() => setOpen(v => !v)}
            className={cn(
              'lg:hidden p-2 rounded-btn transition-colors',
              solidNav ? 'text-oak hover:bg-cream-dark' : 'text-cream hover:bg-white/10',
            )}
            aria-label="Izbornik"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300',
          open ? 'max-h-screen' : 'max-h-0',
        )}
      >
        <nav className="bg-cream border-t border-stone-pale px-4 py-4 flex flex-col gap-1">
          {navEntries.map(entry => {
            if (entry.kind === 'route') {
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-oak font-medium rounded-btn hover:bg-cream-dark hover:text-terracotta transition-colors"
                >
                  {entry.label}
                </Link>
              );
            }
            const href = pathname === '/' ? `#${entry.id}` : `/#${entry.id}`;
            return (
              <a
                key={entry.id}
                href={href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-oak font-medium rounded-btn hover:bg-cream-dark hover:text-terracotta transition-colors"
              >
                {entry.label}
              </a>
            );
          })}
          <div className="mt-3 pt-3 border-t border-stone-pale flex flex-col gap-2">
            <a
              href="tel:+385919295907"
              className="flex items-center gap-2 px-3 py-2 text-oak font-medium"
            >
              <Phone className="size-4 text-terracotta" />
              091 929 5907
            </a>
            <Button asChild className="w-full">
              <Link href="/booking" onClick={() => setOpen(false)}>
                Rezervirajte odmor
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
