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
          className='w-[35px] h-[35px] p-1 rounded bg-inherit box-border justify-center'
          key={color}
          onClick={() => onSelect(color)}
          style={{
            border: color === parsedColor?.hex ? '1px solid #000000' : 'none',
          }}
        >
          <div
            className='w-[25px] h-[25px] rounded-full shadow'
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
