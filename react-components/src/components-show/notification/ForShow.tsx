import React from 'react'
import { useToast } from './useToast'

const Notification: React.FC = () => {
  const toast = useToast()

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-y-5">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full cursor-pointer"
          onClick={() => toast.success('Success toast notification')}
        >
          Success
        </button>
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-md w-full cursor-pointer"
          onClick={() => toast.info('Info toast notification')}
        >
          Info
        </button>
        <button
          type="button"
          className="bg-yellow-500 text-white px-4 py-2 rounded-md w-full cursor-pointer"
          onClick={() => toast.warning('Warning toast notification')}
        >
          Warning
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-md w-full cursor-pointer"
          onClick={() => toast.error('Error toast notification')}
        >
          Error
        </button>
      </div>
    </div>
  )
}

export default Notification
