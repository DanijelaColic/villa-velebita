import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/modules/booking-admin/lib/supabase';
import { getApartment } from '@/modules/booking-admin/booking.config';
import { getMessagesForLocale, getValidLocale } from '@/i18n/messages';
import {
  parseLocalDate,
  isRangeAvailable,
  diffDays,
  calculatePrice,
} from '@/modules/booking-admin/lib/dates';
import { sendNewBookingEmails } from '@/modules/booking-admin/lib/email';
import { MIN_NIGHTS } from '@/modules/booking-admin/booking.config';

// GET /api/bookings?apartment=slug
// Vraća zauzete datume za odabrani apartman (koristi BookingCalendar)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('apartment');

  if (!slug) {
    return NextResponse.json({ error: 'Nedostaje parametar apartmana.' }, { status: 400 });
  }

  const apt = getApartment(slug);
  if (!apt) {
    return NextResponse.json({ error: 'Smještaj nije pronađen.' }, { status: 404 });
  }

  if (apt.fullyBooked) {
    const year = new Date().getFullYear();
    return NextResponse.json([{ check_in: `${year}-06-01`, check_out: `${year}-10-01` }]);
  }

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('bookings')
      .select('check_in, check_out')
      .eq('apartment_slug', slug)
      .neq('status', 'cancelled');

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error('[GET /api/bookings] Supabase error:', err);
    return NextResponse.json({ error: 'Greška pri dohvaćanju rezervacija.' }, { status: 500 });
  }
}

// POST /api/bookings
// Kreira novu rezervaciju (javna forma)
export async function POST(request: NextRequest) {
  let locale = 'hr';
  let bookingMessages = getMessagesForLocale('hr').bookingWidget.api;

  try {
    const body = await request.json();
    const {
      apartment_slug,
      check_in,
      check_out,
      guest_name,
      guest_email,
      guest_phone,
      adults,
      children,
      notes,
      locale: requestedLocale,
    } = body;
    locale = getValidLocale(requestedLocale);
    bookingMessages = getMessagesForLocale(locale).bookingWidget.api;

    if (!apartment_slug || !check_in || !check_out || !guest_name || !guest_email) {
      return NextResponse.json({ error: bookingMessages.missingFields }, { status: 400 });
    }

    const apt = getApartment(apartment_slug);
    if (!apt) {
      return NextResponse.json({ error: bookingMessages.apartmentNotFound }, { status: 404 });
    }

    if (apt.fullyBooked) {
      return NextResponse.json(
        { error: bookingMessages.unavailable },
        { status: 400 },
      );
    }

    const checkInDate = parseLocalDate(check_in);
    const checkOutDate = parseLocalDate(check_out);
    const nights = diffDays(checkOutDate, checkInDate);

    if (nights < MIN_NIGHTS) {
      return NextResponse.json(
        { error: bookingMessages.minStay.replace('{count}', String(MIN_NIGHTS)) },
        { status: 400 },
      );
    }

    const totalGuests = (adults ?? 1) + (children ?? 0);
    if (totalGuests > apt.capacity) {
      return NextResponse.json(
        {
          error: bookingMessages.maxGuests
            .replace('{apartmentName}', apt.name)
            .replace('{capacity}', String(apt.capacity)),
        },
        { status: 400 },
      );
    }

    const supabase = createServerSupabaseClient();

    const { data: existing } = await supabase
      .from('bookings')
      .select('check_in, check_out')
      .eq('apartment_slug', apartment_slug)
      .neq('status', 'cancelled');

    if (!isRangeAvailable(checkInDate, checkOutDate, existing ?? [])) {
      return NextResponse.json(
        { error: bookingMessages.datesUnavailable },
        { status: 409 },
      );
    }

    const priceData = calculatePrice(checkInDate, checkOutDate, apt);
    const totalPrice = priceData.totalPrice;
    const deposit = priceData.deposit;
    const avgPricePerNight = Math.round(totalPrice / nights);

    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert({
        apartment_slug,
        check_in,
        check_out,
        nights,
        guest_name,
        guest_email,
        guest_phone: guest_phone || null,
        adults: adults ?? 1,
        children: children ?? 0,
        price_per_night: avgPricePerNight,
        total_price: totalPrice,
        deposit,
        status: 'pending',
        locale,
        notes: notes || null,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    await sendNewBookingEmails({
      guestName: guest_name,
      guestEmail: guest_email,
      guestPhone: guest_phone,
      apartmentName: apt.name,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights,
      totalPrice,
      deposit,
      bookingId: booking.id,
      locale: booking.locale ?? locale,
    });

    return NextResponse.json({ success: true, bookingId: booking.id }, { status: 201 });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message
            ? err.message
            : bookingMessages.serverError,
      },
      { status: 500 },
    );
  }
}
