import React, { useCallback } from 'react'
import { createToast } from './ToastManager'

const ClickToToast: React.FC = () => {
  const toast = useCallback(() => {
    createToast('hello world')
  }, [])

  return (
    <button type="button" onClick={() => toast()} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
      click
    </button>
  )
}

export default ClickToToast
