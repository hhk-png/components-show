<script setup lang="ts">
import VirtualTable from './VirtualTable.vue'

const colWidths = Array.from({ length: 1000 }, () => 100)
const headers = Array.from({ length: 1000 }, (_, i) => `标题 ${i + 1}`)

const cellRenderer = (row: number, col: number) => {
  return `${row},${col}`
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">虚拟表格组件示例</h1>
    <VirtualTable
      :rowCount="1000"
      :colCount="1000"
      :rowHeight="30"
      :colWidths="colWidths"
      :width="500"
      :height="400"
      :headers="headers"
      :cellRenderer="cellRenderer"
    />
  </div>
</template>
