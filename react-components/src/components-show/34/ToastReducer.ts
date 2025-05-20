import type { ToastReducerAction, ToastReducerState } from './types'

export function toastReducer(state: ToastReducerState, action: ToastReducerAction): ToastReducerState {
  switch (action.type) {
    case 'ADD_TOAST': {
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      }
    }
    case 'DELETE_TOAST': {
      const updatedToasts = state.toasts.filter(
        toast => toast.id !== action.payload.id,
      )
      return {
        ...state,
        toasts: updatedToasts,
      }
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`)
    }
  }
}
