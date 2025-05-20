import { createRoot } from 'react-dom/client'
import App from './App'
import { ToastContextProvider } from './components-show/Notification/index'
import './style.css'

createRoot(document.getElementById('root')!).render(
  <ToastContextProvider position="top-right">
    <App />
  </ToastContextProvider>,
)
