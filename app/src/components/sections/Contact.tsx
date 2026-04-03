'use client';

import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

/** Slika u `app/public/images/contact/` — uskladite s pravim imenom datoteke. */
const OWNER_PHOTO_SRC = '/images/contact/vlasnici.jpg.jpeg';

const ADDRESS_LINES = ['Rudopolje 124', '53223 Vrhovine, Hrvatska'] as const;
const ADDRESS_MAP_QUERY = 'Rudopolje 124, 53223 Vrhovine, Hrvatska';

/** Ugrađena karta (bez API ključa). */
const GOOGLE_MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_MAP_QUERY)}&hl=hr&z=15&output=embed`;

/** Izravno otvara Google Karte s uputama do odredišta (unos polaznog mjesta u aplikaciji). */
const GOOGLE_MAPS_DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_MAP_QUERY)}`;

const CONTACT_NAME = 'Ivica i Ivana Ćaćić';
const CONTACTS = [
  {
    label: 'Ivana',
    phoneDisplay: '095 750 3811',
    phoneLink: '+385957503811',
    email: 'Ivana.cacic485@gmail.com',
  },
  {
    label: 'Ivica',
    phoneDisplay: '091 929 5907',
    phoneLink: '+385919295907',
    email: 'Ivica.cacic485@gmail.com',
  },
];

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export function Contact() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [isSending, setIsSending] = useState(false);
  const [ownerPhotoVisible, setOwnerPhotoVisible] = useState(true);
  const [status, setStatus] = useState<{ type: 'idle' | 'ok' | 'error'; text: string }>({
    type: 'idle',
    text: '',
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setStatus({ type: 'idle', text: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: form.name,
          senderEmail: form.email,
          senderPhone: form.phone,
          message: form.message,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? 'Došlo je do greške. Pokušajte ponovno.');
      }

      setStatus({
        type: 'ok',
        text: 'Hvala na upitu. Ivica ili Ivana će vas kontaktirati u najkraćem roku.',
      });
      setForm(initialFormState);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Došlo je do greške. Pokušajte ponovno.';
      setStatus({ type: 'error', text: message });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <SectionWrapper id="kontakt" bg="cream-dark">
      <SectionHeading
        label="Kontakt"
        title="Javite se vlasnicima"
        subtitle="Poruka ili poziv — odgovorimo u najkraćem roku."
        className="mb-8 md:mb-10"
      />

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        <div className="bg-white rounded-card p-5 md:p-6 shadow-card space-y-5">
          {ownerPhotoVisible && (
            <div className="relative mx-auto w-full max-w-sm aspect-4/3 rounded-btn overflow-hidden border border-stone-pale bg-cream">
              <Image
                src={OWNER_PHOTO_SRC}
                alt={`${CONTACT_NAME}, vlasnici Ville Velebita`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 384px"
                priority
                onError={() => setOwnerPhotoVisible(false)}
              />
            </div>
          )}

          <p className="text-stone text-sm md:text-base leading-relaxed">
            Villa Velebita nije samo kuća za odmor - to je mjesto gdje će vas dočekati Ivica i
            Ivana Ćaćić, bračni par koji s ljubavlju i pažnjom brine o svakom detalju. Njihova
            najveća želja je da se svaki gost osjeća kao kod kuće - opušteno, dobrodošlo i
            bezbrižno, od prvog kontakta pa sve do odlaska.
          </p>

          <div className="space-y-3">
            <div>
              <p className="text-oak font-semibold text-base md:text-lg">{CONTACT_NAME}</p>
              <p className="text-sm text-stone mt-0.5">Vlasnici i domaćini</p>
            </div>

            <ul className="space-y-4">
              {CONTACTS.map(contact => (
                <li
                  key={`${contact.label}-${contact.email}`}
                  className="flex flex-col gap-1.5 text-sm"
                >
                  <span className="font-semibold text-oak">{contact.label}</span>
                  <a
                    href={`tel:${contact.phoneLink}`}
                    className="inline-flex items-center gap-2 text-oak hover:text-terracotta transition-colors"
                  >
                    <Phone className="size-4 text-terracotta shrink-0" aria-hidden />
                    {contact.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2 text-oak break-all hover:text-terracotta transition-colors"
                  >
                    <Mail className="size-4 text-terracotta shrink-0" aria-hidden />
                    {contact.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5 border-t border-stone-pale pt-5">
            <div className="flex items-start gap-3 rounded-btn border border-stone-pale bg-cream px-4 py-3">
              <MapPin className="size-5 text-terracotta mt-0.5 shrink-0" aria-hidden />
              <div className="min-w-0 text-sm">
                <p className="text-stone font-medium">Adresa</p>
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-oak font-semibold hover:text-terracotta transition-colors"
                >
                  {ADDRESS_LINES.map((line, i) => (
                    <span key={line} className="block">
                      {line}
                      {i === 0 ? ',' : ''}
                    </span>
                  ))}
                </a>
              </div>
            </div>

            <div className="rounded-btn border border-stone-pale overflow-hidden bg-stone-pale/30 shadow-sm">
              <div className="relative aspect-video w-full min-h-[200px] md:min-h-[240px]">
                <iframe
                  title="Lokacija Villa Velebita — Google Karte"
                  src={GOOGLE_MAPS_EMBED_SRC}
                  className="absolute inset-0 size-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={GOOGLE_MAPS_DIRECTIONS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white px-4 py-3 text-sm font-semibold text-oak hover:bg-cream hover:text-terracotta transition-colors border-t border-stone-pale"
              >
                <Navigation className="size-4 shrink-0 text-terracotta" aria-hidden />
                Upute do smještaja u Google Kartama
              </a>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-card p-5 md:p-6 shadow-card space-y-3.5"
        >
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-oak mb-1">
              Ime i prezime
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={form.name}
              onChange={event => setForm(prev => ({ ...prev, name: event.target.value }))}
              className="w-full rounded-btn border border-stone-pale bg-cream px-3.5 py-2 text-oak placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              placeholder="Vaše ime"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-oak mb-1">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={form.email}
              onChange={event => setForm(prev => ({ ...prev, email: event.target.value }))}
              className="w-full rounded-btn border border-stone-pale bg-cream px-3.5 py-2 text-oak placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              placeholder="vas@email.com"
            />
          </div>

          <div>
            <label htmlFor="contact-phone" className="block text-sm font-medium text-oak mb-1">
              Telefon (opcionalno)
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={form.phone}
              onChange={event => setForm(prev => ({ ...prev, phone: event.target.value }))}
              className="w-full rounded-btn border border-stone-pale bg-cream px-3.5 py-2 text-oak placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              placeholder="+385 ..."
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-oak mb-1">
              Poruka
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={form.message}
              onChange={event => setForm(prev => ({ ...prev, message: event.target.value }))}
              className="w-full rounded-btn border border-stone-pale bg-cream px-3.5 py-2 text-oak placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              placeholder="Termin, broj osoba, pitanja…"
            />
          </div>

          <Button type="submit" loading={isSending} className="w-full md:w-auto">
            Pošaljite upit
          </Button>

          {status.type !== 'idle' && (
            <p className={status.type === 'ok' ? 'text-green-700 text-sm' : 'text-red-700 text-sm'}>
              {status.text}
            </p>
          )}
        </form>
      </div>
    </SectionWrapper>
  );
}
