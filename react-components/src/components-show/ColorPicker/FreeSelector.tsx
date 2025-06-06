import React from 'react'
import type { FreeSelectorProps } from './types'

const FreeSelector: React.FC<FreeSelectorProps> = ({
  parsedColor,
  satCoords,
  hueCoords,
  onSaturationChange,
  onHueChange,
  className = '',
}) => {
  return (
    <div className={`grid gap-2 mb-4 w-[400px] ${className}`}>
      {/* 饱和度面板 */}
      <div
        className='w-full h-[150px] relative cursor-crosshair rounded bg-[linear-gradient(transparent,black),linear-gradient(to_right,white,transparent)]'
        style={{
          backgroundColor: `hsl(${parsedColor.hsv.h}, 100%, 50%)`,
        }}
        onClick={onSaturationChange}
      >
        <div
          className='absolute w-[15px] h-[15px] border-2 border-white rounded-full translate-x-[-7.5px] translate-y-[-7.5px]'
          style={{
            backgroundColor: parsedColor.hex,
            left: (satCoords?.[0] ?? 0) + '%',
            top: (satCoords?.[1] ?? 0) + '%',
          }}
        />
      </div>

      {/* 色相选择条 */}
      <div
        className='w-full h-3 relative cursor-crosshair rounded-full bg-[linear-gradient(to_right,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)]'
        onClick={onHueChange}
      >
        <div
          className='absolute w-[15px] h-[15px] border-2 border-white rounded-full translate-x-[-7.5px] translate-y-[-2px]'
          style={{
            backgroundColor: parsedColor.hex,
            left: (hueCoords ?? 0) + '%',
          }}
        />
      </div>
    </div>
  )
}

export default FreeSelector
