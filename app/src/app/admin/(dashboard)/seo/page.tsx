'use client';

import { useCallback, useState } from 'react';
import AdminPageSeoManager from '@/modules/cms/components/AdminPageSeoManager';
import { ToastContainer, type ToastItem } from '@/modules/booking-admin/components/admin/Toast';

export default function AdminSeoPage() {
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
      <AdminPageSeoManager showToast={showToast} />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
