'use client';

import { useCallback, useState } from 'react';
import AdminSiteTextsManager from '@/modules/cms/components/AdminSiteTextsManager';
import { ToastContainer, type ToastItem } from '@/modules/booking-admin/components/admin/Toast';

export default function AdminContentPage() {
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
      <AdminSiteTextsManager showToast={showToast} />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
