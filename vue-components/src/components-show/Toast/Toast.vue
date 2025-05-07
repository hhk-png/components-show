<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { ToastProps } from './types'

defineOptions({
  name: 'Toast',
})

const props = withDefaults(defineProps<ToastProps>(), {
  duration: 1000
})

const visible = ref<boolean>(false)
const message = ref<string>('')
// if not expose visible, it will not be able to change visible in other components
defineExpose({
  visible,
  message,
})

onMounted(() => {
  visible.value = false
})

watch(visible, (value) => {
  // only set visible to false when it is true
  if (value) {
    setTimeout(() => {
      visible.value = false
    }, props.duration)
  }
})
</script>

<template>
  <transition name="toast">
    <div v-if="visible" class="fixed top-1/2 left-1/2 transform 
    -translate-x-1/2 -translate-y-1/2 bg-gray-800 
    text-white p-2 rounded z-[9999]">
      <div class="inline-block mx-2.5">{{ message }}</div>
    </div>
  </transition>
</template>

<style scoped>
/* toast animation */
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
}
</style>
