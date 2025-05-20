export const toastTypes = {
  success: {
    progressBarClass: 'success',
  },
  warning: {
    progressBarClass: 'warning',
  },
  info: {
    progressBarClass: 'info',
  },
  error: {
    progressBarClass: 'error',
  },
}

export type ToastTypes = keyof typeof toastTypes

export interface ToastProps {
  message: string
  type: ToastTypes
  id: number
}

export interface ToastReducerState {
  toasts: Array<ToastProps>
  position: Position
}

export interface ToastReducerAction {
  type: string
  payload: ToastProps
}

export interface ToastContextType {
  success: (message: string) => void
  warning: (message: string) => void
  info: (message: string) => void
  error: (message: string) => void
  remove: (id: number) => void
}

export type Position = 'top-right' | 'top-left' | 'top-center' | 'bottom-left' | 'bottom-center' | 'bottom-right'
