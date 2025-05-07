import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { ToastPlugin } from './components-show/Toast'

const app = createApp(App)
app.use(ToastPlugin)

app.mount('#app')
