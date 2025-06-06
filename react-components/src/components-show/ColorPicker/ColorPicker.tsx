import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
} from 'react'
import type { ColorRGB, ColorPickerProps } from './types'
import FreeSelector from './FreeSelector'
import {
  clamp,
  DEFAULT_COLORS,
  getHueCoordinates,
  getSaturationCoordinates,
  hsvToRgb,
  parseColor,
  rgbToHex,
} from './utils'
import PredefinedSelector from './PredefinedSelector'

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
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
    <div className='p-3 w-fit'>
      <PredefinedSelector
        colors={DEFAULT_COLORS}
        parsedColor={parsedColor}
        onSelect={onChange}
        className='mb-1'
      />

      <FreeSelector
        parsedColor={parsedColor}
        satCoords={satCoords}
        hueCoords={hueCoords}
        onSaturationChange={handleSaturationChange}
        onHueChange={handleHueChange}
      />

      {/* 输入区域 */}
      <div className='flex justify-between m-1'>
        {/* Hex 部分 */}
        <div className='grid grid-cols-[1fr_3fr] gap-2 items-center'>
          <div
            className='w-7 h-7 rounded-full shadow-lg'
            style={{
              background: color,
            }}
          />
          <div>
            <label htmlFor='cp-input-hex' className='text-md block'>
              Hex:
            </label>
            <input
              id='cp-input-hex'
              className='w-[75px] p-1 block'
              placeholder='Hex'
              value={parsedColor?.hex}
              onChange={handleHexChange}
            />
          </div>
        </div>

        {/* RGB 部分 */}
        <div className='grid grid-cols-3 gap-2 items-center'>
          {['r', 'g', 'b'].map((color) => {
            const value = parsedColor.rgb[color as keyof ColorRGB]
            return (
              <div key={color}>
                <label
                  htmlFor={`cp-input-${color}`}
                  className='text-[12px] block'
                >
                  {color.toUpperCase()}:
                </label>
                <input
                  id={`cp-input-${color}`}
                  className='w-9 p-1 block'
                  placeholder={color.toUpperCase()}
                  value={value}
                  onChange={(event) =>
                    handleRgbChange(
                      color as keyof ColorRGB,
                      Number(event.target.value)
                    )
                  }
                  inputMode='numeric'
                  pattern='[0-9]*'
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
