'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { href: '#o-smjestaju', label: 'O smještaju' },
  { href: '#sadrzaji', label: 'Sadržaji' },
  { href: '#aktivnosti', label: 'Aktivnosti' },
  { href: '#cijene', label: 'Cijene' },
  { href: '#rezervacije', label: 'Rezervacije' },
  { href: '#kontakt', label: 'Kontakt' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-card border-b border-stone-pale/60'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'font-display font-semibold text-xl md:text-2xl transition-colors',
              scrolled ? 'text-oak' : 'text-cream drop-shadow-md',
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

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors hover:text-terracotta',
                  scrolled ? 'text-oak' : 'text-cream/90 drop-shadow',
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+385919295907"
              className={cn(
                'flex items-center gap-1.5 text-sm font-medium transition-colors',
                scrolled ? 'text-oak hover:text-terracotta' : 'text-cream/90 hover:text-cream drop-shadow',
              )}
            >
              <Phone className="size-4" />
              <span>091 929 5907</span>
            </a>
            <Button size="sm" asChild>
              <a href="#rezervacije">Rezervirajte</a>
            </Button>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(v => !v)}
            className={cn(
              'lg:hidden p-2 rounded-btn transition-colors',
              scrolled ? 'text-oak hover:bg-cream-dark' : 'text-cream hover:bg-white/10',
            )}
            aria-label="Izbornik"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300',
          open ? 'max-h-screen' : 'max-h-0',
        )}
      >
        <nav className="bg-cream border-t border-stone-pale px-4 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-oak font-medium rounded-btn hover:bg-cream-dark hover:text-terracotta transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 pt-3 border-t border-stone-pale flex flex-col gap-2">
            <a
              href="tel:+385919295907"
              className="flex items-center gap-2 px-3 py-2 text-oak font-medium"
            >
              <Phone className="size-4 text-terracotta" />
              091 929 5907
            </a>
            <Button asChild className="w-full">
              <a href="#rezervacije" onClick={() => setOpen(false)}>
                Rezervirajte odmor
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
