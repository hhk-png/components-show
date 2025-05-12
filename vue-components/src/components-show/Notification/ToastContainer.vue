<template>
  <div class="fixed top-5 right-5 z-50 flex flex-col gap-2 w-80">
    <TransitionGroup name="toast" tag="div">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :class="['text-white p-3 rounded shadow mb-2', getBgClass(toast.type)]"
      >
        {{ toast.message }}
        <button class="ml-2 float-right" @click="remove(toast.id)">x</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { toastStore } from './toastStore'

const remove = (id: number) => toastStore.remove(id)

const getBgClass = (type: string) =>
  ({
    success: 'bg-blue-500',
    warning: 'bg-yellow-500',
    info: 'bg-green-500',
    error: 'bg-red-500',
  })[type] || 'bg-gray-500'
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>