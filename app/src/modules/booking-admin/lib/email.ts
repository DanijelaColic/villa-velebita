import { Resend } from 'resend';
import { formatDisplayDate, addDays } from './dates';
import { generateHUB3Buffer, generateEPCBuffer } from './barcode';
import { createBookingViewToken } from './booking-view-token';
import { bookingPublicViewUrl } from './site-url';
import {
  SITE_NAME,
  SITE_LOCATION,
  OWNER_EMAIL,
  OWNER_PHONE,
  RECIPIENT_IBAN,
  RECIPIENT_NAME,
  RECIPIENT_BIC,
  RECIPIENT_BANK_NAME,
  DEPOSIT_PERCENT,
  BALANCE_DAYS_BEFORE_CHECK_IN,
  CANCELLATION_POLICY_LINES_HR,
  INVOICE_POLICY_HR,
  apartments,
} from '../booking.config';
import type { BookingEmailData } from '../types';

export type { BookingEmailData };

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — emails will not be sent');
    return null;
  }
  return new Resend(apiKey);
}

const FROM = () => process.env.RESEND_FROM ?? 'onboarding@resend.dev';
const OWNER = () => OWNER_EMAIL || (process.env.OWNER_EMAIL ?? '');

function resolveRecipient(actualTo: string): string {
  const test = process.env.RESEND_TEST_RECIPIENT?.trim();
  return test || actualTo;
}

const DEPOSIT_PCT_DISPLAY = Math.round(DEPOSIT_PERCENT * 100);
const BALANCE_PCT_DISPLAY = 100 - DEPOSIT_PCT_DISPLAY;
const BASE_PRICE_PER_NIGHT = apartments[0]?.priceOffSeason ?? 490;

/** Osnovna zaštita od HTML u korisničkim poljima u predlošcima. */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function balanceDueDateLabel(checkIn: Date): string {
  return formatDisplayDate(addDays(checkIn, -BALANCE_DAYS_BEFORE_CHECK_IN));
}

function emailTermsHrHtml(): string {
  const lis = CANCELLATION_POLICY_LINES_HR.map(
    (line) => `<li style="margin:8px 0;line-height:1.55;">${esc(line)}</li>`,
  ).join('');
  return `
      <div style="background:#f8fafc;border-radius:10px;padding:18px 16px;margin:22px 0;border:1px solid #e2e8f0;">
        <h3 style="margin:0 0 10px;font-size:16px;color:#1c2b35;line-height:1.3;">Otkazivanje (depozit)</h3>
        <ul style="margin:0;padding-left:20px;color:#475569;font-size:15px;line-height:1.55;">${lis}</ul>
        <p style="margin:14px 0 0;color:#475569;font-size:15px;line-height:1.6;"><strong style="color:#1c2b35;">Računi:</strong> ${esc(INVOICE_POLICY_HR)}</p>
      </div>`;
}

/** Zajednički mobile-first omotač: čitljiv font ≥16px, uža margina na uskim ekranima. */
function emailShell(inner: string, lang = 'hr'): string {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
</head>
<body style="margin:0;padding:12px;background:#f1f5f9;-webkit-text-size-adjust:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-sizing:border-box;">
    ${inner}
  </div>
</body>
</html>`;
}

function publicViewCtaBlock(url: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:20px 0 0;">
      <tr>
        <td style="padding:0;">
          <a href="${esc(url)}" style="display:block;background:#1e4a5f;color:#ffffff;padding:16px 20px;border-radius:12px;text-align:center;text-decoration:none;font-size:17px;font-weight:600;line-height:1.35;-webkit-tap-highlight-color:transparent;">
            Otvori rezervaciju i QR kodove
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.55;color:#64748b;">
      Jednim dodirom prikazujete sve podatke o boravku te <strong style="color:#334155;">HUB3</strong> i <strong style="color:#334155;">SEPA QR</strong> za uplatu depozita — prilagođeno čitanju na mobitelu.
    </p>`;
}

