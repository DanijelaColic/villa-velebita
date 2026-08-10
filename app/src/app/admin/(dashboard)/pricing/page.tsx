'use client';

import { useCallback, useState } from 'react';
import AdminBookingSettings from '@/modules/cms/components/AdminBookingSettings';
import AdminSpecialPricePeriods from '@/modules/cms/components/AdminSpecialPricePeriods';
import AdminPaymentSettings from '@/modules/cms/components/AdminPaymentSettings';
import { ToastContainer, type ToastItem } from '@/modules/booking-admin/components/admin/Toast';

export default function AdminPricingPage() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastItem['type'] = 'success') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <>
      <AdminBookingSettings showToast={showToast} />
      <AdminSpecialPricePeriods showToast={showToast} />
      <AdminPaymentSettings showToast={showToast} />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
