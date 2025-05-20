import React, { useState, useRef } from 'react'
import { PopoverProps } from './types'

const Popover: React.FC<PopoverProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  const handleMouseEnter = () => {
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  return (
    <div
      className='relative inline-block'
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className='bg-[#007BFF] text-white p-2.5 
        border-none cursor-pointer rounded'
        aria-haspopup='true'
        aria-expanded={isVisible}
        aria-controls='popover-content'
      >
        {children}
      </div>
      {isVisible && (
        <div
          id='popover-content'
          className='absolute top-full translate-y-2 left-1/2 mb-2.5 
          -translate-x-1/2 bg-white border-[#ccc] shadow-lg rounded 
          p-3 z-[1000] whitespace-nowrap '
          role='dialog'
          aria-modal='true'
        >
          {content}
        </div>
      )}
    </div>
  )
}

export default Popover
