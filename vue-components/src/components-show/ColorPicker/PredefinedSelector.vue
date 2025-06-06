<script setup lang="ts">
import type { PredefinedSelectorEmits, PredefinedSelectorProps } from './types'

defineProps<PredefinedSelectorProps>()
const emit = defineEmits<PredefinedSelectorEmits>()

</script>

<template>
  <div :class="`flex flex-wrap w-[400px] overflow-hidden px-2 ${className}`">
    <div
      v-for="color in colors"
      :key="color"
      class="p-2 rounded bg-inherit box-border justify-center cursor-pointer"
      @click="() => emit('select', color)"
      :style="{
        border:
          color === parsedColor?.hex ? '1px solid #000' : '1px solid #fff',
      }"
    >
      <div class="w-7 h-7 rounded-full shadow" :style="{ background: color }" />
    </div>
  </div>
</template>