export async function sendNewBookingEmails(data: BookingEmailData) {
  const resend = getResend();
  if (!resend) return;

  const checkInStr = formatDisplayDate(data.checkIn);
  const checkOutStr = formatDisplayDate(data.checkOut);
  const reference = data.bookingId
    ? `REZ-${data.bookingId.substring(0, 8).toUpperCase()}`
    : null;
  const viewToken = data.bookingId ? createBookingViewToken(data.bookingId) : null;
  const publicViewUrl = viewToken ? bookingPublicViewUrl(viewToken) : null;
  if (data.bookingId && !publicViewUrl) {
    console.warn(
      '[email] BOOKING_VIEW_SECRET nije postavljen — u mailu gosta nema poveznice na /rezervacija/pregled.',
    );
  }
  const fullData: FullData = {
    ...data,
    checkInStr,
    checkOutStr,
    reference,
    publicViewUrl,
  };

  const attachments: { filename: string; content: string }[] = [];
  if (reference && RECIPIENT_IBAN) {
    const [hub3, epc] = await Promise.allSettled([
      generateHUB3Buffer(data.deposit, data.guestName, reference),
      generateEPCBuffer(data.deposit, data.guestName, reference),
    ]);
    if (hub3.status === 'fulfilled') {
      attachments.push({ filename: 'qr-placanje-hr.png', content: hub3.value.toString('base64') });
    } else {
      console.error('[email] HUB3 generation failed:', hub3.reason);
    }
    if (epc.status === 'fulfilled') {
      attachments.push({ filename: 'qr-placanje-eu.png', content: epc.value.toString('base64') });
    } else {
      console.error('[email] EPC QR generation failed:', epc.reason);
    }
  }

  const [guestResult, ownerResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM(),
      to: data.guestEmail,
      subject: `Upit zaprimljen – ${data.apartmentName} | ${SITE_NAME}`,
      html: guestReceivedHtml(fullData),
      ...(attachments.length > 0 && { attachments }),
    }),
    resend.emails.send({
      from: FROM(),
      to: resolveRecipient(OWNER()),
      subject: `Nova rezervacija – ${data.guestName} | ${data.apartmentName}`,
      html: ownerNewBookingHtml(fullData),
    }),
  ]);

  if (guestResult.status === 'rejected') console.error('[email] Guest email failed:', guestResult.reason);
  if (ownerResult.status === 'rejected') console.error('[email] Owner email failed:', ownerResult.reason);
}

export async function sendConfirmationEmail(data: BookingEmailData) {
  const resend = getResend();
  if (!resend) return;

  const checkInStr = formatDisplayDate(data.checkIn);
  const checkOutStr = formatDisplayDate(data.checkOut);
  const reference = data.bookingId
    ? `REZ-${data.bookingId.substring(0, 8).toUpperCase()}`
    : null;
  const viewToken = data.bookingId ? createBookingViewToken(data.bookingId) : null;
  const publicViewUrl = viewToken ? bookingPublicViewUrl(viewToken) : null;
  if (data.bookingId && !publicViewUrl) {
    console.warn(
      '[email] BOOKING_VIEW_SECRET nije postavljen — u mailu potvrde nema poveznice na /rezervacija/pregled.',
    );
  }
  const fullData: FullData = {
    ...data,
    checkInStr,
    checkOutStr,
    reference,
    publicViewUrl,
  };

  const attachments: { filename: string; content: string }[] = [];
  if (reference && RECIPIENT_IBAN) {
    const [hub3, epc] = await Promise.allSettled([
      generateHUB3Buffer(data.deposit, data.guestName, reference),
      generateEPCBuffer(data.deposit, data.guestName, reference),
    ]);
    if (hub3.status === 'fulfilled') {
      attachments.push({ filename: 'qr-placanje-hr.png', content: hub3.value.toString('base64') });
    }
    if (epc.status === 'fulfilled') {
      attachments.push({ filename: 'qr-placanje-eu.png', content: epc.value.toString('base64') });
    }
  }

  const result = await resend.emails.send({
    from: FROM(),
    to: resolveRecipient(data.guestEmail),
    subject: `Rezervacija potvrđena ✓ – ${data.apartmentName} | ${SITE_NAME}`,
    html: guestConfirmedHtml(fullData),
    ...(attachments.length > 0 && { attachments }),
  });

  if (result.error) console.error('[email] Confirmation email failed:', result.error);
}

export async function sendContactEmail(opts: {
  senderName: string;
  senderEmail: string;
  message: string;
}) {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: FROM(),
    to: resolveRecipient(OWNER()),
    subject: `Nova poruka s weba – ${opts.senderName}`,
    html: contactEmailHtml(opts),
  });
}

type FullData = BookingEmailData & {
  checkInStr: string;
  checkOutStr: string;
  reference: string | null;
  publicViewUrl: string | null;
};

