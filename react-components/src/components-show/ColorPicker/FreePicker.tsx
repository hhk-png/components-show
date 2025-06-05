import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
} from 'react'
import type { ColorRGB, FreePickerProps } from './types'
import FreeSelector from './FreeSelector'
import {
  clamp,
  getHueCoordinates,
  getSaturationCoordinates,
  hsvToRgb,
  parseColor,
  rgbToHex,
} from './utils'

const FreePicker: React.FC<FreePickerProps> = ({ color, onChange }) => {
  const parsedColor = useMemo(() => parseColor(color), [color])

  const satCoords = useMemo(
    () => getSaturationCoordinates(parsedColor),
    [parsedColor]
  )
  const hueCoords = useMemo(() => getHueCoordinates(parsedColor), [parsedColor])

  const handleHexChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      var val = event.target.value
      if (val?.slice(0, 1) !== '#') {
        val = '#' + val
      }
      onChange(val)
    },
    [onChange]
  )

  const handleRgbChange = useCallback(
    (component: keyof ColorRGB, value: number) => {
      const { r, g, b } = parsedColor.rgb

      switch (component) {
        case 'r':
          onChange(rgbToHex({ r: value ?? 0, g, b }))
          return
        case 'g':
          onChange(rgbToHex({ r, g: value ?? 0, b }))
          return
        case 'b':
          onChange(rgbToHex({ r, g, b: value ?? 0 }))
          return
        default:
          return
      }
    },
    [parsedColor, onChange]
  )

  const handleSaturationChange: MouseEventHandler = useCallback(
    (event) => {
      const { width, height, left, top } = (
        event.target as HTMLElement
      ).getBoundingClientRect()

      const x = clamp(event.clientX - left, 0, width)
      const y = clamp(event.clientY - top, 0, height)

      const s = (x / width) * 100
      const v = 100 - (y / height) * 100

      const rgb = hsvToRgb({ h: parsedColor?.hsv.h, s, v })

      onChange(rgbToHex(rgb))
    },
    [parsedColor, onChange]
  )

  const handleHueChange: MouseEventHandler = useCallback(
    (event) => {
      const { width, left } = (
        event.target as HTMLElement
      ).getBoundingClientRect()
      const x = clamp(event.clientX - left, 0, width)
      const h = Math.round((x / width) * 360)

      const hsv = { h, s: parsedColor?.hsv.s, v: parsedColor?.hsv.v }
      const rgb = hsvToRgb(hsv)

      onChange(rgbToHex(rgb))
    },
    [parsedColor, onChange]
  )

  return (
    <div className='p-3 overflow-auto w-fit scrollbar-hide'>
      <FreeSelector
        parsedColor={parsedColor}
        satCoords={satCoords}
        hueCoords={hueCoords}
        onSaturationChange={handleSaturationChange}
        onHueChange={handleHueChange}
      />

      {/* 输入区域 */}
      <div className='flex flex-row justify-between m-[2px]'>
        {/* Hex 部分 */}
        <div className='grid grid-cols-[auto_auto_auto] gap-2 items-center'>
          <div
            className='w-[25px] h-[25px] rounded-full shadow-[0px_1px_3px_rgba(0,0,0,0.2),0px_1px_1px_rgba(0,0,0,0.14),0px_2px_1px_-1px_rgba(0,0,0,0.12)]'
            style={{
              background: color,
            }}
          />
          <div>
            <label htmlFor='cp-input-hex' className='text-[12px] block'>
              Hex
            </label>
            <input
              id='cp-input-hex'
              className='w-[60px] p-[4px_6px] block'
              placeholder='Hex'
              value={parsedColor?.hex}
              onChange={handleHexChange}
            />
          </div>
        </div>

        {/* RGB 部分 */}
        <div className='grid grid-cols-[auto_auto_auto] gap-2 items-center'>
          <div>
            <label htmlFor='cp-input-r' className='text-[12px] block'>
              R
            </label>
            <input
              id='cp-input-r'
              className='w-[30px] p-[4px_6px] block'
              placeholder='R'
              value={parsedColor.rgb.r}
              onChange={(event) => handleRgbChange('r', Number(event.target.value))}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
          <div>
            <label htmlFor='cp-input-g' className='text-[12px] block'>
              G
            </label>
            <input
              id='cp-input-g'
              className='w-[30px] p-[4px_6px] block'
              placeholder='G'
              value={parsedColor.rgb.g}
              onChange={(event) => handleRgbChange('g', Number(event.target.value))}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
          <div>
            <label htmlFor='cp-input-b' className='text-[12px] block'>
              B
            </label>
            <input
              id='cp-input-b'
              className='w-[30px] p-[4px_6px] block'
              placeholder='B'
              value={parsedColor.rgb.b}
              onChange={(event) => handleRgbChange('b', Number(event.target.value))}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreePicker
