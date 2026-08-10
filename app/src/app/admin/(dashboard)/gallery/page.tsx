'use client';

import { useCallback, useState } from 'react';
import AdminGalleryManager from '@/modules/booking-admin/components/admin/AdminGalleryManager';
import { ToastContainer, type ToastItem } from '@/modules/booking-admin/components/admin/Toast';

export default function AdminGalleryPage() {
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
      <AdminGalleryManager showToast={showToast} />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
