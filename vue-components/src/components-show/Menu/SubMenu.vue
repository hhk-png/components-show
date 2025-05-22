<script setup lang="ts">
import { ref } from 'vue'
import type { SubMenuProps } from './types'

defineProps<SubMenuProps>()

const isOpen = ref<boolean>(false)
</script>

<template>
  <div className="border-t border-gray-200">
    <div
      className="flex justify-between items-center 
        px-4 py-2 cursor-pointer hover:bg-gray-100 
        text-sm font-medium text-gray-800"
      @click="isOpen = !isOpen"
    >
      {{ title }}
      <svg
        :class="`w-4 h-4 transform transition-transform duration-200 ${
          isOpen ? 'rotate-90' : ''
        }`"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="{2}"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
    <div v-if="isOpen" className="pl-4">
      <slot></slot>
    </div>
  </div>
</template>
