<template>
  <div class="w-full px-4 py-6">
    <!-- Label & Value -->
    <div class="mb-2 flex justify-between text-sm text-gray-700">
      <label>{{ label }}</label>
      <span>{{ modelValue }}</span>
    </div>

    <!-- Slider Track -->
    <div
      ref="trackRef"
      class="relative h-2 rounded-full bg-gray-300 cursor-pointer select-none"
      @mousedown.stop="onTrackClick"
    >
      <!-- Filled Track -->
      <div
        @dragstart.prevent
        class="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
        :style="{ width: fillWidth + 1 + '%' }"
      />

      <!-- Thumb -->
      <div
        @dragstart.prevent
        class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow"
        :style="{ left: fillWidth + '%' }"
        @mousedown.stop="startDragging"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, defineProps, defineEmits } from 'vue'
import type { SliderProps } from './types'

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
})
const emit = defineEmits(['update:modelValue'])

const trackRef = ref<HTMLDivElement | null>(null)

// Slider constraints
const min = props.min
const max = props.max
const step = props.step

// Calculated fill percentage
const fillWidth = computed(() => {
  const percent = ((props.modelValue - min) / (max - min)) * 100
  return Math.min(Math.max(percent, 0), 100)
})

// Cached track dimensions
const trackStart = ref(0)
const trackWidth = ref(0)

const updateFromClientX = (clientX: number) => {
  const offset = clientX - trackStart.value
  const ratio = offset / trackWidth.value
  const clampedRatio = Math.min(Math.max(ratio, 0), 1)
  const raw = min + clampedRatio * (max - min)
  const snapped = Math.round(raw / step) * step
  const finalValue = Math.min(max, Math.max(min, snapped))
  emit('update:modelValue', finalValue)
}

// mouse event
const startDragging = (e: MouseEvent) => {
  const track = trackRef.value
  if (!track) return

  const rect = track.getBoundingClientRect()
  trackStart.value = rect.left
  trackWidth.value = rect.width

  updateFromClientX(e.clientX)

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', stopDragging)
}

const onMouseMove = (e: MouseEvent) => {
  updateFromClientX(e.clientX)
}

const stopDragging = () => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', stopDragging)
}

// click Track
const onTrackClick = (e: MouseEvent) => {
  const track = trackRef.value
  if (!track) return

  const rect = track.getBoundingClientRect()
  trackStart.value = rect.left
  trackWidth.value = rect.width

  updateFromClientX(e.clientX)
}

onBeforeUnmount(() => {
  stopDragging()
})
</script>
