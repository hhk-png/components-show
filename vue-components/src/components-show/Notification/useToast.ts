import { inject } from 'vue'

export const useToast = () => {
  const toast = inject('toast') as ReturnType<typeof import('./plugin').createToast>
  if (!toast) throw new Error('Toast plugin is not provided')
  return toast
}