<script setup lang="ts">
defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <div
    @click="$emit('click', $event)"
    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-800"
  >
    <slot></slot>
  </div>
</template>
