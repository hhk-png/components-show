import { useCallback, useState } from 'react'
import FreePicker from './ColorPicker'

export default function App() {
  const [color, setColor] = useState('#ffffff')

  const handleChange = useCallback((color: string) => {
    setColor(color)
  }, [])

  return (
    <div className='h-full overflow-y-auto overflow-x-hidden'>
      <FreePicker color={color} onChange={handleChange} />
    </div>
  )
}
