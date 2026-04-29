import { AppImage as Image } from '@/components/ui/AppImage';
import { ChevronDown, MapPin, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col" aria-label="Hero">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1768409233425-c5b6efec4eaf?w=1920&q=90&auto=format&fit=crop"
          alt="Dramatični planinski vrhovi u zlatnom satu – priroda Like i Velebita"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
        />
        {/* Gradient overlay – darker at top for navbar, lighter at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-oak/70 via-oak/40 to-oak/75" />
      </div>

      {/* Main content – vertically centred */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-24 pb-32">
        {/* Location badge */}
        <div className="flex items-center gap-1.5 text-cream/80 text-sm font-medium mb-6 tracking-wide">
          <MapPin className="size-4 text-terracotta-light" />
          <span>Rudopolje, Vrhovine · Lika, Hrvatska</span>
        </div>

        {/* H1 – inline dark backdrop samo iza teksta */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.3] max-w-4xl">
          <span className="bg-black/55 backdrop-blur-[2px] text-cream px-3 py-1 rounded-lg box-decoration-clone leading-[1.4]">
            Vaš mir u srcu{' '}
          </span>
          <span className="bg-black/55 backdrop-blur-[2px] text-terracotta-light italic px-3 py-1 rounded-lg box-decoration-clone leading-[1.4]">
            Like
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-cream max-w-2xl leading-relaxed [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
          Zamislite jutro uz šalicu kave na terasi s pogledom na netaknutu ličku
          prirodu. Rustikalna ljepota, moderni komfor i potpuna tišina – sve na
          jednom mjestu, 20 minuta od Plitvičkih jezera.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Button size="lg" asChild>
            <a href="#rezervacije">Rezervirajte odmor</a>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-cream text-cream hover:bg-cream hover:text-oak">
            <a href="#o-smjestaju">Upoznajte villu</a>
          </Button>
        </div>

        {/* Stats row */}
        <div className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-10">
          <Stat icon={<Users className="size-5" />} value="9 gostiju" label="Max kapacitet" />
          <Stat icon={<MapPin className="size-5" />} value="20 min" label="Do Plitvičkih jezera" />
          <Stat icon={<Star className="size-5" />} value="155 m²" label="Površina kuće" />
          <Stat icon={<Star className="size-5" />} value="840 m" label="Nadmorska visina" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/60 animate-bounce">
        <ChevronDown className="size-6" />
      </div>
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-cream">
      <div className="text-terracotta-light">{icon}</div>
      <span className="font-display text-xl font-semibold">{value}</span>
      <span className="text-xs text-cream/65 tracking-wide">{label}</span>
    </div>
  );
}
