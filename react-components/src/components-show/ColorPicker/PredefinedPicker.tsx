import React, {
  ChangeEventHandler,
  useCallback,
  useMemo,
} from 'react'
import type { ColorRGB, PredefinedPickerProps } from './types'
import PredefinedSelector from './PredefinedSelector'
import { DEFAULT_COLORS, parseColor, rgbToHex } from './utils'

const PredefinedPicker: React.FC<PredefinedPickerProps> = ({
  color,
  colors = DEFAULT_COLORS,
  onChange,
}) => {
  const parsedColor = useMemo(() => parseColor(color), [color])

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

  return (
    <div className='p-3 overflow-auto w-fit scrollbar-hide'>
      <PredefinedSelector
        colors={colors}
        parsedColor={parsedColor}
        onSelect={onChange}
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
              onChange={(event) =>
                handleRgbChange('r', Number(event.target.value))
              }
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
              onChange={(event) =>
                handleRgbChange('g', Number(event.target.value))
              }
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
              onChange={(event) =>
                handleRgbChange('b', Number(event.target.value))
              }
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredefinedPicker
