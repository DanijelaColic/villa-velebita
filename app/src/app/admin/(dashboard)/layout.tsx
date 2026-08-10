import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/modules/booking-admin/lib/admin-auth';
import AdminShell from '@/modules/booking-admin/components/admin/AdminShell';
import { SITE_NAME } from '@/modules/booking-admin/booking.config';

export const metadata = {
  title: `Admin | ${SITE_NAME}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) redirect('/admin/login');

  return <AdminShell>{children}</AdminShell>;
}
