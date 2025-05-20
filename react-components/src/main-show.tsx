import { createRoot } from 'react-dom/client'
import App from './App-show'
import { ToastContextProvider } from './components-show/Notification'
import './style.css'

createRoot(document.getElementById('root')!).render(
  <ToastContextProvider position="top-right">
    <App />
  </ToastContextProvider>,
)
