'use client';

import { FormEvent, useState } from 'react';
import { Mail, Phone, UserRound } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

const CONTACT_PHONE_DISPLAY = '091 929 5907';
const CONTACT_PHONE_LINK = '+385919295907';
const CONTACT_NAME = 'Ivica Ćaćić';
const CONTACT_EMAIL = 'Ivica.cacic485@gmail.com';

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
        text: 'Hvala na upitu. Ivica će vas kontaktirati u najkraćem roku.',
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
        title="Javite se direktno vlasniku"
        subtitle="Za upit, termin ili dodatne informacije, pošaljite poruku ili nazovite."
      />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
        {/* Lijevo: fiksni kontakt podaci koje korisnik odmah vidi. */}
        <div className="bg-white rounded-card p-6 md:p-8 shadow-card space-y-5">
          <p className="text-stone leading-relaxed">
            Najbrži put do rezervacije je direktan kontakt. Ako želite, možete odmah nazvati ili
            poslati email.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <UserRound className="size-5 text-terracotta mt-0.5" />
              <div>
                <p className="text-sm text-stone">Vlasnik</p>
                <p className="text-oak font-semibold">{CONTACT_NAME}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="size-5 text-terracotta mt-0.5" />
              <div>
                <p className="text-sm text-stone">Telefon</p>
                <a
                  href={`tel:${CONTACT_PHONE_LINK}`}
                  className="text-oak font-semibold hover:text-terracotta transition-colors"
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="size-5 text-terracotta mt-0.5" />
              <div>
                <p className="text-sm text-stone">Email</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-oak font-semibold break-all hover:text-terracotta transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Desno: jednostavna forma koja šalje upit na backend endpoint. */}
        <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 md:p-8 shadow-card space-y-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-oak mb-1.5">
              Ime i prezime
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={form.name}
              onChange={event => setForm(prev => ({ ...prev, name: event.target.value }))}
              className="w-full rounded-btn border border-stone-pale bg-cream px-3.5 py-2.5 text-oak placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              placeholder="Vaše ime"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-oak mb-1.5">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={form.email}
              onChange={event => setForm(prev => ({ ...prev, email: event.target.value }))}
              className="w-full rounded-btn border border-stone-pale bg-cream px-3.5 py-2.5 text-oak placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              placeholder="vas@email.com"
            />
          </div>

          <div>
            <label htmlFor="contact-phone" className="block text-sm font-medium text-oak mb-1.5">
              Telefon (opcionalno)
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={form.phone}
              onChange={event => setForm(prev => ({ ...prev, phone: event.target.value }))}
              className="w-full rounded-btn border border-stone-pale bg-cream px-3.5 py-2.5 text-oak placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              placeholder="+385 ..."
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-oak mb-1.5">
              Poruka
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={form.message}
              onChange={event => setForm(prev => ({ ...prev, message: event.target.value }))}
              className="w-full rounded-btn border border-stone-pale bg-cream px-3.5 py-2.5 text-oak placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              placeholder="Napišite željeni termin, broj osoba i dodatna pitanja..."
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
