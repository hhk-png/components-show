import React, { useEffect, useState } from 'react'
import { TourProps } from './types'

const TourWithHoleMask: React.FC<TourProps> = ({ steps, onFinish, onSkip }) => {
  const [current, setCurrent] = useState(0)
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 })

  const currentStep = steps[current]

  useEffect(() => {
    const el = document.querySelector(currentStep?.target) as HTMLElement
    if (el) {
      const rect = el.getBoundingClientRect()
      setHighlightRect(rect)

      const spacing = 10
      let top = rect.top + window.scrollY
      let left = rect.left + window.scrollX

      switch (currentStep.placement) {
        case 'bottom':
          top += rect.height + spacing
          break
        case 'top':
          top -= spacing + 100
          break
        case 'left':
          left -= 250
          break
        case 'right':
        default:
          left += rect.width + spacing
          break
      }

      setTooltipPos({ top, left })

      el.scrollIntoView({ behavior: 'smooth', block: 'center' })

      // Elevate target
      el.style.zIndex = '1000'
      el.style.position = 'relative'

      return () => {
        el.style.zIndex = ''
        el.style.position = ''
      }
    }
  }, [currentStep])

  const next = () => {
    if (current + 1 < steps.length) {
      setCurrent(current + 1)
    } else {
      onFinish?.()
      setCurrent(-1)
    }
  }

  const skip = () => {
    onSkip?.()
    setCurrent(-1)
  }

  if (current === -1 || !currentStep || !highlightRect) return null

  const padding = 8
  const hole = {
    x: highlightRect.left - padding,
    y: highlightRect.top - padding,
    width: highlightRect.width + 2 * padding,
    height: highlightRect.height + 2 * padding,
  }

  return (
    <>
      {/* 遮罩层 + 洞 */}
      <svg
        className='fixed inset-0 w-screen h-screen z-40 pointer-events-none'
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <defs>
          <mask id='hole-mask'>
            <rect x='0' y='0' width='100%' height='100%' fill='white' />
            <rect
              x={hole.x}
              y={hole.y}
              width={hole.width}
              height={hole.height}
              fill='black'
              rx='10'
            />
          </mask>
        </defs>
        <rect
          x='0'
          y='0'
          width='100%'
          height='100%'
          fill='rgba(0,0,0,0.6)'
          mask='url(#hole-mask)'
        />
      </svg>

      {/* 提示框 */}
      <div
        className='fixed z-50 p-4 w-64 bg-white rounded-xl shadow-xl border'
        style={{
          top: tooltipPos.top,
          left: tooltipPos.left,
        }}
      >
        <p className='text-sm'>{currentStep.content}</p>
        <div className='flex justify-end mt-3 space-x-2'>
          <button onClick={skip} className='text-gray-400 text-sm'>
            跳过
          </button>
          <button
            onClick={next}
            className='px-3 py-1 bg-blue-500 text-white text-sm rounded-md'
          >
            {current + 1 === steps.length ? '完成' : '下一步'}
          </button>
        </div>
      </div>
    </>
  )
}

export default TourWithHoleMask
