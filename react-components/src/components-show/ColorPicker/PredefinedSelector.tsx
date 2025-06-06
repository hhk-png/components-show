import type { PredefinedSelectorProps } from './types'

export const PredefinedSelector = ({
  parsedColor,
  colors,
  onSelect,
  className = '',
}: PredefinedSelectorProps) => {
  return (
    <div
      className={`flex flex-wrap w-[400px] overflow-hidden px-2 ${className}`}
    >
      {colors.map((color) => (
        <div
          className='p-2 rounded bg-inherit box-border justify-center'
          key={color}
          onClick={() => onSelect(color)}
          style={{
            border: color === parsedColor?.hex ? '1px solid #000' : '1px solid #fff',
          }}
        >
          <div
            className='w-7 h-7 rounded-full shadow'
            style={{
              background: color,
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default PredefinedSelector
