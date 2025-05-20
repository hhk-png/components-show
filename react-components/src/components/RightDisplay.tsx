import type { FileTree } from '~/types/file.ts'
import React, { Suspense, useEffect, useState } from 'react'
import { joinClassName } from '~/utils/css'
import Code from './Code'
import './RightDisplay.css'

interface RightDisplayProps {
  className?: string
  selectedComponent: string | undefined
}

const FrameworkNames = ['React', 'Vue']

const RightDisplay: React.FC<RightDisplayProps> = ({
  className,
  selectedComponent,
}) => {
  const [componentData, setComponentData] = useState<FileTree>([])
  const [selectedFramework, setSelectedFramework] = useState<string>('React')
  const [blogHtml, setBlogHtml] = useState<string>('')

  const [Component, setComponent] = useState<React.FC>()
  // load Component instance
  const loadComponent = () => {
    if (selectedComponent) {
      const Component = React.lazy(
        () => import(`../components-show/${selectedComponent}/index.ts`),
      )
      setComponent(() => Component)
    }
  }

  // load Component source code
  const loadSourceCode = async (framework: string) => {
    if (selectedComponent) {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/${framework}/${selectedComponent}.json`,
        )
        const data = await response.json()
        setComponentData(data)
      }
      catch (error) {
        console.error('Error when loading component data:', error)
      }
    }
  }

  useEffect(() => {
    if (selectedComponent) {
      loadSourceCode(selectedFramework)
      loadComponent()
    }

    return () => {
      setBlogHtml('')
      setComponent(undefined)
      setComponentData([])
    }
  }, [selectedComponent])

  const loadComponentText = (name: string) => {
    setSelectedFramework(name)
    loadSourceCode(name)
  }

  // blog
  const showBlog = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/MD/${selectedComponent}.html`)
      .then(res => res.text())
      .then(setBlogHtml)
  }

  return (
    <div className={joinClassName(className!)}>
      {/* Top components instance */}
      <div className="h-[50vh] flex items-center justify-center">
        <Suspense fallback={<div>loading component...</div>}>
          {Component && <Component />}
        </Suspense>
      </div>

      {/* show vue and react text */}
      <div className="flex gap-2 mb-4">
        {FrameworkNames.map(name => (
          <div
            key={name}
            onClick={() => loadComponentText(name)}
            className={`p-4 cursor-pointer flex-1 text-center 
            rounded-lg shadow-md transition-all duration-50 hover:shadow-lg ${
          selectedFramework === name
            ? 'bg-blue-700 text-white'
            : 'bg-gray-200 text-gray-800'
          }`}
          >
            {name}
          </div>
        ))}
      </div>

      {/* code */}
      <Code className="h-[70vh] mb-4" code={componentData}></Code>

      {/* blog */}
      {blogHtml === ''
        ? (
            <div
              onClick={() => showBlog()}
              className="h-10 bg-blue-500 text-white rounded-lg
          flex items-center justify-center cursor-pointer
          hover:bg-blue-600 transition duration-300 mb-100"
            >
              show blog
            </div>
          )
        : (
            <div
              dangerouslySetInnerHTML={{ __html: blogHtml }}
              className="blog overflow-hidden mx-40 mb-100 user-select-text"
            >
            </div>
          )}
    </div>
  )
}

export default RightDisplay
