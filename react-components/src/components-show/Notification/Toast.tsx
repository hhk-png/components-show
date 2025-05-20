import type { ToastProps } from './types'
import React, { useEffect, useRef } from 'react'
import { toastTypes } from './types'
import { useToast } from './useToast'

function getBgColorClass(type: string) {
  switch (type) {
    case 'success':
      return 'bg-blue-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'info':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

const Toast: React.FC<ToastProps> = ({ message, type, id }) => {
  const { progressBarClass } = toastTypes[type]
  const toast = useToast()

  const timerID = useRef<ReturnType<typeof setTimeout>>(null)

  const handleDismiss = () => {
    toast.remove(id)
  }

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss()
    }, 4000)

    return () => {
      clearTimeout(timerID.current!)
    }
  }, [])

  const progressRef = useRef<HTMLDivElement>(null)
  const handleMouseEnter = () => {
    clearTimeout(timerID.current!)
    progressRef.current!.style.animationPlayState = 'paused'
  }
  const handleMouseLeave = () => {
    const remainingTime
      = (progressRef.current!.offsetWidth
        / progressRef.current!.parentElement!.offsetWidth)
      * 4000

    progressRef.current!.style.animationPlayState = 'running'

    timerID.current = setTimeout(() => {
      handleDismiss()
    }, remainingTime)
  }

  return (
    <div
      className={`${getBgColorClass(
        type,
      )} rounded flex relative justify-between 
      align-center p-3 w-70 animation-toast`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className="text-white mr-2">{message}</p>
      <button onClick={handleDismiss} className="text-white">
        x
      </button>

      <div className="absolute bottom-0 left-0 right-0 w-full h-1">
        <div
          ref={progressRef}
          className={`h-full bg-gray-400 rounded-b animation-progress-bar ${progressBarClass}`}
        >
        </div>
      </div>
    </div>
  )
}

export default Toast
