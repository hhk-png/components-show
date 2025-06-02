<script setup lang="ts">
import { computed, ref } from 'vue'
import PaginationLogic from './PaginationLogic.vue'
import type { PaginationProps } from './types'

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSize: 10,
})

const currentPage = ref(1)

const currentTableData = computed(() => {
  const first = (currentPage.value - 1) * props.pageSize
  const last = first + props.pageSize
  return props.data.slice(first, last)
})

function handlePageChange(page: number) {
  currentPage.value = page
}
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th
            v-for="(name, idx) in colNames"
            :key="idx"
            class="font-bold text-left bg-[#fafafa] p-2"
          >
            {{ name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in currentTableData"
          :key="item.id"
          :class="idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'"
        >
          <td
            v-for="(val, key) in item"
            :key="key"
            class="border-b border-gray-200 p-2"
          >
            {{ val }}
          </td>
        </tr>
      </tbody>
    </table>

    <PaginationLogic
      :currentPage="currentPage"
      :totalCount="data.length"
      :pageSize="pageSize"
      @page-change="handlePageChange"
    />
  </div>
</template>
