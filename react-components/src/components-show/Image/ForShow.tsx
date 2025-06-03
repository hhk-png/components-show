import React from 'react'
import Image from './Image'

export const ImageDemo: React.FC = () => {
  return (
    <div className='h-[300px] w-[200px] overflow-y-auto'>
      <div className='h-[1000px] bg-gray-200'></div>
      <Image
        src='https://jsonplaceholder.typicode.com/mockend.svg'
        lazy
        fit='cover'
      />
    </div>
  )
}

export default ImageDemo
