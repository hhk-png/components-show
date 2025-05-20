import type { Position, ToastProps } from './types'
import Toast from './Toast'
import './style.css'

export interface ToastContainerProps {
  toasts: Array<ToastProps>
  position: Position
}

function getPositionClass(position: Position) {
  switch (position) {
    case 'top-right':
      return 'top-5 right-5'
    case 'top-left':
      return 'top-5 left-5'
    case 'top-center':
      return 'top-5 left-1/2 transform -translate-x-1/2'
    case 'bottom-left':
      return 'bottom-5 left-5'
    case 'bottom-center':
      return 'bottom-5 left-1/2 transform -translate-x-1/2'
    case 'bottom-right':
      return 'bottom-5 right-5'
    default:
      return 'top-5 right-5'
  }
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'top-right',
}) => {
  return (
    <div className={`flex flex-col-reverse gap-y-3 fixed z-[9999] ${getPositionClass(position)}`}>
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}

export default ToastContainer
