import type { Metadata } from 'next';
import { SITE_NAME } from '@/modules/booking-admin/booking.config';

export const metadata: Metadata = {
  title: `Admin Login | ${SITE_NAME}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
