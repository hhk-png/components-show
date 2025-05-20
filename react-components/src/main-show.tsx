import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App-show.tsx'
import { ToastContextProvider } from './components-show/Notification/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContextProvider position='top-right'>
      <App />
    </ToastContextProvider>
  </StrictMode>
)