function guestReceivedHtml(d: FullData) {
  const name = esc(d.guestName);
  const apt = esc(d.apartmentName);
  const inner = `
    <div style="background:#1e4a5f;padding:22px 18px;text-align:center;">
      <h1 style="color:#ffffff;font-size:22px;margin:0;line-height:1.25;font-weight:600;">${esc(SITE_NAME)}</h1>
      ${SITE_LOCATION ? `<p style="color:#d4b896;margin:8px 0 0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">${esc(SITE_LOCATION)}</p>` : ''}
    </div>
    <div style="padding:22px 18px 28px;">
      <p style="font-size:17px;margin:0 0 12px;line-height:1.45;color:#1c2b35;">Poštovani ${name},</p>
      <p style="color:#475569;font-size:16px;line-height:1.6;margin:0;">Zaprimili smo vaš upit za rezervaciju. Javit ćemo vam se u najkraćem roku s odgovorom i sljedećim koracima.</p>

      <div style="background:#fdf8f3;border-radius:10px;padding:18px 16px;margin:20px 0;border-left:4px solid #c4975a;">
        <h2 style="font-size:15px;margin:0 0 14px;color:#b8860b;text-transform:uppercase;letter-spacing:0.06em;line-height:1.3;">Sažetak</h2>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">Smještaj</strong> ${apt}</p>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">Dolazak</strong> ${esc(d.checkInStr)} od 14:00</p>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">Odlazak</strong> ${esc(d.checkOutStr)} do 11:00</p>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">Noćenja</strong> ${d.nights}</p>
        <p style="margin:14px 0 0;padding-top:12px;border-top:1px solid #f0e6d3;font-size:18px;line-height:1.4;color:#1e4a5f;font-weight:700;">Ukupno: ${d.totalPrice} €</p>
        <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#64748b;">Osnovna cijena: ${BASE_PRICE_PER_NIGHT} EUR/noć</p>
      </div>

      ${RECIPIENT_IBAN ? `
      <div style="background:#fffbeb;border-radius:10px;padding:18px 16px;margin:18px 0;">
        <h3 style="margin:0 0 12px;font-size:16px;color:#1c2b35;line-height:1.3;">Plaćanje</h3>
        <p style="margin:0;font-size:16px;line-height:1.6;color:#475569;">
          <strong style="color:#1c2b35;">Depozit (${DEPOSIT_PCT_DISPLAY}%):</strong> ${d.deposit} € — plaća se pri potvrdi rezervacije.
        </p>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.6;color:#475569;">
          <strong style="color:#1c2b35;">Ostatak (${BALANCE_PCT_DISPLAY}%):</strong> ${d.totalPrice - d.deposit} € — najkasnije <strong style="color:#1c2b35;">${BALANCE_DAYS_BEFORE_CHECK_IN} dana prije dolaska</strong> (rok oko ${esc(balanceDueDateLabel(d.checkIn))}), na isti IBAN.
        </p>
        <div style="margin:14px 0 0;padding:12px 14px;background:#ffffff;border:1px solid #fde68a;border-radius:8px;font-size:15px;line-height:1.55;word-break:break-word;">
          ${RECIPIENT_NAME ? `<span style="display:block;font-weight:600;color:#1c2b35;margin-bottom:6px;">${esc(RECIPIENT_NAME)}</span>` : ''}
          <span style="font-family:ui-monospace,monospace;">IBAN: ${esc(RECIPIENT_IBAN)}</span>
        </div>
        <p style="margin:10px 0 0;font-size:14px;line-height:1.5;color:#64748b;">
          ${esc(RECIPIENT_BANK_NAME)} · BIC/SWIFT: <strong style="font-family:ui-monospace,monospace;color:#334155;">${esc(RECIPIENT_BIC)}</strong>
        </p>
        <p style="margin:8px 0 0;font-size:14px;color:#64748b;">Poziv na broj / model: <strong style="color:#1c2b35;">${esc(d.reference ?? `${d.guestName} — ${d.apartmentName}`)}</strong></p>
        ${d.reference ? `
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 16px;margin-top:16px;font-size:15px;line-height:1.55;color:#1e40af;">
          <strong style="color:#1e3a8a;">Privitci u ovom e-mailu:</strong> QR kodovi samo za <strong>depozit</strong>.<br>
          · <em>qr-placanje-hr.png</em> — hrvatske banke (HUB3)<br>
          · <em>qr-placanje-eu.png</em> — Revolut, N26, Wise, SEPA
        </div>` : ''}
        ${d.publicViewUrl ? publicViewCtaBlock(d.publicViewUrl) : ''}
      </div>` : ''}

      ${emailTermsHrHtml()}

      ${OWNER_EMAIL ? `
      <p style="color:#64748b;font-size:15px;line-height:1.6;margin:20px 0 0;">
        Za pitanja: <a href="mailto:${esc(OWNER_EMAIL)}" style="color:#1e4a5f;font-weight:500;">${esc(OWNER_EMAIL)}</a>${OWNER_PHONE ? ` · ${esc(OWNER_PHONE)}` : ''}
      </p>` : ''}
    </div>
    <div style="background:#e2e8f0;padding:16px 18px;text-align:center;">
      <p style="margin:0;font-size:13px;line-height:1.45;color:#64748b;">${esc(SITE_NAME)}${OWNER_EMAIL ? ` · ${esc(OWNER_EMAIL)}` : ''}</p>
    </div>`;
  return emailShell(inner);
}

