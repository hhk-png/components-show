<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { TourEmits, TourProps } from './types'

const props = defineProps<TourProps>()
const emits = defineEmits<TourEmits>()

const current = ref(0)
const highlightRect = ref<DOMRect | null>(null)
const tooltipPos = ref<{ top: number; left: number }>({ top: 0, left: 0 })

function updateHighlight() {
  const currentStep = props.steps[current.value]
  const el = document.querySelector(currentStep.target)
  if (el) {
    const rect = el.getBoundingClientRect()
    highlightRect.value = rect

    const spacing = 10
    let top = rect.top + window.scrollY
    let left = rect.left + window.scrollY

    switch (currentStep.placement) {
      case 'bottom': {
        top += rect.height + spacing
        break
      }
      case 'top': {
        top -= spacing + 100
        break
      }
      case 'left': {
        left -= 250
        break
      }
      default: {
        left += rect.width + spacing
        break
      }
    }

    tooltipPos.value = { top, left }
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
}

onMounted(() => {
  updateHighlight()
})

watch(current, () => {
  if (current.value !== -1) {
    updateHighlight()
  }
})

const next = () => {
  if (current.value + 1 < props.steps.length) {
    current.value++
  } else {
    emits('finish')
    current.value = -1
  }
}

const skip = () => {
  emits('skip')
  current.value = -1
}
</script>

<template>
  <div v-if="current !== -1 && highlightRect">
    <!-- 遮罩层 + 洞 -->
    <svg
      class="fixed inset-0 w-screen h-screen z-40 pointer-events-none"
      style="position: fixed; top: 0; left: 0"
    >
      <defs>
        <mask id="hole-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <rect
            :x="highlightRect.left - 8"
            :y="highlightRect.top - 8"
            :width="highlightRect.width + 16"
            :height="highlightRect.height + 16"
            fill="black"
            rx="10"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="rgba(0,0,0,0.6)"
        mask="url(#hole-mask)"
      />
    </svg>

    <!-- 提示框 -->
    <div
      class="fixed z-50 p-4 w-64 bg-white rounded-xl shadow-xl border"
      :style="{ top: tooltipPos.top + 'px', left: tooltipPos.left + 'px' }"
    >
      <p class="text-sm">{{ steps[current].content }}</p>
      <div class="flex justify-end mt-3 space-x-2">
        <button @click="skip" class="text-gray-400 text-sm">跳过</button>
        <button
          @click="next"
          class="px-3 py-1 bg-blue-500 text-white text-sm rounded-md"
        >
          {{ current + 1 === props.steps.length ? '完成' : '下一步' }}
        </button>
      </div>
    </div>
  </div>
</template>
