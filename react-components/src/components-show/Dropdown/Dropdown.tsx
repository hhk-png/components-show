import { useState } from 'react'
import type { DropdownItem, DropdownProps } from './types'
import DropdownItemComp from './DropdownItem'

const Dropdown: React.FC<DropdownProps> = ({ items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (item: DropdownItem) => {
    onSelect(item)
    setIsOpen(false)
  }

  return (
    <div
      className='relative inline-block'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className='box-border w-[160px] px-4 py-2 bg-blue-600 
        text-white rounded hover:bg-blue-700'
      >
        菜单
      </button>

      {isOpen && (
        <ul
          className='absolute pt-2 left-0 bg-white shadow-lg 
          rounded border border-gray-200 min-w-[160px] z-10'
        >
          {items.map((item, index) => (
            <DropdownItemComp
              key={index}
              item={item}
              onDropdownItemSelect={handleSelect}
            ></DropdownItemComp>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
