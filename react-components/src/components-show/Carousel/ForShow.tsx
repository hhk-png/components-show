import React from 'react'
import Carousel from './Carousel'

const App: React.FC = () => {
  const images = [
  "https://picsum.photos/id/1015/800/600", // 河流
  "https://picsum.photos/id/1016/800/600", // 山
  "https://picsum.photos/id/1018/800/600", // 天空
  "https://picsum.photos/id/1020/800/600", // 森林小路
  "https://picsum.photos/id/1021/800/600", // 城市
  ]

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <Carousel images={images} interval={4000} />
    </div>
  )
}

export default App
