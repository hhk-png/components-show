<template>
  <div class="h-5 w-full bg-[#e0e0de] rounded-full inline-block">
    <div
      class="h-full rounded-full relative"
      :style="{ width: `${ratio}%`, backgroundColor: bgcolor }"
    >
      <span class="absolute right-2 -top-[2px] text-white font-bold"
        >{{ ratio }}%</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContinuousProgressProps } from './types'

const props = defineProps<ContinuousProgressProps>()

const ratio = props.ratio
const bgcolor = props.bgcolor ?? '#6a1b9a'
</script>
