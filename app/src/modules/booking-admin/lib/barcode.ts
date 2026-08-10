import bwipjs from 'bwip-js/node';
import QRCode from 'qrcode';
import {
  RECIPIENT_NAME as DEFAULT_NAME,
  RECIPIENT_IBAN as DEFAULT_IBAN,
} from '../booking.config';

const CURRENCY = 'EUR';

export type BarcodeRecipient = {
  name: string;
  iban: string;
};

function resolveRecipient(recipient?: BarcodeRecipient): BarcodeRecipient {
  return {
    name: recipient?.name?.trim() || DEFAULT_NAME,
    iban: recipient?.iban?.trim() || DEFAULT_IBAN,
  };
}

function normalizeCroatian(str: string): string {
  const map: Record<string, string> = {
    č: 'c', ć: 'c', đ: 'd', š: 's', ž: 'z',
    Č: 'C', Ć: 'C', Đ: 'D', Š: 'S', Ž: 'Z',
  };
  return str.replace(/[čćđšžČĆĐŠŽ]/g, (c) => map[c] ?? c);
}

/** HUB3 PDF417 2D barcode za hrvatske banke (m-zaba, m-keks, Erste, OTP...) */
export function formatHUB3String(
  amount: number,
  guestName: string,
  reference: string,
  recipient?: BarcodeRecipient,
): string {
  const amountCents = Math.round(amount * 100).toString();
  const normalizedPayer = normalizeCroatian(guestName);
  const payee = resolveRecipient(recipient);

  return [
    'HRVHUB30',
    CURRENCY,
    amountCents,
    '', '', '',
    payee.name,
    '', '',
    payee.iban,
    'HR00',
    reference,
    '',
    normalizedPayer,
    '', '',
  ].join('\n');
}

/** EPC/SEPA QR za EU banke (Revolut, N26, Wise, SEPA banke) */
export function formatEPCString(
  amount: number,
  guestName: string,
  reference: string,
  recipient?: BarcodeRecipient,
): string {
  const amountFormatted = `EUR${amount.toFixed(2)}`;
  const remittance = `${normalizeCroatian(guestName)} - ${reference}`.substring(0, 140);
  const payee = resolveRecipient(recipient);

  return [
    'BCD', '002', '1', 'SCT',
    '',
    payee.name,
    payee.iban,
    amountFormatted,
    '', '',
    remittance, '',
  ].join('\n');
}

const PDF417_OPTS = { bcid: 'pdf417', scale: 5, height: 14, includetext: false } as const;
const QR_OPTS = { errorCorrectionLevel: 'M' as const, margin: 2, width: 300 };

// ── Buffer verzije — za email attachments ────────────────────────

export async function generateHUB3Buffer(
  amount: number,
  guestName: string,
  reference: string,
  recipient?: BarcodeRecipient,
): Promise<Buffer> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (bwipjs as any).toBuffer({
    ...PDF417_OPTS,
    text: formatHUB3String(amount, guestName, reference, recipient),
  });
}

export async function generateEPCBuffer(
  amount: number,
  guestName: string,
  reference: string,
  recipient?: BarcodeRecipient,
): Promise<Buffer> {
  return QRCode.toBuffer(
    formatEPCString(amount, guestName, reference, recipient),
    QR_OPTS,
  );
}

// ── Data URL verzije — za frontend prikaz ────────────────────────

export async function generateHUB3Barcode(
  amount: number,
  guestName: string,
  reference: string,
  recipient?: BarcodeRecipient,
): Promise<string> {
  const png = await generateHUB3Buffer(amount, guestName, reference, recipient);
  return `data:image/png;base64,${png.toString('base64')}`;
}

export async function generateEPCQR(
  amount: number,
  guestName: string,
  reference: string,
  recipient?: BarcodeRecipient,
): Promise<string> {
  return QRCode.toDataURL(
    formatEPCString(amount, guestName, reference, recipient),
    QR_OPTS,
  );
}
