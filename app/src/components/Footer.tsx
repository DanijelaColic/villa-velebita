import { Mail, MapPin, Phone } from 'lucide-react';

/** Isti kao OWNER_EMAIL u .env (mapiran u next.config.ts). */
const OWNER_DISPLAY_EMAIL = process.env.NEXT_PUBLIC_OWNER_EMAIL?.trim() ?? '';

const NAV_LINKS = [
  { href: '/smjestaj', label: 'O smještaju' },
  { href: '/galerija', label: 'Galerija' },
  { href: '/sadrzaji', label: 'Sadržaji' },
  { href: '/lokacija', label: 'Lokacija' },
  { href: '/cjenik', label: 'Cijene' },
  { href: '/faq', label: 'FAQ' },
  { href: '/booking', label: 'Rezervacije' },
  { href: '/#kontakt', label: 'Kontakt' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-oak text-cream" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <p className="font-display text-2xl font-semibold text-cream mb-2">
              Villa Velebita
            </p>
            <p className="text-sm text-cream/60 uppercase tracking-widest mb-4">
              Rudopolje · Lika · Hrvatska
            </p>
            <p className="text-stone-light text-sm leading-relaxed max-w-xs">
              Autentična kameno-drvena kuća za odmor na 840 m nadmorske visine, 20 minuta
              od Plitvičkih jezera.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/50 mb-4">
              Navigacija
            </p>
            <nav aria-label="Footer navigacija">
              <ul className="space-y-2">
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-stone-light hover:text-cream transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/50 mb-4">
              Kontakt
            </p>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="size-4 text-terracotta mt-0.5 shrink-0" />
                <div className="text-sm text-stone-light leading-snug">
                  <span className="font-medium text-cream">Rudopolje 124</span>
                  <br />
                  53223 Vrhovine, Hrvatska
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="size-4 text-terracotta shrink-0" />
                <a
                  href="tel:+385919295907"
                  className="text-sm text-stone-light hover:text-cream transition-colors duration-150"
                >
                  091 929 5907
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="size-4 text-terracotta shrink-0" />
                <a
                  href="mailto:Ivica.cacic485@gmail.com"
                  className="text-sm text-stone-light hover:text-cream transition-colors duration-150 break-all"
                >
                  Ivica.cacic485@gmail.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-cream/40">
              © {year} Villa Velebita. Sva prava pridržana.
            </p>
            <p className="text-xs text-cream/40 mt-1">
              Stranicu izradio{' '}
              <a
                href="https://www.enkr.hr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-light hover:text-cream transition-colors duration-150"
              >
                ENKR
              </a>
              .
            </p>
          </div>
          <a
            href="https://wa.me/385919295907"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-stone-light hover:text-cream transition-colors duration-150"
          >
            WhatsApp: 091 929 5907
          </a>
        </div>
      </div>
    </footer>
  );
}
