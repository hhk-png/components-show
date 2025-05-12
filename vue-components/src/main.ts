import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { ToastPlugin } from './components-show/Toast'
import { ToastPlugin as NotificationPlugin } from './components-show/Notification'

const app = createApp(App)
app.use(ToastPlugin)
app.use(NotificationPlugin)

app.mount('#app')
