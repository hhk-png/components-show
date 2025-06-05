import type { PredefinedSelectorProps } from './types'

const predefinedRows = 3

export const PredefinedSelector = (props: PredefinedSelectorProps) => {
  const { parsedColor, colors, onSelect } = props

  return (
    <div
      className='
        flex
        flex-col
        flex-wrap
        max-w-full
        min-w-[200px]
        pb-4
        overflow-auto
        scrollbar-hide
      '
      style={{
        height: 2 + 35 * predefinedRows + 'px',
        width: 16 + 35 * Math.ceil(colors.length / predefinedRows) + 'px',
      }}
    >
      {colors.map((color) => (
        <button
          className='
            w-[37px]
            p-[5px]
            rounded
            bg-inherit
          '
          key={color}
          onClick={() => onSelect(color)}
          style={{
            border: color === parsedColor?.hex ? '1px solid #000000' : 'none',
          }}
        >
          <div
            className='
              w-[25px]
              h-[25px]
              rounded-full
              shadow-[0px_1px_3px_rgba(0,0,0,0.2),0px_1px_1px_rgba(0,0,0,0.14),0px_2px_1px_-1px_rgba(0,0,0,0.12)]
            '
            style={{
              background: color,
            }}
          />
        </button>
      ))}
    </div>
  )
}

export default PredefinedSelector
