import React, { useEffect, useState } from 'react'

type ToastProps = {
  message: string
  duration: number
}

const Toast: React.FC<ToastProps> = ({ message, duration }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setOpacity(1)

    const timer1 = setTimeout(() => {
      setOpacity(0)
    }, duration)

    const timer2 = setTimeout(() => {
      setIsVisible(false)
    }, duration + 500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    isVisible && (
      <div
        className={`fixed top-1/2 left-1/2 transform 
        -translate-x-1/2 -translate-y-1/2 bg-gray-800 
        text-white p-2 rounded z-[9999] transition-opacity 
        duration-500 opacity-${opacity}`}
      >
        <div className='inline-block mx-2.5'>{message}</div>
      </div>
    )
  )
}

export default Toast