function guestConfirmedHtml(d: FullData) {
  const name = esc(d.guestName);
  const apt = esc(d.apartmentName);
  const inner = `
    <div style="background:#1e4a5f;padding:22px 18px;text-align:center;">
      <h1 style="color:#ffffff;font-size:22px;margin:0;line-height:1.25;font-weight:600;">${esc(SITE_NAME)}</h1>
      ${SITE_LOCATION ? `<p style="color:#d4b896;margin:8px 0 0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">${esc(SITE_LOCATION)}</p>` : ''}
    </div>
    <div style="padding:22px 18px 28px;">
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 16px;margin-bottom:20px;text-align:center;">
        <p style="margin:0;font-size:17px;color:#166534;font-weight:700;line-height:1.35;">Rezervacija je potvrđena</p>
      </div>
      <p style="font-size:17px;margin:0 0 12px;line-height:1.45;color:#1c2b35;">Poštovani ${name},</p>
      <p style="color:#475569;font-size:16px;line-height:1.6;margin:0;">Radujemo se vašem dolasku! U nastavku su podaci o boravku i plaćanju.</p>

      <div style="background:#fdf8f3;border-radius:10px;padding:18px 16px;margin:20px 0;border-left:4px solid #c4975a;">
        <h2 style="font-size:15px;margin:0 0 14px;color:#b8860b;text-transform:uppercase;letter-spacing:0.06em;">Sažetak</h2>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">Smještaj</strong> ${apt}</p>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">Dolazak</strong> ${esc(d.checkInStr)} od 14:00</p>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">Odlazak</strong> ${esc(d.checkOutStr)} do 11:00</p>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">Noćenja</strong> ${d.nights}</p>
        <p style="margin:14px 0 0;padding-top:12px;border-top:1px solid #f0e6d3;font-size:18px;color:#1e4a5f;font-weight:700;">Ukupno: ${d.totalPrice} €</p>
        <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#64748b;">Osnovna cijena: ${BASE_PRICE_PER_NIGHT} EUR/noć</p>
      </div>

      ${RECIPIENT_IBAN ? `
      <div style="background:#fffbeb;border-radius:10px;padding:18px 16px;margin:18px 0;">
        <h3 style="margin:0 0 10px;font-size:16px;color:#1c2b35;">Plaćanje</h3>
        <p style="margin:0;font-size:16px;line-height:1.6;color:#475569;">
          <strong style="color:#1c2b35;">Depozit (${DEPOSIT_PCT_DISPLAY}%):</strong> ${d.deposit} € — ako još nije plaćen, molimo uplatite što prije.
        </p>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.6;color:#475569;">
          <strong style="color:#1c2b35;">Ostatak (${BALANCE_PCT_DISPLAY}%):</strong> ${d.totalPrice - d.deposit} € — najkasnije ${BALANCE_DAYS_BEFORE_CHECK_IN} dana prije dolaska (oko ${esc(balanceDueDateLabel(d.checkIn))}), isti IBAN.
        </p>
        <div style="margin:14px 0 0;padding:12px 14px;background:#ffffff;border:1px solid #fde68a;border-radius:8px;font-size:15px;word-break:break-word;line-height:1.55;">
          ${RECIPIENT_NAME ? `<span style="display:block;font-weight:600;color:#1c2b35;margin-bottom:6px;">${esc(RECIPIENT_NAME)}</span>` : ''}
          <span style="font-family:ui-monospace,monospace;">IBAN: ${esc(RECIPIENT_IBAN)}</span>
        </div>
        <p style="margin:8px 0 0;font-size:14px;color:#64748b;">Poziv: <strong style="color:#1c2b35;">${esc(d.reference ?? `${d.guestName} — ${d.apartmentName}`)}</strong></p>
        ${d.reference ? `
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 16px;margin-top:16px;font-size:15px;line-height:1.55;color:#1e40af;">
          <strong>Privitci:</strong> QR kodovi za <strong>depozit</strong> — <em>qr-placanje-hr.png</em> (HR banke), <em>qr-placanje-eu.png</em> (SEPA).
        </div>` : ''}
        ${d.publicViewUrl ? publicViewCtaBlock(d.publicViewUrl) : ''}
      </div>` : d.publicViewUrl ? `<div style="padding:0 0 8px;">${publicViewCtaBlock(d.publicViewUrl)}</div>` : ''}

      ${OWNER_EMAIL ? `
      <p style="color:#64748b;font-size:15px;line-height:1.6;margin:18px 0 0;">
        Pitanja? <a href="mailto:${esc(OWNER_EMAIL)}" style="color:#1e4a5f;font-weight:500;">${esc(OWNER_EMAIL)}</a>${OWNER_PHONE ? ` · ${esc(OWNER_PHONE)}` : ''}
      </p>` : ''}
    </div>
    <div style="background:#e2e8f0;padding:16px 18px;text-align:center;">
      <p style="margin:0;font-size:13px;color:#64748b;">${esc(SITE_NAME)}${OWNER_EMAIL ? ` · ${esc(OWNER_EMAIL)}` : ''}</p>
    </div>`;
  return emailShell(inner);
}

