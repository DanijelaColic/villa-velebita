import { createServerSupabaseClient } from './supabase';
import { verifyBookingViewToken } from './booking-view-token';
import {
  getApartment,
  RECIPIENT_IBAN,
  RECIPIENT_NAME,
  RECIPIENT_BIC,
  RECIPIENT_BANK_NAME,
} from '../booking.config';
import { formatDisplayDate, parseLocalDate } from './dates';
import { generateHUB3Barcode, generateEPCQR } from './barcode';

export type BookingPublicViewData = {
  guestName: string;
  apartmentName: string;
  checkInStr: string;
  checkOutStr: string;
  nights: number;
  totalPrice: number;
  deposit: number;
  balance: number;
  reference: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  statusLabel: string;
  hub3: string | null;
  epc: string | null;
  recipientName: string;
  recipientIban: string;
  recipientBank: string;
  recipientBic: string;
};

export async function loadBookingPublicView(
  token: string,
): Promise<BookingPublicViewData | null> {
  const bookingId = verifyBookingViewToken(token);
  if (!bookingId) return null;

  const supabase = createServerSupabaseClient();
  const { data: row, error } = await supabase.from('bookings').select('*').eq('id', bookingId).single();

  if (error || !row) return null;

  const apt = getApartment(row.apartment_slug);
  const apartmentName = apt?.name ?? row.apartment_slug;
  const checkIn = parseLocalDate(row.check_in);
  const checkOut = parseLocalDate(row.check_out);
  const reference = `REZ-${row.id.substring(0, 8).toUpperCase()}`;
  const balance = row.total_price - row.deposit;

  const statusLabel =
    row.status === 'confirmed'
      ? 'Potvrđena'
      : row.status === 'cancelled'
        ? 'Otkazana'
        : 'Na čekanju';

  let hub3: string | null = null;
  let epc: string | null = null;
  if (RECIPIENT_IBAN && row.status !== 'cancelled') {
    const [h, e] = await Promise.allSettled([
      generateHUB3Barcode(row.deposit, row.guest_name, reference),
      generateEPCQR(row.deposit, row.guest_name, reference),
    ]);
    if (h.status === 'fulfilled') hub3 = h.value;
    if (e.status === 'fulfilled') epc = e.value;
  }

  return {
    guestName: row.guest_name,
    apartmentName,
    checkInStr: formatDisplayDate(checkIn),
    checkOutStr: formatDisplayDate(checkOut),
    nights: row.nights,
    totalPrice: row.total_price,
    deposit: row.deposit,
    balance,
    reference,
    status: row.status,
    statusLabel,
    hub3,
    epc,
    recipientName: RECIPIENT_NAME,
    recipientIban: RECIPIENT_IBAN,
    recipientBank: RECIPIENT_BANK_NAME,
    recipientBic: RECIPIENT_BIC,
  };
}
