import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MapPin, Navigation } from 'lucide-react';

export function Location() {
  return (
    <SectionWrapper id="lokacija" bg="white">
      <SectionHeading
        label="Lokacija"
        title="U srcu svega"
        subtitle="Rudopolje 124, 53223 Vrhovine – savršena baza za istraživanje Plitvica i cijele Like."
      />

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Map embed */}
        <div className="rounded-card overflow-hidden shadow-warm aspect-[4/3]">
          <iframe
            title="Villa Velebita – lokacija na karti"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2815.0!2d15.2900!3d44.8870!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47632d0c0d0d0d0d%3A0x0!2sRudopolje+124%2C+53223+Vrhovine!5e0!3m2!1shr!2shr!4v1710000000000!5m2!1shr!2shr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        {/* Address */}
        <div className="space-y-6">
          <div className="flex items-start gap-3 p-4 bg-cream rounded-card">
            <MapPin className="size-5 text-terracotta mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-oak">Rudopolje 124</p>
              <p className="text-stone text-sm">53223 Vrhovine, Hrvatska</p>
              <a
                href="https://maps.google.com/?q=Rudopolje+124,+53223+Vrhovine"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-terracotta hover:text-terracotta-dark font-medium mt-2 transition-colors"
              >
                <Navigation className="size-3.5" />
                Otvori u Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
