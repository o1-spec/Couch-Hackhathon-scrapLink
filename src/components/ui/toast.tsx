'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ToastProps {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose: (id: string) => void
}

export function Toast({ id, title, description, type = 'info', onClose }: ToastProps) {
  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  const iconColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  }

  return (
    <div className={cn(
      'relative flex w-full items-center space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all animate-in slide-in-from-right-full',
      typeStyles[type]
    )}>
      <div className="grid gap-1 flex-1">
        {title && (
          <div className="text-sm font-semibold font-poppins">{title}</div>
        )}
        {description && (
          <div className="text-sm opacity-90 font-poppins">{description}</div>
        )}
      </div>
      <button
        onClick={() => onClose(id)}
        className={cn(
          'absolute right-2 top-2 rounded-md p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2',
          iconColors[type]
        )}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}
