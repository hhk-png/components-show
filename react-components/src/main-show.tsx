import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App-show'
import { ToastContextProvider } from '~/components-show/Notification'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContextProvider position='top-right'>
      <App />
    </ToastContextProvider>
  </StrictMode>
)
