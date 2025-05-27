<script setup lang="ts">
import { ref } from 'vue'
import TourWithHoleMask from './Tour.vue'
import type { TourStep } from './types'

const steps: TourStep[] = [
  { target: '#nav', content: '这是导航栏', placement: 'bottom' },
  { target: '#search', content: '在这里搜索内容', placement: 'right' },
  { target: '#profile', content: '这里是你的头像', placement: 'bottom' },
]

const showTour = ref(true)

const onFinish = () => {
  alert('引导完成')
  showTour.value = false
}

const onSkip = () => {
  alert('已跳过')
  showTour.value = false
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full gap-4">
    <button
      class="h-10 w-30 bg-blue-500 text-white rounded cursor-pointer"
      @click="showTour = true"
    >
      Show Tour
    </button>

    <nav id="nav">导航</nav>

    <input
      id="search"
      placeholder="搜索"
      class="outline-none border border-gray-300 rounded px-2 py-1 w-64"
    />

    <div id="profile">头像</div>

    <TourWithHoleMask
      v-if="showTour"
      :steps="steps"
      :onFinish="onFinish"
      :onSkip="onSkip"
    />
  </div>
</template>
