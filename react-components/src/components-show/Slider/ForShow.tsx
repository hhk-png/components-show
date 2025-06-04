import React, { useState } from 'react'
import Slider from './Slider'

const Show: React.FC = () => {
  const [volume, setVolume] = useState(50)

  return (
    <div className='max-w-lg mx-auto mt-10'>
      <Slider
        value={volume}
        onChange={setVolume}
        min={0}
        max={100}
        step={5}
        label='音量'
      />
    </div>
  )
}

export default Show
