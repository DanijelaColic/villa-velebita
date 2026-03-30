import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/modules/booking-admin/lib/email';

type ContactPayload = {
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  message?: string;
};

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as ContactPayload;

    const senderName = payload.senderName?.trim();
    const senderEmail = payload.senderEmail?.trim();
    const senderPhone = payload.senderPhone?.trim();
    const message = payload.message?.trim();

    if (!senderName || !senderEmail || !message) {
      return NextResponse.json(
        { error: 'Ime, email i poruka su obavezni.' },
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
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/contact] Contact form error:', err);
    return NextResponse.json(
      { error: 'Došlo je do greške pri slanju poruke. Pokušajte ponovno.' },
      { status: 500 },
    );
  }
}
