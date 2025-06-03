import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ImageProps } from './types'

const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
  fit = 'fill',
  lazy = false,
  scrollContainer,
  className = '',
  onLoad,
  onError,
  placeholder = <DefaultPlaceholder />,
  fallback = <DefaultFallback />,
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading'
  )
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const loadImage = useCallback(() => {
    if (!src) {
      setStatus('error')
      return
    }

    setStatus('loading')
    const img = new window.Image()
    img.src = src

    img.onload = (event) => {
      setStatus('loaded')
      onLoad?.(event as any)
    }

    img.onerror = () => {
      setStatus('error')
      onError?.(new Error('Image load failed'))
    }
  }, [src, onLoad, onError])

  // 懒加载实现
  useEffect(() => {
    if (!lazy) {
      loadImage()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage()
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: scrollContainer instanceof HTMLElement ? scrollContainer : null,
        rootMargin: '200px',
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [lazy, loadImage, scrollContainer])

  const fitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  }[fit]

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {status === 'loading' && placeholder}
      {status === 'error' && fallback}
      {status === 'loaded' && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={`w-full h-full ${fitClasses}`}
          loading={lazy ? 'lazy' : 'eager'}
        />
      )}
    </div>
  )
}

// 默认占位组件
const DefaultPlaceholder = () => (
  <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
    <span className='text-gray-500'>Loading...</span>
  </div>
)

// 默认错误回退组件
const DefaultFallback = () => (
  <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
    <span className='text-gray-500'>Image load failed</span>
  </div>
)

export default Image
