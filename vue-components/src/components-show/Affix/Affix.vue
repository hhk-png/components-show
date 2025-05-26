<template>
  <div>
    <!-- 占位元素防止页面跳动 -->
    <div
      v-if="affixed"
      :style="{ width: width ? `${width}px` : 'auto', height: `${height}px` }"
    />
    <div
      ref="elementRef"
      :style="
        affixed
          ? {
              position: 'fixed',
              top: `${props.top}px`,
              left: `${props.left}px`,
              width: width ? `${width}px` : 'auto',
              zIndex: 1,
            }
          : {}
      "
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { AffixProps } from './types'

const props = withDefaults(defineProps<AffixProps>(), {
  left: 0,
  offset: 0,
})

const elementRef = ref<HTMLElement | null>(null)
const affixed = ref(false)
const width = ref<number | null>(null)
const height = ref<number>(0)

const handleScroll = () => {
  const el = elementRef.value
  if (!el) return

  requestAnimationFrame(() => {
    const rect = el.getBoundingClientRect()
    const scrollY = window.scrollY || window.pageYOffset

    const shouldAffix = scrollY + Math.abs(rect.top) > props.offset
    if (shouldAffix !== affixed.value) {
      affixed.value = shouldAffix
      if (shouldAffix && elementRef.value) {
        width.value = elementRef.value.offsetWidth
        height.value = elementRef.value.offsetHeight
      }
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})
</script>
