import { NextRequest, NextResponse } from 'next/server';
import { hasLocale } from 'next-intl';
import { sendContactEmail } from '@/modules/booking-admin/lib/email';
import { getMessagesForLocale } from '@/i18n/messages';
import { routing, type AppLocale } from '@/i18n/routing';

type ContactPayload = {
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  message?: string;
  locale?: string;
};

export async function POST(request: NextRequest) {
  let locale: AppLocale = routing.defaultLocale;
  let serverErrorMessage = 'Došlo je do greške pri slanju poruke. Pokušajte ponovno.';

  try {
    const payload = (await request.json()) as ContactPayload;
    locale = hasLocale(routing.locales, payload.locale)
      ? payload.locale
      : routing.defaultLocale;
    const messages = getMessagesForLocale(locale);
    const apiMessages = messages.contact.api;
    serverErrorMessage = apiMessages.serverError;

    const senderName = payload.senderName?.trim();
    const senderEmail = payload.senderEmail?.trim();
    const senderPhone = payload.senderPhone?.trim();
    const message = payload.message?.trim();

    if (!senderName || !senderEmail || !message) {
      return NextResponse.json(
        { error: apiMessages.validationError },
        { status: 400 },
      );
    }

    // Uključujemo i telefon u poruku kako vlasnik dobije sve u jednom emailu.
    const messageWithPhone = senderPhone
      ? `${message}\n\nTelefon pošiljatelja: ${senderPhone}`
      : message;

    await sendContactEmail({
      senderName,
      senderEmail,
      message: messageWithPhone,
      locale,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/contact] Contact form error:', err);

    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message
            ? err.message
            : serverErrorMessage,
      },
      { status: 500 },
    );
  }
}
