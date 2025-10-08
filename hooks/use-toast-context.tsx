"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

type ToastType = "success" | "error" | "info"

interface ToastProps {
  title: string
  description?: string
  type?: ToastType
  duration?: number
}

interface Toast extends ToastProps {
  id: string
}

interface ToastContextType {
  toast: (props: ToastProps) => string
  dismissToast: (id: string) => void
  toasts: Toast[]
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ title, description, type = "success", duration = 3000 }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)

    const newToast: Toast = {
      id,
      title,
      description,
      type,
      duration,
    }

    setToasts((prev) => [...prev, newToast])

    // Auto dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, duration)

    return id
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return <ToastContext.Provider value={{ toast, dismissToast, toasts }}>{children}</ToastContext.Provider>
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider")
  }
  return context
}

