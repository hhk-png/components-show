<template>
  <div class="inline-block relative">
    <span
      class="absolute left-1/2 -translate-x-1/2 bottom-6 text-[#6a1b9a] font-bold"
    >
      {{ currentStep }}/{{ step }}
    </span>
    <div
      v-for="s in step"
      :key="s"
      :class="[
        'inline-block h-5 w-5 rounded mr-[1px]',
        s <= currentStep ? 'bg-[#6a1b9a]' : 'bg-[#e0e0de]',
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import type { DisContinuousProps } from './types'

defineProps<DisContinuousProps>()
</script>
