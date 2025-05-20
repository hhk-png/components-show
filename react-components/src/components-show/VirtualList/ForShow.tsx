import type { DynamicRow } from './DynamicSizeList'
import type { FixedRowProps } from './FixedSizeList'
import React from 'react'
import { DynamicSizeList } from './DynamicSizeList'
import { FixedSizeList } from './FixedSizeList'

const heightCache: Record<number, number> = {}
const Row: React.FC<DynamicRow> = ({ index }) => {
  if (heightCache[index] === undefined) {
    heightCache[index] = 20 + Math.floor(Math.random() * 50)
  }

  const style: React.CSSProperties = {
    height: heightCache[index],
  }
  const backgroundColorClass = index % 2 === 0 ? 'bg-blue-100' : 'bg-white'

  return (
    <div
      className={`flex items-center justify-center ${backgroundColorClass}`}
      style={style}
    >
      Row
      {' '}
      {index}
    </div>
  )
}

const FixedRow: React.FC<FixedRowProps> = ({ index, style }) => {
  const backgroundColorClass = index % 2 === 0 ? 'bg-blue-100' : 'bg-white'

  return (
    <div
      className={`w-full ${backgroundColorClass} flex items-center justify-center`}
      style={{ ...style }}
    >
      Row
      {' '}
      {index}
    </div>
  )
}

const VirtualList: React.FC = () => {
  return (
    <div className="flex w-full justify-around">
      <DynamicSizeList height={300} width={300} itemCount={1000000}>
        {Row}
      </DynamicSizeList>
      <FixedSizeList height={300} width={300} itemSize={50} itemCount={1000}>
        {FixedRow}
      </FixedSizeList>
    </div>
  )
}

export default VirtualList
