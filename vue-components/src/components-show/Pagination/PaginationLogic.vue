<script setup lang="ts">
import { usePagination, DOTS } from './usePagination'
import type { PaginationLogicEmits, PaginationLogicProps } from './types'
import { shallowRef, watch } from 'vue'

const props = defineProps<PaginationLogicProps>()

const emit = defineEmits<PaginationLogicEmits>()

const paginationRange = shallowRef<number[]>([])
watch(
  () => props.currentPage,
  () => {
    paginationRange.value = usePagination({
      currentPage: props.currentPage,
      totalCount: props.totalCount,
      pageSize: props.pageSize,
      siblingCount: props.siblingCount ?? 1,
    })
  },
  { immediate: true }
)

const paginationItemBaseClass =
  'flex items-center justify-center px-3 h-8 mx-1 my-auto text-black/90 tracking-[0.01071em] text-sm leading-[1.43] min-w-9 rounded-full'

const arrowBaseClass = 'w-2 h-2 inline-block border-r border-t border-black/90'

function arrowHoverClass(current: number, target: number) {
  return current === target
    ? 'pointer-events-none cursor-default'
    : 'hover:bg-black/5 cursor-pointer'
}

function onNext() {
  emit('pageChange', props.currentPage + 1)
}
function onPrevious() {
  emit('pageChange', props.currentPage - 1)
}
</script>

<template>
  <ul class="flex mt-1 select-none" :class="className">
    <li
      :class="[paginationItemBaseClass, arrowHoverClass(currentPage, 1)]"
      @click="onPrevious"
    >
      <div :class="[arrowBaseClass, 'rotate-[-135deg]']"></div>
    </li>

    <li
      v-for="(pageNumber, idx) in paginationRange"
      :key="`${pageNumber}-${idx}`"
      :class="[
        paginationItemBaseClass,
        pageNumber === DOTS
          ? 'cursor-default'
          : 'cursor-pointer hover:bg-black/5',
        pageNumber === currentPage ? 'bg-black/10' : '',
      ]"
      @click="pageNumber !== DOTS && emit('pageChange', pageNumber)"
    >
      <span v-if="pageNumber === DOTS">&#8230;</span>
      <span v-else>{{ pageNumber }}</span>
    </li>

    <li
      :class="[
        paginationItemBaseClass,
        arrowHoverClass(
          currentPage,
          paginationRange[paginationRange.length - 1]
        ),
      ]"
      @click="onNext"
    >
      <div :class="[arrowBaseClass, 'rotate-[45deg]']"></div>
    </li>
  </ul>
</template>
