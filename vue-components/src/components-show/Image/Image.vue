<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { ImageProps, ImageEmits, ImageSlots } from './types'
import { getScrollContainer, isInViewport } from './lazyLoad'

const props = withDefaults(defineProps<ImageProps>(), {
  fit: 'fill',
  lazy: false,
})
const emit = defineEmits<ImageEmits>()
defineSlots<ImageSlots>()

const container = ref<HTMLDivElement | null>(null)
const isLoading = ref(true)
const hasError = ref(false)

/**
 * image load
 */
const loadImage = () => {
  isLoading.value = true
  hasError.value = false

  const image = new Image()
  image.onload = handleLoad
  image.onerror = handleError
  image.src = props.src
}

const handleLoad = (event: Event) => {
  isLoading.value = false
  hasError.value = false
  emit('load', event)
}

const handleError = (event: Event | string) => {
  isLoading.value = false
  hasError.value = true
  emit('error', typeof event === 'string' ? new ErrorEvent(event) : event)
}

/**
 * lazy load
 */
let outerScrollContainerRef: HTMLElement | Window | null = null
let outerScrollHandleRef: (() => void) | null = null
const setupLazyLoad = () => {
  let scrollContainer: HTMLElement | Window | null

  if (
    typeof props.scrollContainer === 'string' &&
    props.scrollContainer !== ''
  ) {
    scrollContainer = document.querySelector(
      props.scrollContainer
    ) as HTMLElement | null
  } else {
    scrollContainer = getScrollContainer(container.value!)
  }

  if (!scrollContainer) return

  const lazyLoadHandler = () => {
    if (isInViewport(container.value!, scrollContainer)) {
      loadImage()
      scrollContainer.removeEventListener('scroll', lazyLoadHandler)
    }
  }
  outerScrollHandleRef = lazyLoadHandler
  outerScrollContainerRef = scrollContainer

  scrollContainer.addEventListener('scroll', lazyLoadHandler)
  lazyLoadHandler()
}

onBeforeUnmount(() => {
  if (!outerScrollContainerRef || !outerScrollHandleRef) return
  outerScrollContainerRef.removeEventListener('scroll', outerScrollHandleRef)
})

// Watch for src changes
watch(() => props.src, loadImage)

// Lifecycle hooks
onMounted(() => {
  if (!props.lazy) {
    loadImage()
  } else {
    nextTick(setupLazyLoad)
  }
})
</script>

<template>
  <div ref="container" class="relative w-full h-full">
    <!-- Loading state -->
    <div
      v-if="isLoading"
      class="h-full w-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm"
    >
      <slot name="placeholder" :isLoading="isLoading">
        <span>Loading...</span>
      </slot>
    </div>

    <!-- Error state -->
    <div
      v-else-if="hasError"
      class="h-full w-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm"
    >
      <slot name="error" :error="hasError">
        <span>Failed to load image</span>
      </slot>
    </div>

    <!-- Image -->
    <img
      v-else
      class="block w-full h-full text-[0]"
      :src="src"
      :style="{ objectFit: fit }"
      :class="{
        'object-contain': fit === 'contain',
        'object-cover': fit === 'cover',
        'object-fill': fit === 'fill',
        'object-none': fit === 'none',
        'object-scale-down': fit === 'scale-down',
      }"
      alt=""
    />
  </div>
</template>
