import { useCallback, useState } from 'react'
import FreePicker from './ColorPicker'

export default function App() {
  const [color, setColor] = useState('#ffffff')

  const handleChange = useCallback((color: string) => {
    setColor(color)
  }, [])

  return <FreePicker color={color} onChange={handleChange} />
}
