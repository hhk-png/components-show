import React, { useState } from 'react'
import type { CSSProperties } from 'react'

export interface FixedRow {
  index: number
  style: React.CSSProperties
}

export interface FixedSizeList {
  height: number
  width: number
  itemSize: number
  itemCount: number
  children: React.ComponentType<FixedRow>
}

const FixedSizeList: React.FC<FixedSizeList> = (props) => {
  const { height, width, itemCount, itemSize, children: Child } = props
  const [scrollOffset, setScrollOffset] = useState<number>(0)
  const containerStyle: CSSProperties = {
    position: 'relative',
    width,
    height,
    overflow: 'auto',
  }

  const contentStyle: CSSProperties = {
    height: itemSize * itemCount,
    width: '100%',
  }

  const getCurrentChildren = () => {
    const startIndex = Math.floor(scrollOffset / itemSize)
    const finalStartIndex = Math.max(0, startIndex - 2)
    const numVisible = Math.ceil(height / itemSize)
    const endIndex = Math.min(itemCount, startIndex + numVisible + 2)
    const items = []
    for (let i = finalStartIndex; i < endIndex; i++) {
      const itemStyle: React.CSSProperties = {
        position: 'absolute',
        height: itemSize,
        width: '100%',
        top: itemSize * i,
      }
      items.push(<Child key={i} index={i} style={itemStyle}></Child>)
    }
    return items
  }

  const scrollHandle = (event: React.UIEvent<HTMLDivElement>): void => {
    const { scrollTop } = event.currentTarget
    setScrollOffset(scrollTop)
  }

  return (
    <div style={containerStyle} onScroll={scrollHandle}>
      <div style={contentStyle}>
        { getCurrentChildren() }
      </div>
    </div>
  )
}

export default FixedSizeList
