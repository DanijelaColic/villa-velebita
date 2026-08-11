import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';
import {
  getDefaultSpecialPricePeriods,
  getSpecialPricePeriods,
  saveSpecialPricePeriods,
  validateSpecialPricePeriodsInput,
} from '@/modules/cms/lib/get-booking-settings';

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const periods = await getSpecialPricePeriods();
  return NextResponse.json({
    periods,
    defaults: getDefaultSpecialPricePeriods(),
  });
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Neispravan JSON' }, { status: 400 });
  }

  const parsed = validateSpecialPricePeriodsInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const saved = await saveSpecialPricePeriods(parsed.data);
    return NextResponse.json({
      periods: saved,
      defaults: getDefaultSpecialPricePeriods(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Spremanje nije uspjelo.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
