import React, { useEffect, useRef, useState } from 'react'
import type { DropdownItemProps } from './types'

const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  onDropdownItemSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openLeft, setOpenLeft] = useState(false)
  const menuRef = useRef<HTMLLIElement | null>(null)

  const checkPosition = () => {
    const el = menuRef.current
    if (!el) {
      return
    }
    const rect = el.getBoundingClientRect()
    setOpenLeft(rect.right + 160 > window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', checkPosition)
    return () => {
      window.removeEventListener('resize', checkPosition)
    }
  }, [])

  const handleClick = () => {
    if (!item.children) {
      onDropdownItemSelect(item)
    }
  }

  const handleMouseEnter = () => {
    setIsOpen(true)
    checkPosition()
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  return (
    <li
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <button
        className='w-full text-left px-4 py-2 hover:bg-gray-100 
        flex justify-between items-center'
        onClick={handleClick}
      >
        {item.label}
        {item.children && <span>▶</span>}
      </button>

      {item.children && isOpen && (
        <ul
          className={`absolute top-0 bg-white shadow-lg rounded
        border border-gray-200 min-w-[160px] z-20 ${
          openLeft ? 'right-full' : 'left-full'
        }`}
        >
          {item.children.map((child, index) => (
            <DropdownItem
              key={index}
              item={child}
              onDropdownItemSelect={onDropdownItemSelect}
            ></DropdownItem>
          ))}
        </ul>
      )}
    </li>
  )
}

export default DropdownItem
