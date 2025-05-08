import React, { createContext, useReducer } from 'react'
import { toastReducer } from './ToastReducer'
import ToastContainer from './ToastContainer'
import type {
  Position,
  ToastContextType,
  ToastReducerState,
  ToastTypes,
} from './types'

export const ToastContext = createContext<ToastContextType>({
  success: () => {},
  warning: () => {},
  info: () => {},
  error: () => {},
  remove: () => {},
})

const initialState: ToastReducerState = {
  toasts: [],
  position: 'top-right',
}
export const ToastContextProvider: React.FC<{
  position: Position
  children: React.ReactNode
}> = ({ position, children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState)

  const addToast = (type: ToastTypes, message: string) => {
    const id = Math.floor(Math.random() * 10000000)
    dispatch({ type: 'ADD_TOAST', payload: { id, type, message } })
  }

  const success = (message: string) => {
    addToast('success', message)
  }

  const warning = (message: string) => {
    addToast('warning', message)
  }

  const info = (message: string) => {
    addToast('info', message)
  }

  const error = (message: string) => {
    addToast('error', message)
  }

  const remove = (id: number) => {
    dispatch({
      type: 'DELETE_TOAST',
      payload: { id, type: 'success', message: '' },
    })
  }

  const value: ToastContextType = { success, warning, info, error, remove }

  return (
    <ToastContext.Provider value={value}>
      <ToastContainer toasts={state.toasts} position={position} />
      {children}
    </ToastContext.Provider>
  )
}
