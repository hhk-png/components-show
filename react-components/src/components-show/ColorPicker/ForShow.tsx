import { useCallback, useState } from 'react'
import FreePicker from './FreePicker'
import PredefinedPicker from './PredefinedPicker'

export default function App() {
  const [color, setColor] = useState('#ffffff')

  const handleChange = useCallback((color: string) => {
    setColor(color)
  }, [])

  return (
    <>
      <FreePicker color={color} onChange={handleChange} />
      <div>a</div>
      <PredefinedPicker color={color} onChange={handleChange}></PredefinedPicker>
    </>
  )
}
