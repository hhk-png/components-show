<script lang="ts" setup>
import { computed, onUnmounted, ref, type CSSProperties } from 'vue'
import { throttle } from './utils'

export interface FixedRowProps {
  index: number
  style: Record<string, any>
}

export interface FixedSizeListProps {
  height: number
  width: number
  itemSize: number
  itemCount: number
}

const props = defineProps<FixedSizeListProps>()
const slots = defineSlots<{
  default: (props: FixedRowProps) => any
}>()

const scrollOffset = ref<number>(0)
const cacheRef = new Map<number, any>()
onUnmounted(() => {
  cacheRef.clear()
})

const containerStyle = computed<CSSProperties>(() => ({
  position: 'relative',
  width: `${props.width}px`,
  height: `${props.height}px`,
  overflow: 'auto'
}))

const contentStyle = computed<CSSProperties>(() => ({
  height: `${props.itemSize * props.itemCount}px`,
  width: '100%'
}))

interface Item {
  key: number
  component: (props: FixedRowProps) => any
  index: number,
  style: CSSProperties,
}

const getCurrentChildren = () => {
  const startIndex = Math.floor(scrollOffset.value / props.itemSize)
  const finalStartIndex = Math.max(0, startIndex - 2)
  const numVisible = Math.ceil(props.height / props.itemSize)
  const endIndex = Math.min(props.itemCount, startIndex + numVisible + 2)
  const items: Item[] = []

  for (let i = finalStartIndex; i < endIndex; i++) {
    if (cacheRef.has(i)) {
      items.push(cacheRef.get(i))
    } else {
      const itemStyle: CSSProperties = {
        position: 'absolute',
        height: `${props.itemSize}px`,
        width: '100%',
        top: `${props.itemSize * i}px`,
      }
      const item = {
        key: i,
        component: slots.default,
        index: i,
        style: itemStyle,
      }
      cacheRef.set(i, item)
      items.push(item)
    }
  }
  return items
}

const handleScroll = throttle((event: UIEvent) => {
  const { scrollTop } = event.target as HTMLDivElement
  scrollOffset.value = scrollTop
}, 50)

</script>

<template>
  <div :style="containerStyle" @scroll="handleScroll">
    <div :style="contentStyle">
      <keep-alive>
        <component v-for="item in getCurrentChildren()" :key=item.key :is="item.component" :index="item.index"
          :style="item.style" />
      </keep-alive>
    </div>
  </div>
</template>
