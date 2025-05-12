import { reactive } from 'vue'
import type { Toast } from './types'

export const toastStore = reactive({
  toasts: [] as Toast[],
  add(toast: Omit<Toast, 'id'>) {
    const id = Date.now() + Math.random()
    toastStore.toasts.push({ id, ...toast })
    setTimeout(() => toastStore.remove(id), 4000)
  },
  remove(id: number) {
    toastStore.toasts = toastStore.toasts.filter(t => t.id !== id)
  },
})