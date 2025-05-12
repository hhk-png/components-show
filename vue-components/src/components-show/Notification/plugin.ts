import type { App } from 'vue'
import { toastStore } from './toastStore'

export const createToast = () => ({
  success: (message: string) => toastStore.add({ type: 'success', message }),
  warning: (message: string) => toastStore.add({ type: 'warning', message }),
  info: (message: string) => toastStore.add({ type: 'info', message }),
  error: (message: string) => toastStore.add({ type: 'error', message }),
  remove: (id: number) => toastStore.remove(id),
})

export const ToastPlugin = {
  install(app: App) {
    const toast = createToast()
    app.config.globalProperties.$toast = toast
    app.provide('toast', toast)
  },
}