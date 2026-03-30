import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/modules/booking-admin/lib/admin-auth';
import AdminDashboard from '@/modules/booking-admin/components/admin/AdminDashboard';
import { SITE_NAME } from '@/modules/booking-admin/booking.config';

export const metadata = { title: `Admin | ${SITE_NAME}` };

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) redirect('/admin/login');

  return <AdminDashboard />;
}
