<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import type { VirtualTableProps } from './types'

const props = defineProps<VirtualTableProps>()
const containerRef = ref<HTMLDivElement | null>(null)

const scrollTop = ref(0)
const scrollLeft = ref(0)

const totalWidth = computed(() =>
  props.colWidths.reduce((sum, w) => sum + w, 0)
)
const totalHeight = computed(() => props.rowCount * props.rowHeight)

const visibleRowCount = computed(() =>
  Math.ceil(props.height / props.rowHeight)
)

const startRow = computed(() =>
  Math.max(Math.floor(scrollTop.value / props.rowHeight) - 4, 0)
)
const endRow = computed(() =>
  Math.min(startRow.value + visibleRowCount.value + 1, props.rowCount)
)

const visibleRows = computed(() =>
  Array.from(
    { length: endRow.value - startRow.value },
    (_, i) => i + startRow.value
  )
)

const getVisibleColRange = (scrollLeft: number, viewWidth: number) => {
  let start = 0
  let acc = 0
  while (
    start < props.colWidths.length &&
    acc + props.colWidths[start] < scrollLeft
  ) {
    acc += props.colWidths[start]
    start++
  }

  let end = start
  let width = 0
  while (end < props.colWidths.length && width < viewWidth) {
    width += props.colWidths[end]
    end++
  }

  return [start, Math.min(end + 2, props.colCount)]
}

const startCol = ref(0)
const endCol = ref(0)

watchEffect(() => {
  const [s, e] = getVisibleColRange(scrollLeft.value, props.width)
  startCol.value = s
  endCol.value = e
})

const visibleCols = computed(() =>
  Array.from(
    { length: endCol.value - startCol.value },
    (_, i) => startCol.value + i
  )
)

const offsetX = computed(() =>
  props.colWidths.slice(0, startCol.value).reduce((sum, w) => sum + w, 0)
)
const offsetY = computed(() => startRow.value * props.rowHeight)

const onScroll = () => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop
    scrollLeft.value = containerRef.value.scrollLeft
  }
}

onMounted(() => {
  containerRef.value?.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  containerRef.value?.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div
    class="overflow-auto"
    ref="containerRef"
    :style="{ width: `${width}px`, height: `${height}px` }"
    @scroll="onScroll"
  >
    <div
      class="relative"
      :style="{ width: `${totalWidth}px`, height: `${totalHeight}px` }"
    >
      <table
        class="table-fixed border-collapse absolute"
        :style="{ left: `${offsetX}px`, top: `${offsetY}px` }"
      >
        <thead>
          <tr>
            <th
              v-for="colIdx in visibleCols"
              :key="colIdx"
              class="px-3 py-2 text-sm font-bold bg-gray-100 text-left sticky top-0 z-10 border-l border-b border-gray-100"
              :style="{
                width: `${colWidths[colIdx]}px`,
                height: `${rowHeight}px`,
              }"
            >
              {{ headers?.[colIdx] ?? `No col ${colIdx}` }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rowIdx in visibleRows" :key="rowIdx">
            <td
              v-for="colIdx in visibleCols"
              :key="`${rowIdx}-${colIdx}`"
              class="px-3 py-2 text-sm border-l border-t border-gray-100"
              :style="{
                width: `${colWidths[colIdx]}px`,
                height: `${rowHeight}px`,
              }"
            >
              {{ cellRenderer(rowIdx, colIdx) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
