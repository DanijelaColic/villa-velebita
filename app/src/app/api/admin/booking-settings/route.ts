import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';
import {
  getBookingSettings,
  getDefaultBookingSettings,
  saveBookingSettings,
  validateBookingSettingsInput,
} from '@/modules/cms/lib/get-booking-settings';

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settings = await getBookingSettings();
  const defaults = getDefaultBookingSettings();

  return NextResponse.json({
    ...settings,
    defaults,
  });
}

export async function PUT(request: NextRequest) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Neispravan JSON' }, { status: 400 });
  }

  const parsed = validateBookingSettingsInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const saved = await saveBookingSettings(parsed.data);
    return NextResponse.json({
      ...saved,
      defaults: getDefaultBookingSettings(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Spremanje nije uspjelo.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
