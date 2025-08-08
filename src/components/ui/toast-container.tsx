'use client'

import { Toast } from './toast'
import { useToast } from '@/hooks/use-toast'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[100] flex max-h-screen w-full flex-col gap-2 md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={removeToast}
        />
      ))}
    </div>
  )
}
