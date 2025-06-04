import React, { useRef } from 'react'
import type { SliderProps } from './types'

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label = '',
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  let trackStart = 0
  let trackWidth = 0

  const fillWidth = Math.min(
    Math.max(((value - min) / (max - min)) * 100, 0),
    100
  )

  const updateFromClientX = (clientX: number) => {
    if (trackWidth === 0) return
    const offset = clientX - trackStart
    const ratio = offset / trackWidth
    const clampedRatio = Math.min(Math.max(ratio, 0), 1)
    const raw = min + clampedRatio * (max - min)
    const snapped = Math.round(raw / step) * step
    const finalValue = Math.min(max, Math.max(min, snapped))
    onChange(finalValue)
  }

  const startDragging = (_: React.MouseEvent) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    trackStart = rect.left
    trackWidth = rect.width
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    updateFromClientX(e.clientX)
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const onTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    trackStart = rect.left
    trackWidth = rect.width
    updateFromClientX(e.clientX)
  }

  return (
    <div className='w-full px-4 py-6'>
      {/* Label & Value */}
      <div className='mb-2 flex justify-between text-sm text-gray-700'>
        <label>{label}</label>
        <span>{value}</span>
      </div>

      {/* Slider Track */}
      <div
        ref={trackRef}
        className='relative h-2 rounded-full bg-gray-300 cursor-pointer select-none'
        onMouseDown={onTrackClick}
      >
        {/* Filled Track */}
        <div
          className='absolute top-0 left-0 h-full bg-blue-500 rounded-full'
          style={{ width: `${fillWidth + 1}%` }}
          onDragStart={(e) => e.preventDefault()}
        />

        {/* Thumb */}
        <div
          className='absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow'
          style={{ left: `${fillWidth}%` }}
          onMouseDown={(e) => {
            e.stopPropagation()
            startDragging(e)
          }}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
    </div>
  )
}

export default Slider
