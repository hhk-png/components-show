import type { CompDir, CompFile, FileItem, FileTree } from '~/types/file'
import React, { useEffect, useState } from 'react'
import { cloneDeep } from '~/utils/all'
import { joinClassName } from '~/utils/css'
import Icon from './Icon'

interface CodeProps {
  className?: string
  code: FileTree
}

const FileIcon = (ext: string) => {
  let iconPath = ''
  if (ext === '.ts') {
    iconPath = '/typescript.svg'
  } else if (ext === '.tsx') {
    iconPath = '/react.svg'
  } else if (ext === '.vue') {
    iconPath = '/vue.svg'
  } else {
    return '📄'
  }

  return (
    <Icon className='h-5 w-5 mr-2 mb-1' src={iconPath} alt={ext.slice(1)} />
  )
}

const dirIcon = (isOpen: boolean) => {
  return (
    <Icon
      className='h-5 w-5 mr-2 mb-1'
      src={isOpen ? '/dirOpen.svg' : '/dirClose.svg'}
      alt='dir'
    ></Icon>
  )
}

const Code: React.FC<CodeProps> = ({ code, className }) => {
  const [selectedFileContent, setSelectedFileContent] = useState<string>()
  const [treeData, setTreeData] = useState<FileTree>(code)
  useEffect(() => {
    // A change of code prop may indicate that the
    //  the state of this component needs to be cleared
    setSelectedFileContent(undefined)
    setTreeData(code)
  }, [code])

  // file click
  const handleFileClick = async (file: CompFile) => {
    setSelectedFileContent(file.content)
  }

  // toogle folder open/close
  const toggleFolder = (folderPath: string) => {
    const newTreeData = cloneDeep(treeData)
    const toggleRecursively = (folder: FileItem) => {
      if (folder.path === folderPath) {
        folder.isOpen = !folder.isOpen
      }
      if (folder.type === 'dir') {
        ;(folder as CompDir).children.forEach(toggleRecursively)
      }
    }
    newTreeData.forEach(toggleRecursively)
    setTreeData(newTreeData)
  }

  // recursive render file tree
  const renderFileTree = (tree: FileTree) => {
    if (!tree) return null

    return tree.map((item) => {
      if (item.type === 'dir') {
        return (
          <div key={item.path}>
            <div
              className='text-gray-400 font-semibold cursor-pointer hover:bg-gray-600 p-1 rounded'
              onClick={() => toggleFolder(item.path)}
            >
              {dirIcon(item.isOpen)}
              {item.name}
            </div>
            {item.isOpen && (
              <div className='ml-4'>
                {renderFileTree((item as CompDir).children)}
              </div>
            )}
          </div>
        )
      } else {
        return (
          <div
            key={item.path}
            className='cursor-pointer hover:bg-gray-600 p-1 text-gray-200 rounded font-mono'
            onClick={() => handleFileClick(item as CompFile)}
          >
            {FileIcon((item as CompFile).ext)}

            {item.name}
          </div>
        )
      }
    })
  }

  return (
    <div
      className={`${`${joinClassName(className!)}flex h-screen bg-gray-800`}`}
    >
      {/* Left: File Tree */}
      <div className='w-1/4 bg-gray-900 p-4 overflow-y-auto'>
        <div className='text-gray-300 font-semibold mb-2'>File Explorer</div>
        {renderFileTree(treeData)}
      </div>

      {/* Right: Code Display */}
      <div className='flex-1 p-1 overflow-y-auto bg-[#121212]-900 text-white'>
        {selectedFileContent ? (
          <div
            className='whitespace-pre-wrap break-words'
            dangerouslySetInnerHTML={{ __html: selectedFileContent }}
          ></div>
        ) : (
          <p>Select a file to view the code...</p>
        )}
      </div>
    </div>
  )
}

export default Code
