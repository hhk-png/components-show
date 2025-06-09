import React from 'react'

interface LeftMenuProps {
  className?: string
  components: string[]
  selectedComponent: string
  onSelectComponent: (component: string) => void
}

const LeftMenu: React.FC<LeftMenuProps> = ({
  className,
  components,
  selectedComponent,
  onSelectComponent,
}) => {
  return (
    <div className={`flex flex-col gap-2 shrink-0 pb-3 ${className ? `${className}` : ''}`}>
      {components.length === 0 
        ? (Array.from({length: 15}).map((_, index) => (
            <button
              type="button"
              key={index}
              className="bg-blue-500 text-white p-3 rounded-lg m-1 mb-0"
            >
              Loading...
            </button>
          )))
        : components.map(component => (
            <button
              type="button"
              key={component}
              onClick={() => onSelectComponent(component)}
              className={`bg-blue-500 text-white p-3 rounded-lg m-1 mb-0 cursor-pointer 
              hover:bg-blue-600 hover:shadow-lg active:bg-blue-700 transition duration-200
              ${selectedComponent === component ? ' bg-blue-600 shadow-lg' : ''}`}
            >
              {component}
            </button>
          ))}
    </div>
  )
}

export default LeftMenu
