import React, { useEffect, useRef, useState } from 'react'
import type { CarouselProps } from './types'

const Carousel: React.FC<CarouselProps> = ({ images, interval = 3000 }) => {
  // 防止快速点击时出现白屏
  const [isLocked, setIsLocked] = useState(false)
  const [current, setCurrent] = useState(1)
  const [isAnimating, setIsAnimating] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const total = images.length

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const goTo = (index: number) => {
    if (isLocked) return
    setCurrent(index)
    setIsAnimating(true)
    setIsLocked(true)
  }

  const next = () => {
    goTo(current + 1)
  }

  const prev = () => {
    goTo(current - 1)
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      next()
    }, interval)

    return () => resetTimeout()
  }, [current, interval])

  const handleTransitionEnd = () => {
    setIsLocked(false)

    if (current === 0) {
      setIsAnimating(false)
      setCurrent(total)
    }
    if (current === total + 1) {
      setIsAnimating(false)
      setCurrent(1)
    }
  }

  const clonedImages = [images[total - 1], ...images, images[0]]

  return (
    <div className='relative w-full overflow-hidden rounded-2xl shadow-lg'>
      {/* Slides */}
      <div
        className={`flex transition-transform duration-700 ease-in-out ${
          !isAnimating ? 'transition-none' : ''
        }`}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {clonedImages.map((img, index) => (
          <div className='min-w-full h-64 flex-shrink-0' key={index}>
            <img
              src={img}
              alt={`Slide ${index}`}
              className='w-full h-full object-cover'
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className='absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5 text-black'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>

      <button
        onClick={next}
        className='absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5 text-black'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
        </svg>
      </button>

      {/* Dots */}
      <div className='absolute bottom-4 w-full flex justify-center gap-2'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index + 1)} // 注意偏移
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index + 1 ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
