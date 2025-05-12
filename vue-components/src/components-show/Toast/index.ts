import { createApp, type Plugin } from "vue"
import type { ToastProps } from "./types"
import Toast from "./Toast.vue"
import ToastUI from './ForShow.vue'

export default ToastUI

let toastInstance: any
export const createToast = (options: ToastProps) => {
  // If toastInstance not exists, create a new instance
  if (!toastInstance) {
    const toast = createApp(Toast, { ...options })
    toastInstance = toast.mount(document.createElement('div'))
    document.body.appendChild(toastInstance.$el)
  }

  // Update the message if toastInstance already exists
  toastInstance.message = options.message || ''
  toastInstance.visible = true
}

export const ToastPlugin: Plugin = {
  // plugin function to install the Toast plugin
  // This function will be called when the plugin is installed
  install(app) {
    app.config.globalProperties.$toast = {
      show: (message: string, duration: number = 1000) => createToast({ message, duration })
    }
  }
}
