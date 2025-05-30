import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { VirtualTableProps } from './types'

const VirtualTable: React.FC<VirtualTableProps> = ({
  rowCount,
  colCount,
  rowHeight,
  colWidths,
  width,
  height,
  headers,
  cellRenderer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [scrollTop, setScrollTop] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // 工具函数：计算可视列范围
  const getVisibleColRange = (scrollLeft: number, viewWidth: number) => {
    let start = 0
    let acc = 0
    while (start < colWidths.length && acc + colWidths[start] < scrollLeft) {
      acc += colWidths[start]
      start++
    }

    let end = start
    let width = 0
    while (end < colWidths.length && width < viewWidth) {
      width += colWidths[end]
      end++
    }

    return [start, Math.min(end + 2, colCount)]
  }

  const getOffsetX = (colIndex: number) => {
    return colWidths.slice(0, colIndex).reduce((sum, w) => sum + w, 0)
  }

  const visibleRowCount = Math.ceil(height / rowHeight)
  // 解决方案1, `- 4`： 避免sticky的元素滑动时出现震动
  const startRow = Math.max(Math.floor(scrollTop / rowHeight) - 4, 0)
  // const startRow = Math.floor(scrollTop / rowHeight)
  const endRow = Math.min(startRow + visibleRowCount + 1, rowCount)

  const [startCol, endCol] = getVisibleColRange(scrollLeft, width)
  const offsetX = getOffsetX(startCol)
  const totalWidth = useMemo(() => {
    return colWidths.reduce((sum, w) => sum + w, 0)
  }, [])
  const totalHeight = rowCount * rowHeight
  const offsetY = startRow * rowHeight

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop)
      setScrollLeft(containerRef.current.scrollLeft)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, containerRef])

  return (
    <div
      className='overflow-auto'
      ref={containerRef}
      style={{ width, height }}
      onScroll={handleScroll}
    >
      <div
        style={{ width: totalWidth, height: totalHeight }}
        className='relative'
      >
        <table
          className='table-fixed border-collapse absolute'
          style={{ left: offsetX, top: offsetY }}
        >
          {/* head */}
          <thead>
            <tr>
              {Array.from({ length: endCol - startCol }, (_, colIdx) => {
                const realCol = colIdx + startCol
                return (
                  <th
                    key={realCol}
                    className='px-3 py-2 text-sm font-bold bg-gray-100
                    text-left sticky top-0 z-10 border-l border-b border-gray-100'
                    style={{
                      width: colWidths[realCol],
                      height: rowHeight,
                    }}
                  >
                    {headers?.[realCol] ?? `No col ${realCol}`}
                  </th>
                )
              })}
            </tr>
          </thead>

          {/* body */}
          <tbody>
            {Array.from({ length: endRow - startRow }, (_, rowIdx) => {
              const realRow = rowIdx + startRow
              return (
                <tr key={realRow}>
                  {Array.from({ length: endCol - startCol }, (_, colIdx) => {
                    const realCol = colIdx + startCol
                    return (
                      <td
                        key={realCol}
                        className='px-3 py-2 text-sm border-l border-t border-gray-100'
                        style={{
                          width: colWidths[realCol],
                          height: rowHeight,
                        }}
                      >
                        {cellRenderer(realRow, realCol)}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VirtualTable
