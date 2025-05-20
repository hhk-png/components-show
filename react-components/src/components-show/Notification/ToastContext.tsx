import type { ToastContextType } from './types'
import { createContext } from 'react'

export const ToastContext = createContext<ToastContextType>({
  success: () => {},
  warning: () => {},
  info: () => {},
  error: () => {},
  remove: () => {},
})
