<script lang="ts" setup>
import { computed, ref, type CSSProperties } from 'vue'
import ListItem from './ListItem.vue'
import { throttle } from './utils'

interface MeasuredData {
  size: number
  offset: number
}

export interface DynamicRow {
  index: number
}

export interface DynamicSizeListProps {
  height: number
  width: number
  itemCount: number
  itemEstimatedSize?: number
}
const props = defineProps<DynamicSizeListProps>()
const slots = defineSlots<{
  default: (props: DynamicRow) => any
}>()

const measuredDataMap: Record<number, MeasuredData> = {}
let lastMeasuredItemIndex: number = -1

const estimateHeight = (
  defaultItemSize: number = 50,
  itemCount: number
): number => {
  let measuredHeight: number = 0
  if (lastMeasuredItemIndex >= 0) {
    const lastItem = measuredDataMap[lastMeasuredItemIndex]
    measuredHeight = lastItem.offset + lastItem.size
  }

  const unMeasuredItemsCount = itemCount - lastMeasuredItemIndex - 1
  return measuredHeight + unMeasuredItemsCount * defaultItemSize
}

const getItemLayoutdata = (
  props: DynamicSizeListProps,
  index: number
): MeasuredData => {
  const { itemEstimatedSize = 50 } = props
  if (index > lastMeasuredItemIndex) {
    let offset = 0
    if (lastMeasuredItemIndex >= 0) {
      const lastItem = measuredDataMap[lastMeasuredItemIndex]
      offset += lastItem.offset + lastItem.size
    }

    for (let i = lastMeasuredItemIndex + 1; i <= index; i++) {
      measuredDataMap[i] = { size: itemEstimatedSize, offset }
      offset += itemEstimatedSize
    }

    lastMeasuredItemIndex = index
  }

  return measuredDataMap[index]
}


const binarySearch = (
  props: DynamicSizeListProps,
  low: number,
  high: number,
  target: number
) => {
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2)
    const currentOffset = getItemLayoutdata(props, mid).offset

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
  target: number
) => {
  const { itemCount } = props
  let exp = 1

  while (index < itemCount && getItemLayoutdata(props, index).offset < target) {
    index += exp
    exp *= 2
  }

  return binarySearch(
    props,
    Math.floor(index / 2),
    Math.min(index, itemCount - 1),
    target
  )
}

const getStartIndex = (props: DynamicSizeListProps, scrollOffset: number) => {
  if (scrollOffset === 0) {
    return 0
  }

  if (measuredDataMap[lastMeasuredItemIndex].offset >= scrollOffset) {
    return binarySearch(props, 0, lastMeasuredItemIndex, scrollOffset)
  }
  return expSearch(props, Math.max(0, lastMeasuredItemIndex), scrollOffset)
}

const getEndIndex = (props: DynamicSizeListProps, startIndex: number): number => {
  const { height, itemCount } = props
  const startItem = getItemLayoutdata(props, startIndex)
  const maxOffset = startItem.offset + height
  let offset = startItem.offset + startItem.size
  let endIndex = startIndex

  while (offset <= maxOffset && endIndex < itemCount - 1) {
    endIndex++
    const currentItemLayout = getItemLayoutdata(props, endIndex)
    offset += currentItemLayout.size
  }
  return endIndex
}

const getRangeToRender = (
  props: DynamicSizeListProps,
  scrollOffset: number
): [number, number] => {
  const { itemCount } = props
  const startIndex = getStartIndex(props, scrollOffset)
  const endIndex = getEndIndex(props, startIndex)
  return [Math.max(0, startIndex - 2), Math.min(itemCount - 1, endIndex + 2)]
}

const scrollOffset = ref<number>(0)
const forceUpdate = ref<boolean>(false)
const containerStyle = computed<CSSProperties>(() => ({
  position: 'relative',
  width: `${props.width}px`,
  height: `${props.height}px`,
  overflow: 'auto',
  willChange: 'transform',
}))
const contentStyle = ref({
  height: `${estimateHeight(props.itemEstimatedSize, props.itemCount)}px`,
  width: '100%'
})


const sizeChangeHandle = (index: number, domNode: HTMLElement) => {
  const height = domNode.offsetHeight
  if (measuredDataMap[index]?.size !== height) {
    measuredDataMap[index].size = height

    let offset = 0
    for (let i = 0; i <= lastMeasuredItemIndex; i++) {
      const layoutData = measuredDataMap[i]
      layoutData.offset = offset
      offset += layoutData.size
    }
    // recaculate content height
    contentStyle.value.height = `${estimateHeight(props.itemEstimatedSize, props.itemCount)}px`
    forceUpdate.value = !forceUpdate.value
  }
}

interface Item {
  key: number
  component: (props: DynamicRow) => any
  index: number
  style: CSSProperties,
}

const getCurrentChildren = () => {
  const [startIndex, endIndex] = getRangeToRender(props, scrollOffset.value)
  const items: Item[] = []
  for (let i = startIndex; i <= endIndex; i++) {
    const item = getItemLayoutdata(props, i)
    const itemStyle: CSSProperties = {
      position: 'absolute',
      height: `${item.size}px`,
      width: '100%',
      top: `${item.offset}px`,
    }
    items.push({
      key: i,
      component: slots.default,
      index: i,
      style: itemStyle,
    })
  }
  return items
}

const scrollHandle = throttle((e: Event) => {
  const { scrollTop } = e.target as HTMLElement
  scrollOffset.value = scrollTop
}, 100)

</script>

<template>
  <div :style="containerStyle" @scroll="scrollHandle">
    <div :style="contentStyle">
      <ListItem v-for="item in getCurrentChildren()" :key="item.key" :index="item.index" :style="item.style"
        @size-change="sizeChangeHandle">
        <template #default="{ index }">
          <component :is="item.component" :index="index" />
        </template>
      </ListItem>
    </div>
    <div style="display: none;">{{ forceUpdate }}</div>
  </div>
</template>
