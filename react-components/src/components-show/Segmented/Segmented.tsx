import { useRef, useState, useEffect } from 'react'
import { SegmentedControlProps } from './types'

const SegmentedControl = ({
  name,
  segments,
  onSelect,
  defaultIndex = 0,
}: SegmentedControlProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const componentReady = useRef<boolean>(false)
  const controlRef = useRef<HTMLDivElement | null>(null)

  // Replace external refs with internal refs
  const segmentRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    componentReady.current = true
  }, [])

  useEffect(() => {
    const activeSegmentRef = segmentRefs.current[activeIndex]
    if (activeSegmentRef && controlRef.current) {
      const { offsetWidth, offsetLeft } = activeSegmentRef
      const { style } = controlRef.current

      style.setProperty('--highlight-width', `${offsetWidth}px`)
      style.setProperty('--highlight-x-pos', `${offsetLeft}px`)
    }
  }, [activeIndex, onSelect])

  const onInputChange = (value: string, index: number) => {
    setActiveIndex(index)
    onSelect(value, index)
  }

  return (
    <div
      className='flex'
      style={
        {
          '--highlight-width': 'auto',
          '--highlight-x-pos': 0,
        } as React.CSSProperties
      }
      ref={controlRef}
    >
      <div
        className={`inline-flex justify-between bg-white shadow-md rounded-lg 
          max-w-[500px] p-3 mx-auto overflow-hidden relative
          before:absolute before:content-[''] before:top-2 before:bottom-2 
          before:left-0 before:z-[0] before:w-[var(--highlight-width)] 
          before:bg-blue-500 before:rounded-lg before:w-[var(--highlight-width)] 
          before:translate-x-[var(--highlight-x-pos)]
          ${
            componentReady.current
              ? 'before:transition-transform before:transition-width before:duration-300'
              : ''
          }
        `}
      >
        {segments?.map((item, i) => (
          <div
            key={item.value}
            className='min-w-[120px] relative text-center z-1'
            ref={(el) => {
              segmentRefs.current[i] = el
            }}
          >
            <input
              className='absolute inset-0 w-full h-full opacity-0 m-0 cursor-pointer'
              type='radio'
              value={item.value}
              id={item.label}
              name={name}
              onChange={() => onInputChange(item.value, i)}
              checked={i === activeIndex}
            />
            <label
              className={`cursor-pointer block font-bold p-3 transition-colors duration-500 ${
                i === activeIndex ? 'text-white' : ''
              }`}
              htmlFor={item.label}
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SegmentedControl
