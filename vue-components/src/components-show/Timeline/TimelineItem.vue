<script setup lang="ts">
import type { TimelineItem as TimelineItemType } from './types'

const props = defineProps<{
  data: TimelineItemType
  index: number
}>()

const isEven = props.index % 2 === 0
</script>

<template>
  <div
    :class="[
      'flex pr-8 relative my-2 w-1/2',
      isEven ? 'self-end justify-start pl-8 pr-0' : 'justify-end',
    ]"
  >
    <div
      :class="[
        'relative flex flex-col max-w-[70%] w-[400px] bg-white p-2 rounded shadow',
        isEven ? 'items-start text-left' : 'items-end text-right',
      ]"
    >
      <!-- category -->
      <span
        class="absolute top-2 px-2 py-2 text-xs font-bold 
        uppercase tracking-wider text-white"
        :style="{ background: props.data.category.color }"
        :class="isEven ? 'right-2' : 'left-2'"
      >
        {{ props.data.category.tag }}
      </span>

      <!-- time -->
      <time class="text-xs text-gray-500 font-bold mt-2">{{
        props.data.date
      }}</time>

      <!-- text -->
      <p class="text-base leading-6 my-4 max-w-[250px]">
        {{ props.data.text }}
      </p>

      <!-- link -->
      <a
        v-if="props.data.link"
        :href="props.data.link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm font-bold after:content-['_►'] after:text-xs"
      >
        {{ props.data.link.text }}
      </a>

      <!-- circle -->
      <span
        class="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full 
        border-3 border-[#e17b77] bg-white z-[100]"
        :class="isEven ? '-left-11' : '-right-11'"
      />
    </div>
  </div>
</template>
