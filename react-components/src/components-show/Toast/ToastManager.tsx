import ReactDOM from 'react-dom/client'
import Toast from './Toast'

let toastRoot: ReactDOM.Root | null = null
let toastId = 0
export function createToast(message: string, duration = 1000) {
  if (toastRoot === null) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    toastRoot = ReactDOM.createRoot(container)
  }

  toastRoot.render(
    <Toast
      key={toastId++}
      message={message}
      duration={duration}
    />,
  )
}
