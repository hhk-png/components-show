import React from 'react'

interface LeftMenuProps {
  className?: string
  components: string[]
  onSelectComponent: (component: string) => void
}

const LeftMenu: React.FC<LeftMenuProps> = ({
  className,
  components,
  onSelectComponent,
}) => {
  return (
    <div className={'flex flex-col gap-2 shrink-0' + (className ? ` ${className}` : '')}>
      {components.map((component) => (
        <button
          key={component}
          onClick={() => onSelectComponent(component)}
          className="bg-blue-500 text-white p-3 rounded-lg m-1 mb-0 cursor-pointer 
          hover:bg-blue-600 active:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
        >
          {component}
        </button>
      ))}
    </div>
  )
}

export default LeftMenu
