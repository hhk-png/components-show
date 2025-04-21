import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

interface MeasuredData {
  size: number
  offset: number
}

type MeasuredDataMap = Record<number, MeasuredData>

export interface DynamicRow {
  index: number
}

export interface DynamicSizeListProps {
  height: number
  width: number
  itemCount: number
  itemEstimatedSize?: number
  children: React.ComponentType<DynamicRow>
}

const estimateHeight = (
  defaultItemSize: number = 50,
  itemCount: number,
  lastMeasuredItemIndex: React.RefObject<number>,
  measuredDataMap: React.RefObject<MeasuredDataMap>
): number => {
  let measuredHeight: number = 0
  if (lastMeasuredItemIndex.current >= 0) {
    const lastMeasuredItem = measuredDataMap.current[lastMeasuredItemIndex.current]
    measuredHeight = lastMeasuredItem.offset + lastMeasuredItem.size
  }
  const unMeasutedItemsCount = itemCount - lastMeasuredItemIndex.current - 1
  return measuredHeight + unMeasutedItemsCount * defaultItemSize
}

const getItemLayoutdata = (
  props: DynamicSizeListProps,
  index: number,
  lastMeasuredItemIndex: React.RefObject<number>,
  measuredDataMap: React.RefObject<MeasuredDataMap>
): MeasuredData => {
  const { itemEstimatedSize = 50 } = props
  if (index > lastMeasuredItemIndex.current) {
    let offset = 0
    if (lastMeasuredItemIndex.current >= 0) {
      const lastItem = measuredDataMap.current[lastMeasuredItemIndex.current]
      offset += lastItem.offset + lastItem.size
    }

    for (let i = lastMeasuredItemIndex.current + 1; i <= index; i++) {
      measuredDataMap.current[i] = { size: itemEstimatedSize, offset }
      offset += itemEstimatedSize
    }

    lastMeasuredItemIndex.current = index
  }
  return measuredDataMap.current[index]
}

const binarySearch = (
  props: DynamicSizeListProps,
  low: number,
  high: number,
  target: number,
  lastMeasuredItemIndex: React.RefObject<number>,
  measuredDataMap: React.RefObject<MeasuredDataMap>
) => {
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2)
    const currentOffset = getItemLayoutdata(props, mid, lastMeasuredItemIndex, measuredDataMap).offset

    if (currentOffset === target) {
      return mid
    } else if (currentOffset < target) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  return Math.max(low - 1)
}

const expSearch = (
  props: DynamicSizeListProps,
  index: number,
  target: number,
  lastMeasuredItemIndex: React.RefObject<number>,
  measuredDataMap: React.RefObject<MeasuredDataMap>
) => {
  const { itemCount } = props
  let exp = 1

  while (index < itemCount && getItemLayoutdata(props, index, lastMeasuredItemIndex, measuredDataMap).offset < target) {
    index += exp
    exp *= 2
  }

  return binarySearch(
    props,
    Math.floor(index / 2),
    Math.min(index, itemCount - 1),
    target,
    lastMeasuredItemIndex,
    measuredDataMap
  )
}

const getStartIndex = (
  props: DynamicSizeListProps, 
  scrollOffset: number,
  lastMeasuredItemIndex: React.RefObject<number>,
  measuredDataMap: React.RefObject<MeasuredDataMap>
): number => {
  if (scrollOffset === 0) {
    return 0
  }

  if (measuredDataMap.current[lastMeasuredItemIndex.current].offset >= scrollOffset) {
    return binarySearch(props, 0, lastMeasuredItemIndex.current, scrollOffset, lastMeasuredItemIndex, measuredDataMap)
  }
  return expSearch(props, Math.max(0, lastMeasuredItemIndex.current), scrollOffset, lastMeasuredItemIndex, measuredDataMap)
}

