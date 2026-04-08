import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/modules/booking-admin/lib/supabase';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';
import {
  getApartment,
} from '@/modules/booking-admin/booking.config';
import { parseLocalDate, diffDays, calculatePrice } from '@/modules/booking-admin/lib/dates';

// GET /api/admin/bookings — sve rezervacije
export async function GET(request: NextRequest) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('check_in', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/admin/bookings — ručna rezervacija
export async function POST(request: NextRequest) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
    status,
    deposit_paid,
  } = body;

  const apt = getApartment(apartment_slug);
  if (!apt) return NextResponse.json({ error: 'Apartment not found' }, { status: 404 });

  const checkInDate = parseLocalDate(check_in);
  const checkOutDate = parseLocalDate(check_out);
  const nights = diffDays(checkOutDate, checkInDate);

  if (nights < 1) {
    return NextResponse.json({ error: 'Check-out must be after check-in' }, { status: 400 });
  }

  const priceData = calculatePrice(checkInDate, checkOutDate, apt);
  const totalPrice = priceData.totalPrice;
  const deposit = priceData.deposit;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      apartment_slug,
      check_in,
      check_out,
      nights,
      guest_name,
      guest_email: guest_email || '',
      guest_phone: guest_phone || null,
      adults: adults ?? 1,
      children: children ?? 0,
      price_per_night: Math.round(totalPrice / nights),
      total_price: totalPrice,
      deposit,
      status: status ?? 'confirmed',
      deposit_paid: deposit_paid ?? false,
      notes: notes || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
