import { Resend } from 'resend';
import { hasLocale } from 'next-intl';
import { formatDisplayDate, addDays } from './dates';
import { generateHUB3Buffer, generateEPCBuffer } from './barcode';
import { createBookingViewToken } from './booking-view-token';
import { bookingPublicViewUrl } from './site-url';
import { getMessagesForLocale, getValidLocale } from '@/i18n/messages';
import { routing, type AppLocale } from '@/i18n/routing';
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

function fill(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

function balanceDueDateLabel(checkIn: Date, locale: AppLocale): string {
  return formatDisplayDate(addDays(checkIn, -BALANCE_DAYS_BEFORE_CHECK_IN), locale);
}

function emailTermsHtml(messages: {
  cancellationTitle: string;
  cancellationLines: string[];
  invoiceLabel: string;
  invoiceText: string;
}): string {
  const lis = messages.cancellationLines.map(
    (line) => `<li style="margin:8px 0;line-height:1.55;">${esc(line)}</li>`,
  ).join('');
  return `
      <div style="background:#f8fafc;border-radius:10px;padding:18px 16px;margin:22px 0;border:1px solid #e2e8f0;">
        <h3 style="margin:0 0 10px;font-size:16px;color:#1c2b35;line-height:1.3;">${esc(
          messages.cancellationTitle,
        )}</h3>
        <ul style="margin:0;padding-left:20px;color:#475569;font-size:15px;line-height:1.55;">${lis}</ul>
        <p style="margin:14px 0 0;color:#475569;font-size:15px;line-height:1.6;"><strong style="color:#1c2b35;">${esc(
          messages.invoiceLabel,
        )}:</strong> ${esc(messages.invoiceText)}</p>
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

function publicViewCtaBlock(
  url: string,
  messages: {
    button: string;
    hint: string;
  },
): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:20px 0 0;">
      <tr>
        <td style="padding:0;">
          <a href="${esc(url)}" style="display:block;background:#1e4a5f;color:#ffffff;padding:16px 20px;border-radius:12px;text-align:center;text-decoration:none;font-size:17px;font-weight:600;line-height:1.35;-webkit-tap-highlight-color:transparent;">
            ${esc(messages.button)}
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.55;color:#64748b;">
      ${esc(messages.hint)}
    </p>`;
}

export async function sendNewBookingEmails(data: BookingEmailData) {
  const resend = getResend();
  if (!resend) return;
  const ownerEmail = resolveRecipient(OWNER()).trim();
  const locale = getValidLocale(data.locale);
  const emailMessages = await getBookingEmailMessages(locale);

  const checkInStr = formatDisplayDate(data.checkIn, locale);
  const checkOutStr = formatDisplayDate(data.checkOut, locale);
  const reference = data.bookingId
    ? `REZ-${data.bookingId.substring(0, 8).toUpperCase()}`
    : null;
  const viewToken = data.bookingId ? createBookingViewToken(data.bookingId) : null;
  const publicViewUrl = viewToken ? bookingPublicViewUrl(viewToken, locale) : null;
  if (data.bookingId && !publicViewUrl) {
    console.warn(
      '[email] BOOKING_VIEW_SECRET nije postavljen — u mailu gosta nema poveznice na /rezervacija/pregled.',
    );
  }
  const fullData: FullData = {
    ...data,
    locale,
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

  const emailTasks = [
    resend.emails.send({
      from: FROM(),
      to: data.guestEmail,
      subject: `${emailMessages.received.subject} – ${data.apartmentName} | ${SITE_NAME}`,
      html: guestReceivedHtml(fullData, emailMessages),
      ...(attachments.length > 0 && { attachments }),
    }),
  ];

  if (ownerEmail) {
    emailTasks.push(
      resend.emails.send({
        from: FROM(),
        to: ownerEmail,
        subject: `${emailMessages.owner.subject} – ${data.guestName} | ${data.apartmentName}`,
        html: ownerNewBookingHtml(fullData, emailMessages),
      }),
    );
  } else {
    console.warn('[email] OWNER_EMAIL not set — owner booking notification skipped');
  }

  const [guestResult, ownerResult] = await Promise.allSettled(emailTasks);

  if (guestResult.status === 'rejected') console.error('[email] Guest email failed:', guestResult.reason);
  if (guestResult.status === 'fulfilled' && guestResult.value.error) {
    console.error('[email] Guest email API error:', guestResult.value.error);
  }
  if (ownerResult?.status === 'rejected') console.error('[email] Owner email failed:', ownerResult.reason);
  if (ownerResult?.status === 'fulfilled' && ownerResult.value.error) {
    console.error('[email] Owner email API error:', ownerResult.value.error);
  }
}

export async function sendConfirmationEmail(data: BookingEmailData) {
  const resend = getResend();
  if (!resend) return;
  const locale = getValidLocale(data.locale);
  const emailMessages = await getBookingEmailMessages(locale);

  const checkInStr = formatDisplayDate(data.checkIn, locale);
  const checkOutStr = formatDisplayDate(data.checkOut, locale);
  const reference = data.bookingId
    ? `REZ-${data.bookingId.substring(0, 8).toUpperCase()}`
    : null;
  const viewToken = data.bookingId ? createBookingViewToken(data.bookingId) : null;
  const publicViewUrl = viewToken ? bookingPublicViewUrl(viewToken, locale) : null;
  if (data.bookingId && !publicViewUrl) {
    console.warn(
      '[email] BOOKING_VIEW_SECRET nije postavljen — u mailu potvrde nema poveznice na /rezervacija/pregled.',
    );
  }
  const fullData: FullData = {
    ...data,
    locale,
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
    subject: `${emailMessages.confirmed.subject} ✓ – ${data.apartmentName} | ${SITE_NAME}`,
    html: guestConfirmedHtml(fullData, emailMessages),
    ...(attachments.length > 0 && { attachments }),
  });

  if (result.error) console.error('[email] Confirmation email failed:', result.error);
}

export async function sendContactEmail(opts: {
  senderName: string;
  senderEmail: string;
  message: string;
  locale?: string;
}) {
  const resend = getResend();
  if (!resend) return;
  const locale: AppLocale = hasLocale(routing.locales, opts.locale)
    ? opts.locale
    : routing.defaultLocale;
  const emailMessages = await getContactEmailMessages(locale);

  await resend.emails.send({
    from: FROM(),
    to: resolveRecipient(OWNER()),
    subject: `${emailMessages.subjectPrefix} – ${opts.senderName}`,
    html: contactEmailHtml(opts, emailMessages),
  });
}

type FullData = BookingEmailData & {
  locale: AppLocale;
  checkInStr: string;
  checkOutStr: string;
  reference: string | null;
  publicViewUrl: string | null;
};

function guestReceivedHtml(d: FullData, messages: Awaited<ReturnType<typeof getBookingEmailMessages>>) {
  const apt = esc(d.apartmentName);
  const inner = `
    <div style="background:#1e4a5f;padding:22px 18px;text-align:center;">
      <h1 style="color:#ffffff;font-size:22px;margin:0;line-height:1.25;font-weight:600;">${esc(SITE_NAME)}</h1>
      ${SITE_LOCATION ? `<p style="color:#d4b896;margin:8px 0 0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">${esc(SITE_LOCATION)}</p>` : ''}
    </div>
    <div style="padding:22px 18px 28px;">
      <p style="font-size:17px;margin:0 0 12px;line-height:1.45;color:#1c2b35;">${esc(
        fill(messages.received.greeting, { name: d.guestName }),
      )}</p>
      <p style="color:#475569;font-size:16px;line-height:1.6;margin:0;">${esc(messages.received.intro)}</p>

      <div style="background:#fdf8f3;border-radius:10px;padding:18px 16px;margin:20px 0;border-left:4px solid #c4975a;">
        <h2 style="font-size:15px;margin:0 0 14px;color:#b8860b;text-transform:uppercase;letter-spacing:0.06em;line-height:1.3;">${esc(messages.shared.summaryTitle)}</h2>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">${esc(messages.shared.accommodationLabel)}</strong> ${apt}</p>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">${esc(messages.shared.checkInLabel)}</strong> ${esc(d.checkInStr)} ${esc(messages.shared.checkInTime)}</p>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">${esc(messages.shared.checkOutLabel)}</strong> ${esc(d.checkOutStr)} ${esc(messages.shared.checkOutTime)}</p>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">${esc(messages.shared.nightsLabel)}</strong> ${d.nights}</p>
        <p style="margin:14px 0 0;padding-top:12px;border-top:1px solid #f0e6d3;font-size:18px;line-height:1.4;color:#1e4a5f;font-weight:700;">${esc(messages.shared.totalLabel)}: ${d.totalPrice} €</p>
        <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#64748b;">${esc(
          fill(messages.shared.basePrice, { price: BASE_PRICE_PER_NIGHT }),
        )}</p>
      </div>

      ${RECIPIENT_IBAN ? `
      <div style="background:#fffbeb;border-radius:10px;padding:18px 16px;margin:18px 0;">
        <h3 style="margin:0 0 12px;font-size:16px;color:#1c2b35;line-height:1.3;">${esc(messages.shared.paymentTitle)}</h3>
        <p style="margin:0;font-size:16px;line-height:1.6;color:#475569;">
          <strong style="color:#1c2b35;">${esc(
            fill(messages.shared.depositLabel, { percent: DEPOSIT_PCT_DISPLAY }),
          )}:</strong> ${d.deposit} € — ${esc(messages.received.depositNote)}
        </p>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.6;color:#475569;">
          <strong style="color:#1c2b35;">${esc(
            fill(messages.shared.balanceLabel, { percent: BALANCE_PCT_DISPLAY }),
          )}:</strong> ${d.totalPrice - d.deposit} € — ${esc(
            fill(messages.shared.balanceNote, {
              days: BALANCE_DAYS_BEFORE_CHECK_IN,
              dueDate: balanceDueDateLabel(d.checkIn, d.locale),
            }),
          )}
        </p>
        <div style="margin:14px 0 0;padding:12px 14px;background:#ffffff;border:1px solid #fde68a;border-radius:8px;font-size:15px;line-height:1.55;word-break:break-word;">
          ${RECIPIENT_NAME ? `<span style="display:block;font-weight:600;color:#1c2b35;margin-bottom:6px;">${esc(RECIPIENT_NAME)}</span>` : ''}
          <span style="font-family:ui-monospace,monospace;">IBAN: ${esc(RECIPIENT_IBAN)}</span>
        </div>
        <p style="margin:10px 0 0;font-size:14px;line-height:1.5;color:#64748b;">
          ${esc(RECIPIENT_BANK_NAME)} · BIC/SWIFT: <strong style="font-family:ui-monospace,monospace;color:#334155;">${esc(RECIPIENT_BIC)}</strong>
        </p>
        <p style="margin:8px 0 0;font-size:14px;color:#64748b;">${esc(messages.shared.referenceLabel)}: <strong style="color:#1c2b35;">${esc(d.reference ?? `${d.guestName} — ${d.apartmentName}`)}</strong></p>
        ${d.reference ? `
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 16px;margin-top:16px;font-size:15px;line-height:1.55;color:#1e40af;">
          <strong style="color:#1e3a8a;">${esc(messages.shared.attachmentsTitle)}</strong> ${esc(
            messages.shared.attachmentsBody,
          )}<br>
          · <em>qr-placanje-hr.png</em> — ${esc(messages.shared.hub3Banks)}<br>
          · <em>qr-placanje-eu.png</em> — ${esc(messages.shared.epcBanks)}
        </div>` : ''}
        ${d.publicViewUrl ? publicViewCtaBlock(d.publicViewUrl, messages.shared.publicView) : ''}
      </div>` : ''}

      ${emailTermsHtml(messages.terms)}

      ${OWNER_EMAIL ? `
      <p style="color:#64748b;font-size:15px;line-height:1.6;margin:20px 0 0;">
        ${esc(messages.shared.questions)} <a href="mailto:${esc(OWNER_EMAIL)}" style="color:#1e4a5f;font-weight:500;">${esc(OWNER_EMAIL)}</a>${OWNER_PHONE ? ` · ${esc(OWNER_PHONE)}` : ''}
      </p>` : ''}
    </div>
    <div style="background:#e2e8f0;padding:16px 18px;text-align:center;">
      <p style="margin:0;font-size:13px;line-height:1.45;color:#64748b;">${esc(SITE_NAME)}${OWNER_EMAIL ? ` · ${esc(OWNER_EMAIL)}` : ''}</p>
    </div>`;
  return emailShell(inner, d.locale);
}

function guestConfirmedHtml(d: FullData, messages: Awaited<ReturnType<typeof getBookingEmailMessages>>) {
  const apt = esc(d.apartmentName);
  const inner = `
    <div style="background:#1e4a5f;padding:22px 18px;text-align:center;">
      <h1 style="color:#ffffff;font-size:22px;margin:0;line-height:1.25;font-weight:600;">${esc(SITE_NAME)}</h1>
      ${SITE_LOCATION ? `<p style="color:#d4b896;margin:8px 0 0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">${esc(SITE_LOCATION)}</p>` : ''}
    </div>
    <div style="padding:22px 18px 28px;">
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 16px;margin-bottom:20px;text-align:center;">
        <p style="margin:0;font-size:17px;color:#166534;font-weight:700;line-height:1.35;">${esc(
          messages.confirmed.badge,
        )}</p>
      </div>
      <p style="font-size:17px;margin:0 0 12px;line-height:1.45;color:#1c2b35;">${esc(
        fill(messages.confirmed.greeting, { name: d.guestName }),
      )}</p>
      <p style="color:#475569;font-size:16px;line-height:1.6;margin:0;">${esc(messages.confirmed.intro)}</p>

      <div style="background:#fdf8f3;border-radius:10px;padding:18px 16px;margin:20px 0;border-left:4px solid #c4975a;">
        <h2 style="font-size:15px;margin:0 0 14px;color:#b8860b;text-transform:uppercase;letter-spacing:0.06em;">${esc(messages.shared.summaryTitle)}</h2>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">${esc(messages.shared.accommodationLabel)}</strong> ${apt}</p>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">${esc(messages.shared.checkInLabel)}</strong> ${esc(d.checkInStr)} ${esc(messages.shared.checkInTime)}</p>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">${esc(messages.shared.checkOutLabel)}</strong> ${esc(d.checkOutStr)} ${esc(messages.shared.checkOutTime)}</p>
        <p style="margin:10px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#1c2b35;display:inline-block;min-width:108px;">${esc(messages.shared.nightsLabel)}</strong> ${d.nights}</p>
        <p style="margin:14px 0 0;padding-top:12px;border-top:1px solid #f0e6d3;font-size:18px;color:#1e4a5f;font-weight:700;">${esc(messages.shared.totalLabel)}: ${d.totalPrice} €</p>
        <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#64748b;">${esc(
          fill(messages.shared.basePrice, { price: BASE_PRICE_PER_NIGHT }),
        )}</p>
      </div>

      ${RECIPIENT_IBAN ? `
      <div style="background:#fffbeb;border-radius:10px;padding:18px 16px;margin:18px 0;">
        <h3 style="margin:0 0 10px;font-size:16px;color:#1c2b35;">${esc(messages.shared.paymentTitle)}</h3>
        <p style="margin:0;font-size:16px;line-height:1.6;color:#475569;">
          <strong style="color:#1c2b35;">${esc(
            fill(messages.shared.depositLabel, { percent: DEPOSIT_PCT_DISPLAY }),
          )}:</strong> ${d.deposit} € — ${esc(messages.confirmed.depositNote)}
        </p>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.6;color:#475569;">
          <strong style="color:#1c2b35;">${esc(
            fill(messages.shared.balanceLabel, { percent: BALANCE_PCT_DISPLAY }),
          )}:</strong> ${d.totalPrice - d.deposit} € — ${esc(
            fill(messages.shared.balanceNote, {
              days: BALANCE_DAYS_BEFORE_CHECK_IN,
              dueDate: balanceDueDateLabel(d.checkIn, d.locale),
            }),
          )}
        </p>
        <div style="margin:14px 0 0;padding:12px 14px;background:#ffffff;border:1px solid #fde68a;border-radius:8px;font-size:15px;word-break:break-word;line-height:1.55;">
          ${RECIPIENT_NAME ? `<span style="display:block;font-weight:600;color:#1c2b35;margin-bottom:6px;">${esc(RECIPIENT_NAME)}</span>` : ''}
          <span style="font-family:ui-monospace,monospace;">IBAN: ${esc(RECIPIENT_IBAN)}</span>
        </div>
        <p style="margin:8px 0 0;font-size:14px;color:#64748b;">${esc(messages.shared.referenceShort)}: <strong style="color:#1c2b35;">${esc(d.reference ?? `${d.guestName} — ${d.apartmentName}`)}</strong></p>
        ${d.reference ? `
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 16px;margin-top:16px;font-size:15px;line-height:1.55;color:#1e40af;">
          <strong>${esc(messages.shared.attachmentsShort)}:</strong> ${esc(messages.shared.attachmentsBody)} <em>qr-placanje-hr.png</em> (${esc(messages.shared.hub3Banks)}), <em>qr-placanje-eu.png</em> (${esc(messages.shared.epcBanks)}).
        </div>` : ''}
        ${d.publicViewUrl ? publicViewCtaBlock(d.publicViewUrl, messages.shared.publicView) : ''}
      </div>` : d.publicViewUrl ? `<div style="padding:0 0 8px;">${publicViewCtaBlock(d.publicViewUrl, messages.shared.publicView)}</div>` : ''}

      ${OWNER_EMAIL ? `
      <p style="color:#64748b;font-size:15px;line-height:1.6;margin:18px 0 0;">
        ${esc(messages.shared.questions)} <a href="mailto:${esc(OWNER_EMAIL)}" style="color:#1e4a5f;font-weight:500;">${esc(OWNER_EMAIL)}</a>${OWNER_PHONE ? ` · ${esc(OWNER_PHONE)}` : ''}
      </p>` : ''}
    </div>
    <div style="background:#e2e8f0;padding:16px 18px;text-align:center;">
      <p style="margin:0;font-size:13px;color:#64748b;">${esc(SITE_NAME)}${OWNER_EMAIL ? ` · ${esc(OWNER_EMAIL)}` : ''}</p>
    </div>`;
  return emailShell(inner, d.locale);
}

function ownerNewBookingHtml(d: FullData, messages: Awaited<ReturnType<typeof getBookingEmailMessages>>) {
  const inner = `
    <div style="background:#1e4a5f;padding:20px 18px;">
      <h1 style="color:#ffffff;font-size:19px;margin:0;line-height:1.3;">${esc(messages.owner.title)}</h1>
    </div>
    <div style="padding:20px 18px 24px;">
      <p style="margin:0 0 14px;font-size:17px;font-weight:600;color:#c4975a;line-height:1.3;">${esc(d.apartmentName)}</p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#64748b;display:inline-block;min-width:100px;">${esc(messages.owner.guest)}</strong> ${esc(d.guestName)}</p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#64748b;display:inline-block;min-width:100px;">${esc(messages.owner.email)}</strong> <a href="mailto:${esc(d.guestEmail)}" style="color:#1e4a5f;word-break:break-all;">${esc(d.guestEmail)}</a></p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#64748b;display:inline-block;min-width:100px;">${esc(messages.owner.phone)}</strong> ${esc(d.guestPhone ?? '—')}</p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#64748b;display:inline-block;min-width:100px;">${esc(messages.owner.checkIn)}</strong> ${esc(d.checkInStr)}</p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#64748b;display:inline-block;min-width:100px;">${esc(messages.owner.checkOut)}</strong> ${esc(d.checkOutStr)}</p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;color:#334155;"><strong style="color:#64748b;display:inline-block;min-width:100px;">${esc(messages.owner.nights)}</strong> ${d.nights}</p>
      <p style="margin:16px 0 0;padding-top:14px;border-top:1px solid #e2e8f0;font-size:18px;font-weight:700;color:#1e4a5f;">${esc(messages.shared.totalLabel)}: ${d.totalPrice} €</p>
      <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#64748b;">${esc(
        fill(messages.shared.basePrice, { price: BASE_PRICE_PER_NIGHT }),
      )}</p>
      <p style="margin:10px 0;font-size:15px;color:#475569;">${esc(
        fill(messages.shared.depositLabel, { percent: DEPOSIT_PCT_DISPLAY }),
      )}: ${d.deposit} €</p>
      <p style="margin:10px 0;font-size:15px;color:#475569;">${esc(
        fill(messages.shared.balanceLabel, { percent: BALANCE_PCT_DISPLAY }),
      )}: ${d.totalPrice - d.deposit} € · ${esc(
        fill(messages.owner.balanceDeadline, { days: BALANCE_DAYS_BEFORE_CHECK_IN }),
      )}</p>
      ${RECIPIENT_IBAN ? `<p style="margin:10px 0;font-size:14px;font-family:ui-monospace,monospace;word-break:break-all;color:#334155;">IBAN: ${esc(RECIPIENT_IBAN)}</p>` : ''}
      ${RECIPIENT_BIC ? `<p style="margin:10px 0;font-size:14px;color:#475569;">BIC: ${esc(RECIPIENT_BIC)} (${esc(RECIPIENT_BANK_NAME)})</p>` : ''}
    </div>`;
  return emailShell(inner, d.locale);
}

async function getContactEmailMessages(locale: AppLocale) {
  return getMessagesForLocale(locale).contact.email;
}

async function getBookingEmailMessages(locale: AppLocale) {
  return getMessagesForLocale(locale).bookingEmail;
}

function contactEmailHtml(
  d: { senderName: string; senderEmail: string; message: string },
  emailMessages: {
    subjectPrefix: string;
    heading: string;
    nameLabel: string;
    emailLabel: string;
  },
) {
  const inner = `
    <div style="background:#1e4a5f;padding:20px 18px;">
      <h1 style="color:#ffffff;font-size:19px;margin:0;">${esc(emailMessages.heading)}</h1>
    </div>
    <div style="padding:20px 18px 24px;">
      <p style="margin:12px 0;font-size:16px;line-height:1.55;"><strong style="color:#64748b;">${esc(emailMessages.nameLabel)}</strong> ${esc(d.senderName)}</p>
      <p style="margin:12px 0;font-size:16px;line-height:1.55;"><strong style="color:#64748b;">${esc(emailMessages.emailLabel)}</strong> <a href="mailto:${esc(d.senderEmail)}" style="color:#1e4a5f;">${esc(d.senderEmail)}</a></p>
      <div style="background:#f8fafc;border-radius:10px;padding:16px;margin-top:16px;border:1px solid #e2e8f0;">
        <p style="margin:0;font-size:16px;color:#334155;line-height:1.65;white-space:pre-wrap;word-break:break-word;">${esc(d.message)}</p>
      </div>
    </div>`;
  return emailShell(inner);
}