const getEndIndex = (
  props: DynamicSizeListProps,
  startIndex: number,
  lastMeasuredItemIndex: React.RefObject<number>,
  measuredDataMap: React.RefObject<MeasuredDataMap>
): number => {
  const { height, itemCount } = props
  const startItem = getItemLayoutdata(props, startIndex, lastMeasuredItemIndex, measuredDataMap)
  const maxOffset = startItem.offset + height
  let offset = startItem.offset + startItem.size
  let endIndex = startIndex

  while (offset <= maxOffset && endIndex < itemCount - 1) {
    endIndex++
    const currentItemLayout = getItemLayoutdata(props, endIndex, lastMeasuredItemIndex, measuredDataMap)
    offset += currentItemLayout.size
  }

  return endIndex
}

const getRangeToRender = (
  props: DynamicSizeListProps,
  scrollOffset: number,
  lastMeasuredItemIndex: React.RefObject<number>,
  measuredDataMap: React.RefObject<MeasuredDataMap>
): [number, number] => {
  const { itemCount } = props
  const startIndex = getStartIndex(props, scrollOffset, lastMeasuredItemIndex, measuredDataMap)
  const endIndex = getEndIndex(props, startIndex, lastMeasuredItemIndex, measuredDataMap)
  return [Math.max(0, startIndex - 2), Math.min(itemCount - 1, endIndex + 2)]
}

interface ListItemProps {
  index: number
  style: React.CSSProperties
  ChildComp: React.ComponentType<{ index: number }>
  onSizeChange: (index: number, domNode: HTMLElement) => void
}

const ListItem: React.FC<ListItemProps> = React.memo(
  ({ index, style, ChildComp, onSizeChange }) => {
    const domRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!domRef.current) return
      const domNode = domRef.current.firstChild as HTMLElement
      const resizeObserver = new ResizeObserver(() => {
        onSizeChange(index, domNode)
      })
      resizeObserver.observe(domNode)

      return () => {
        resizeObserver.unobserve(domNode)
      }
    }, [index, onSizeChange])

    return (
      <div style={style} ref={domRef}>
        <ChildComp key={index} index={index} />
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.index === nextProps.index &&
    prevProps.style.top === nextProps.style.top &&
    prevProps.style.height === nextProps.style.height
)

export const DynamicSizeList: React.FC<DynamicSizeListProps> = (props) => {
  const {
    height,
    width,
    itemCount,
    itemEstimatedSize = 50,
    children: Child,
  } = props
  const [scrollOffset, setScrollOffset] = useState(0)
  const [, setState] = useState({})

  const measuredDataMap = useRef<MeasuredDataMap>({})
  const lastMeasuredItemIndex = useRef<number>(-1)

  const containerStyle: CSSProperties = {
    position: 'relative',
    width,
    height,
    overflow: 'auto',
    willChange: 'transform',
  }

  const contentStyle: CSSProperties = {
    height: estimateHeight(
      itemEstimatedSize, 
      itemCount, 
      lastMeasuredItemIndex, 
      measuredDataMap
    ),
    width: '100%',
  }

  const sizeChangeHandle = (index: number, domNode: HTMLElement) => {
    const height = domNode.offsetHeight
    if (measuredDataMap.current[index]?.size !== height) {
      measuredDataMap.current[index].size = height

      let offset = measuredDataMap.current[index].offset + height
      for (let i = index + 1; i <= lastMeasuredItemIndex.current; i++) {
        const layoutData = measuredDataMap.current[i]
        layoutData.offset = offset
        offset += layoutData.size
      }
      setState({})
    }
  }

  const getCurrentChildren = () => {
    const [startIndex, endIndex] = getRangeToRender(props, scrollOffset, lastMeasuredItemIndex, measuredDataMap)
    const items: ReactNode[] = []
    for (let i = startIndex; i <= endIndex; i++) {
      const item = getItemLayoutdata(props, i, lastMeasuredItemIndex, measuredDataMap)
      const itemStyle: CSSProperties = {
        position: 'absolute',
        height: item.size,
        width: '100%',
        top: item.offset,
      }
      items.push(
        <ListItem
          key={i}
          index={i}
          style={itemStyle}
          ChildComp={Child}
          onSizeChange={sizeChangeHandle}
        />
      )
    }
    return items
  }

  const scrollHandle = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget
    setScrollOffset(scrollTop)
  }

  return (
    <div style={containerStyle} onScroll={scrollHandle}>
      <div style={contentStyle}>{getCurrentChildren()}</div>
    </div>
  )
}
