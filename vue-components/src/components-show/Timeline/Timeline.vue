<script setup lang="ts">
import type { TimelineItem as TimelineItemType } from './types'
import TimelineItem from './TimelineItem.vue'

const props = defineProps<{
  data: TimelineItemType[]
}>()
</script>

<template>
  <div
    v-if="props.data.length"
    class="flex flex-col relative my-10 before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-full before:bg-[#e17b77]"
  >
    <TimelineItem
      v-for="(item, idx) in props.data"
      :key="idx"
      :data="item"
      :index="idx"
    />
  </div>
</template>
