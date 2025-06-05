import { useState, useRef, useEffect, useCallback, CSSProperties } from 'react'
import type { ScrollbarProps } from './types'

const Scrollbar = ({
  children,
  height = '100%',
  width = '100%',
  thumbSize = 8,
  scrollSpeed = 1,
  className = '',
}: ScrollbarProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const verticalTrackRef = useRef<HTMLDivElement>(null)
  const horizontalTrackRef = useRef<HTMLDivElement>(null)

  const [showScrollbars, setShowScrollbars] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingVertical, setIsDraggingVertical] = useState(false)
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  // 鼠标位置和滚动起始位置记录
  const startY = useRef(0)
  const startX = useRef(0)
  const startScrollTop = useRef(0)
  const startScrollLeft = useRef(0)
  const startDragX = useRef(0)
  const startDragY = useRef(0)
  const startDragScrollLeft = useRef(0)
  const startDragScrollTop = useRef(0)

  // 容器样式
  const containerStyle: CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    width: typeof width === 'number' ? `${width}px` : width,
    position: 'relative',
  }

  // 内容容器样式
  const contentWrapperStyle: CSSProperties = {
    transform: `translate(${-scrollLeft}px, ${-scrollTop}px)`,
    willChange: 'transform',
    position: 'absolute',
  }

  // 是否显示垂直滚动条
  const showVerticalScrollbar = contentHeight > containerHeight

  // 是否显示水平滚动条
  const showHorizontalScrollbar = contentWidth > containerWidth

  // 垂直滑块样式
  const verticalThumbStyle: CSSProperties = {
    height: `${Math.max(
      (containerHeight / contentHeight) * containerHeight,
      thumbSize * 2
    )}px`,
    top: `${
      (scrollTop / (contentHeight - containerHeight)) *
      (containerHeight -
        Math.max(
          (containerHeight / contentHeight) * containerHeight,
          thumbSize * 2
        ))
    }px`,
    width: `${thumbSize}px`,
  }

  // 水平滑块样式
  const horizontalThumbStyle: CSSProperties = {
    width: `${Math.max(
      (containerWidth / contentWidth) * containerWidth,
      thumbSize * 2
    )}px`,
    left: `${
      (scrollLeft / (contentWidth - containerWidth)) *
      (containerWidth -
        Math.max(
          (containerWidth / contentWidth) * containerWidth,
          thumbSize * 2
        ))
    }px`,
    height: `${thumbSize}px`,
  }

  // 初始化尺寸
  const initSizes = useCallback(() => {
    if (!contentWrapperRef.current || !containerRef.current) return

    const contentEl = contentWrapperRef.current.children[0] as HTMLElement
    if (!contentEl) return

    setContentHeight(contentEl.offsetHeight)
    setContentWidth(contentEl.offsetWidth)
    setContainerHeight(containerRef.current.offsetHeight)
    setContainerWidth(containerRef.current.offsetWidth)

    // 限制滚动位置
    setScrollTop((prev) =>
      Math.max(
        0,
        Math.min(
          prev,
          contentEl.offsetHeight - containerRef.current!.offsetHeight
        )
      )
    )
    setScrollLeft((prev) =>
      Math.max(
        0,
        Math.min(
          prev,
          contentEl.offsetWidth - containerRef.current!.offsetWidth
        )
      )
    )
  }, [])

  // 处理鼠标滚轮
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()

      // 优先处理垂直滚动
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        setScrollTop((prev) =>
          Math.max(
            0,
            Math.min(
              prev + e.deltaY * scrollSpeed,
              contentHeight - containerHeight
            )
          )
        )
      } else {
        setScrollLeft((prev) =>
          Math.max(
            0,
            Math.min(
              prev + e.deltaX * scrollSpeed,
              contentWidth - containerWidth
            )
          )
        )
      }

      setShowScrollbars(true)
      resetHideTimer()
    },
    [contentHeight, contentWidth, containerHeight, containerWidth, scrollSpeed]
  )

  // 开始拖动内容
  const startDrag = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return // 只处理左键

      setIsDragging(true)
      startDragX.current = e.clientX
      startDragY.current = e.clientY
      startDragScrollLeft.current = scrollLeft
      startDragScrollTop.current = scrollTop

      document.addEventListener('mousemove', handleDrag)
      document.addEventListener('mouseup', stopDrag)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'

      e.preventDefault()
    },
    [scrollLeft, scrollTop]
  )

  // 处理拖动内容
  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = startDragX.current - e.clientX
      const deltaY = startDragY.current - e.clientY

      const newScrollLeft = startDragScrollLeft.current + deltaX
      const newScrollTop = startDragScrollTop.current + deltaY

      // 限制滚动范围
      setScrollLeft(
        Math.max(0, Math.min(newScrollLeft, contentWidth - containerWidth))
      )
      setScrollTop(
        Math.max(0, Math.min(newScrollTop, contentHeight - containerHeight))
      )

      e.preventDefault()
    },
    [isDragging, contentHeight, contentWidth, containerHeight, containerWidth]
  )

  // 停止拖动内容
  const stopDrag = useCallback(() => {
    setIsDragging(false)
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [handleDrag])

  // 开始垂直拖动滚动条
  const startVerticalDrag = useCallback(
    (e: React.MouseEvent) => {
      setIsDraggingVertical(true)
      startY.current = e.clientY
      startScrollTop.current = scrollTop

      document.addEventListener('mousemove', handleVerticalDrag)
      document.addEventListener('mouseup', stopVerticalDrag)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'

      e.preventDefault()
      e.stopPropagation()
    },
    [scrollTop]
  )

  // 处理垂直拖动滚动条
  const handleVerticalDrag = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingVertical || !verticalTrackRef.current) return

      const deltaY = e.clientY - startY.current
      const trackHeight = verticalTrackRef.current.offsetHeight
      const thumbHeight = (containerHeight / contentHeight) * trackHeight
      const scrollableDistance = trackHeight - thumbHeight

      const scrollDelta = (deltaY / scrollableDistance) * contentHeight
      const newScrollTop = startScrollTop.current + scrollDelta

      // 限制滚动范围
      setScrollTop(
        Math.max(0, Math.min(newScrollTop, contentHeight - containerHeight))
      )

      e.preventDefault()
    },
    [isDraggingVertical, containerHeight, contentHeight]
  )

  // 停止垂直拖动滚动条
  const stopVerticalDrag = useCallback(() => {
    setIsDraggingVertical(false)
    document.removeEventListener('mousemove', handleVerticalDrag)
    document.removeEventListener('mouseup', stopVerticalDrag)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [handleVerticalDrag])

  // 开始水平拖动滚动条
  const startHorizontalDrag = useCallback(
    (e: React.MouseEvent) => {
      setIsDraggingHorizontal(true)
      startX.current = e.clientX
      startScrollLeft.current = scrollLeft

      document.addEventListener('mousemove', handleHorizontalDrag)
      document.addEventListener('mouseup', stopHorizontalDrag)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'

      e.preventDefault()
      e.stopPropagation()
    },
    [scrollLeft]
  )

  // 处理水平拖动滚动条
  const handleHorizontalDrag = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingHorizontal || !horizontalTrackRef.current) return

      const deltaX = e.clientX - startX.current
      const trackWidth = horizontalTrackRef.current.offsetWidth
      const thumbWidth = (containerWidth / contentWidth) * trackWidth
      const scrollableDistance = trackWidth - thumbWidth

      const scrollDelta = (deltaX / scrollableDistance) * contentWidth
      const newScrollLeft = startScrollLeft.current + scrollDelta

      // 限制滚动范围
      setScrollLeft(
        Math.max(0, Math.min(newScrollLeft, contentWidth - containerWidth))
      )

      e.preventDefault()
    },
    [isDraggingHorizontal, containerWidth, contentWidth]
  )

  // 停止水平拖动滚动条
  const stopHorizontalDrag = useCallback(() => {
    setIsDraggingHorizontal(false)
    document.removeEventListener('mousemove', handleHorizontalDrag)
    document.removeEventListener('mouseup', stopHorizontalDrag)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [handleHorizontalDrag])

  // 自动隐藏滚动条的计时器
  const hideTimer = useRef<number | null>(null)
  const resetHideTimer = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => {
      setShowScrollbars(false)
    }, 1500)
  }, [])

  // 监听内容变化
  useEffect(() => {
    const container = containerRef.current
    const contentWrapper = contentWrapperRef.current
    if (!container || !contentWrapper) return

    const contentEl = contentWrapper.children[0] as HTMLElement
    if (!contentEl) return

    // 初始化尺寸
    initSizes()

    // 监听容器大小变化
    const resizeObserver = new ResizeObserver(() => {
      initSizes()
    })
    resizeObserver.observe(container)

    // 监听内容变化
    const mutationObserver = new MutationObserver(() => {
      initSizes()
    })
    mutationObserver.observe(contentEl, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    })

    // 添加滚轮事件
    contentWrapper.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      contentWrapper.removeEventListener('wheel', handleWheel)
      if (hideTimer.current) clearTimeout(hideTimer.current)

      // 清理事件监听
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', stopDrag)
      document.removeEventListener('mousemove', handleVerticalDrag)
      document.removeEventListener('mouseup', stopVerticalDrag)
      document.removeEventListener('mousemove', handleHorizontalDrag)
      document.removeEventListener('mouseup', stopHorizontalDrag)
    }
  }, [handleWheel, handleDrag, initSizes])

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
      ref={containerRef}
      onMouseEnter={() => setShowScrollbars(true)}
      onMouseLeave={() => setShowScrollbars(false)}
    >
      {/* 内容容器 */}
      <div
        className='absolute w-full'
        style={contentWrapperStyle}
        ref={contentWrapperRef}
        onMouseDown={startDrag}
      >
        {children}
      </div>

      {/* 垂直滚动条 */}
      {showVerticalScrollbar && (
        <div
          className='absolute top-0 right-0 bottom-0 w-2 bg-gray-200 bg-opacity-30 rounded-full transition-opacity duration-200'
          style={{
            opacity: isDraggingVertical || showScrollbars ? 1 : 0,
          }}
          ref={verticalTrackRef}
        >
          <div
            className='absolute top-0 left-0 right-0 bg-gray-500 rounded-full cursor-pointer hover:bg-gray-600 transition-colors duration-200'
            style={verticalThumbStyle}
            onMouseDown={startVerticalDrag}
          />
        </div>
      )}

      {/* 水平滚动条 */}
      {showHorizontalScrollbar && (
        <div
          className='absolute bottom-0 left-0 right-0 h-2 bg-gray-200 bg-opacity-30 rounded-full transition-opacity duration-200'
          style={{
            opacity: isDraggingHorizontal || showScrollbars ? 1 : 0,
          }}
          ref={horizontalTrackRef}
        >
          <div
            className='absolute top-0 left-0 bottom-0 bg-gray-500 rounded-full cursor-pointer hover:bg-gray-600 transition-colors duration-200'
            style={horizontalThumbStyle}
            onMouseDown={startHorizontalDrag}
          />
        </div>
      )}
    </div>
  )
}

export default Scrollbar