function ownerNewBookingHtml(d: FullData) {
  const inner = `
    <div style="background:#1e4a5f;padding:20px 18px;">
      <h1 style="color:#ffffff;font-size:19px;margin:0;line-height:1.3;">Nova rezervacija</h1>
    </div>
    <div style="padding:20px 18px 24px;">
      <p style="margin:0 0 14px;font-size:17px;font-weight:600;color:#c4975a;line-height:1.3;">${esc(d.apartmentName)}</p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#64748b;display:inline-block;min-width:100px;">Gost</strong> ${esc(d.guestName)}</p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#64748b;display:inline-block;min-width:100px;">E-pošta</strong> <a href="mailto:${esc(d.guestEmail)}" style="color:#1e4a5f;word-break:break-all;">${esc(d.guestEmail)}</a></p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#64748b;display:inline-block;min-width:100px;">Telefon</strong> ${esc(d.guestPhone ?? '—')}</p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#64748b;display:inline-block;min-width:100px;">Dolazak</strong> ${esc(d.checkInStr)}</p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#64748b;display:inline-block;min-width:100px;">Odlazak</strong> ${esc(d.checkOutStr)}</p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#64748b;display:inline-block;min-width:100px;">Noćenja</strong> ${d.nights}</p>
      <p style="margin:16px 0 0;padding-top:14px;border-top:1px solid #e2e8f0;font-size:18px;font-weight:700;color:#1e4a5f;">Ukupno: ${d.totalPrice} €</p>
      <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#64748b;">Osnovna cijena: ${BASE_PRICE_PER_NIGHT} EUR/noć</p>
      <p style="margin:10px 0;font-size:15px;color:#475569;">Depozit (${DEPOSIT_PCT_DISPLAY}%): ${d.deposit} €</p>
      <p style="margin:10px 0;font-size:15px;color:#475569;">Ostatak (${BALANCE_PCT_DISPLAY}%): ${d.totalPrice - d.deposit} € · rok ${BALANCE_DAYS_BEFORE_CHECK_IN} d prije dolaska</p>
      ${RECIPIENT_IBAN ? `<p style="margin:10px 0;font-size:14px;font-family:ui-monospace,monospace;word-break:break-all;color:#334155;">IBAN: ${esc(RECIPIENT_IBAN)}</p>` : ''}
      ${RECIPIENT_BIC ? `<p style="margin:10px 0;font-size:14px;color:#475569;">BIC: ${esc(RECIPIENT_BIC)} (${esc(RECIPIENT_BANK_NAME)})</p>` : ''}
    </div>`;
  return emailShell(inner);
}

function contactEmailHtml(d: { senderName: string; senderEmail: string; message: string }) {
  const inner = `
    <div style="background:#1e4a5f;padding:20px 18px;">
      <h1 style="color:#ffffff;font-size:19px;margin:0;">Nova poruka s web stranice</h1>
    </div>
    <div style="padding:20px 18px 24px;">
      <p style="margin:12px 0;font-size:16px;line-height:1.55;"><strong style="color:#64748b;">Ime</strong> ${esc(d.senderName)}</p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;"><strong style="color:#64748b;">E-pošta</strong> <a href="mailto:${esc(d.senderEmail)}" style="color:#1e4a5f;">${esc(d.senderEmail)}</a></p>
      <div style="background:#f8fafc;border-radius:10px;padding:16px;margin-top:16px;border:1px solid #e2e8f0;">
        <p style="margin:0;font-size:16px;color:#334155;line-height:1.65;white-space:pre-wrap;word-break:break-word;">${esc(d.message)}</p>
      </div>
    </div>`;
  return emailShell(inner);
}
