<script setup lang="ts">
import { useToast } from './useToast'

const notification = useToast()

const handleClick = () => {
  notification.success('This is a success message')
}
</script>

<template>
  <div
    @click="handleClick"
    class="w-30 h-20 bg-blue-500 rounded text-white flex items-center justify-center"
  >
    click
  </div>
</template>

<style scoped></style>
