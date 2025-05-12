export type ToastType = 'success' | 'error' | 'info' | 'warning'
export interface Toast {
  id: number
  message: string
  type: ToastType
}

export interface ToastState {
  toasts: Toast[]
  addToast: (type: ToastType, message: string) => void
  removeToast: (id: number) => void
}

export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-left' | 'bottom-center' | 'bottom-right'
