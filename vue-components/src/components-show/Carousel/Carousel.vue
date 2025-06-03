<template>
  <div class="relative w-full overflow-hidden rounded-2xl shadow-lg">
    <!-- Slides wrapper -->
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :class="{ 'transition-none': !isAnimating }"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      @transitionend="handleTransitionEnd"
    >
      <div
        v-for="(img, index) in clonedImages"
        :key="index"
        class="min-w-full h-64 md:h-96 flex-shrink-0"
      >
        <img :src="img" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Left Arrow -->
    <button
      @click="prev"
      class="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
    >
      <svg
        class="w-5 h-5 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <!-- Right Arrow -->
    <button
      @click="next"
      class="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
    >
      <svg
        class="w-5 h-5 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>

    <!-- Dots -->
    <div class="absolute bottom-4 w-full flex justify-center gap-2">
      <button
        v-for="(_, i) in images"
        :key="i"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="currentIndex === i + 1 ? 'bg-white' : 'bg-white/50'"
        @click="goTo(i + 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import type { CarouselProps } from './types'

const props = defineProps<CarouselProps>()

// 第一个为克隆最后一张图
const currentIndex = ref(1)
const isAnimating = ref(true)
const isLocked = ref(false)

const images = props.images
const total = images.length
const intervalTime = props.interval ?? 3000

const timer = ref<ReturnType<typeof setTimeout> | null>(null)

const resetTimer = () => {
  if (timer.value) clearTimeout(timer.value)
}

const clonedImages = computed(() => [
  images[images.length - 1],
  ...images,
  images[0],
])

const goTo = (index: number) => {
  if (isLocked.value) return
  isLocked.value = true
  isAnimating.value = true
  currentIndex.value = index
}

const next = () => {
  goTo(currentIndex.value + 1)
}

const prev = () => {
  goTo(currentIndex.value - 1)
}

const handleTransitionEnd = () => {
  isLocked.value = false
  // 无缝跳转（去掉动画）
  if (currentIndex.value === 0) {
    isAnimating.value = false
    currentIndex.value = total
  }
  if (currentIndex.value === total + 1) {
    isAnimating.value = false
    currentIndex.value = 1
  }
}

const startAuto = () => {
  resetTimer()
  timer.value = setTimeout(() => {
    next()
  }, intervalTime)
}

onMounted(() => {
  startAuto()
})

onBeforeUnmount(() => {
  resetTimer()
})

watch(currentIndex, () => {
  startAuto()
})
</script>
