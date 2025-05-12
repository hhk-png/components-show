<script setup lang="ts">
import { ToastContainer } from './components-show/Notification'
import { useToast } from './components-show/Notification'

const notification = useToast()

const handleClick = () => {
  notification.success('This is a success message')
}
</script>

<template>
  <ToastContainer></ToastContainer>
  <div
    @click="handleClick"
    class="w-30 h-20 bg-blue-500 rounded text-white flex items-center justify-center"
  >
    click
  </div>
</template>

<style scoped></style>
