import { useToast } from './useToast'

export { ToastContextProvider } from './ToastContext'
export type * from './types'
export { useToast } from './useToast'

const Notification = () => {
  const toast = useToast()

  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className='flex flex-col items-center justify-center gap-y-5'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md w-full'
          onClick={() => toast.success('Success toast notification')}
        >
          Success
        </button>
        <button
          className='bg-green-500 text-white px-4 py-2 rounded-md w-full'
          onClick={() => toast.info('Info toast notification')}
        >
          Info
        </button>
        <button
          className='bg-yellow-500 text-white px-4 py-2 rounded-md w-full'
          onClick={() => toast.warning('Warning toast notification')}
        >
          Warning
        </button>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded-md w-full'
          onClick={() => toast.error('Error toast notification')}
        >
          Error
        </button>
      </div>
    </div>
  )
}

export default Notification
