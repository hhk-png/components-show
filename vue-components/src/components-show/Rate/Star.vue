<script setup lang="ts">
defineProps<{
  color?: 'yellow' | 'gray'
}>()
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    :class="`w-full h-full ${
      color === 'yellow' ? 'text-yellow-400' : 'text-gray-300'
    } fill-current`"
  >
    <path
      d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.417 8.26L12 18.896 4.583 23.86 6 15.6 0 9.753l8.332-1.735z"
    />
  </svg>
</template>
