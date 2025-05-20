<template>
  <div
    class="relative inline-block"
    ref="containerRef"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="bg-[#007BFF] text-white p-2.5 cursor-pointer rounded"
      role="button"
      aria-haspopup="true"
      :aria-expanded="isVisible"
      aria-controls="popover-content"
    >
      <slot />
    </div>

    <div
      v-if="isVisible"
      id="popover-content"
      class="absolute top-full left-1/2 mb-2.5 -translate-x-1/2 
      bg-white border border-[#ccc] shadow-lg rounded p-3 
      z-[1000] whitespace-nowrap"
      role="dialog"
      aria-modal="true"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PopoverSlots } from './types'

defineSlots<PopoverSlots>()

const isVisible = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const handleMouseEnter = () => {
  isVisible.value = true
}

const handleMouseLeave = () => {
  isVisible.value = false
}
</script>
