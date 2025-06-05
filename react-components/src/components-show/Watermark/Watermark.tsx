import React, { useEffect, useRef } from 'react'
import type { WatermarkProps } from './types'

const Watermark: React.FC<WatermarkProps> = ({
  text,
  fontSize = 16,
  rotate = -20,
  opacity = 0.1,
  children,
  className = '',
  markSize = [300, 200],
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = markSize[0]
    canvas.height = markSize[1]

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = opacity
    ctx.font = `${fontSize}px sans-serif`
    ctx.fillStyle = '#000'
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotate * Math.PI) / 180)
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0)

    const base64Url = canvas.toDataURL()
    if (containerRef.current) {
      containerRef.current.style.backgroundImage = `url(${base64Url})`
    }
  }, [text, fontSize, rotate, opacity, markSize])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none bg-repeat ${className}`}
      style={{
        backgroundSize: `${markSize[0]}px ${markSize[1]}px`,
      }}
    >
      {children}
    </div>
  )
}

export default Watermark
