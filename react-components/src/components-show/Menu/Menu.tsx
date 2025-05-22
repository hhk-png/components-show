import React, { useState } from 'react'
import type { MenuItemProps, MenuProps, SubMenuProps } from './types'

// Menu 容器
export const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <div className='w-64 bg-white border rounded-md shadow max-h-[45vh] overflow-y-auto overflow-x-hidden'>{children}</div>
  )
}

// 单个菜单项
export const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-800'
    >
      {children}
    </div>
  )
}

// 子菜单组件
export const SubMenu: React.FC<SubMenuProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='border-t border-gray-200'>
      <div
        className='flex justify-between items-center 
        px-4 py-2 cursor-pointer hover:bg-gray-100 
        text-sm font-medium text-gray-800'
        onClick={() => setOpen(!open)}
      >
        {title}
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${
            open ? 'rotate-90' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </div>
      {open && <div className='pl-4'>{children}</div>}
    </div>
  )
}
