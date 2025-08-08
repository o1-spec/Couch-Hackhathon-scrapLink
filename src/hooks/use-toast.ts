"use client"

import * as React from "react"
import type { ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

const ADD_TOAST = "ADD_TOAST"
const UPDATE_TOAST = "UPDATE_TOAST"
const DISMISS_TOAST = "DISMISS_TOAST"
const REMOVE_TOAST = "REMOVE_TOAST"

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type Action =
  | {
      type: typeof ADD_TOAST
      toast: ToasterToast
    }
  | {
      type: typeof UPDATE_TOAST
      toast: Partial<ToasterToast>
    }
  | {
      type: typeof DISMISS_TOAST
      toastId?: ToasterToast["id"]
    }
  | {
      type: typeof REMOVE_TOAST
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string, duration?: number) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: REMOVE_TOAST,
      toastId: toastId,
    })
  }, duration || TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId, state.toasts.find(t => t.id === toastId)?.duration)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id, toast.duration)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([])

  React.useEffect(() => {
    const listener = (state: State) => setToasts(state.toasts)
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  const addToast = React.useCallback((newToast: Omit<ToasterToast, 'id' | 'onClose'>) => {
    const id = genId()
    const toast: ToasterToast = {
      ...newToast,
      id,
      onClose: (toastId: string) => {
        setToasts(prev => prev.filter(t => t.id !== toastId))
      }
    }
    
    setToasts(prev => [toast, ...prev].slice(0, TOAST_LIMIT))
    
    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, newToast.duration || TOAST_REMOVE_DELAY)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const toastFunctions = {
    success: (title: string, description?: string, duration: number = 5000) => 
      addToast({ title, description, type: 'success', duration }),
    error: (title: string, description?: string, duration: number = 5000) => 
      addToast({ title, description, type: 'error', duration }),
    warning: (title: string, description?: string, duration: number = 5000) => 
      addToast({ title, description, type: 'warning', duration }),
    info: (title: string, description?: string, duration: number = 5000) => 
      addToast({ title, description, type: 'info', duration })
  }

  return { toasts, removeToast, toast: toastFunctions }
}
