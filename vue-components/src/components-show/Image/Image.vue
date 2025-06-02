<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { ImageProps, ImageEmits, ImageSlots } from './types'
import { getScrollContainer, isHTMLElement, isInViewport } from './lazyLoad';

const props = withDefaults(defineProps<ImageProps>(), {
  fit: 'fill',
  lazy: false
})
const emit = defineEmits<ImageEmits>()
defineSlots<ImageSlots>()

const container = ref<HTMLDivElement | null>(null)
const isLoading = ref(true)
const hasError = ref(false)

let scrollContainer: HTMLElement | Window | null = null
let scrollListener: (() => void) | null = null

const loadImage = () => {
  if (!props.src) {
    handleError(new Event('Empty src'))
    return
  }

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
  emit('error', typeof event === 'string' ? new Event(event) : event)
}

const checkInViewport = () => {
  if (!container.value || !scrollContainer) return false
  return isInViewport(container.value, scrollContainer)
}

const setupLazyLoad = () => {
  if (!props.lazy || !container.value) return
  
  // Resolve scroll container
  if (typeof props.scrollContainer === 'string') {
    scrollContainer = document.querySelector(props.scrollContainer) as HTMLElement | null
  } else if (isHTMLElement(props.scrollContainer)) {
    scrollContainer = props.scrollContainer
  } else {
    scrollContainer = getScrollContainer(container.value)
  }

  if (!scrollContainer) return

  const lazyLoadHandler = () => {
    if (checkInViewport()) {
      loadImage()
      removeLazyLoadListener()
    }
  }

  scrollListener = lazyLoadHandler
  scrollContainer.addEventListener('scroll', scrollListener)
  lazyLoadHandler() // Initial check
}

const removeLazyLoadListener = () => {
  if (scrollContainer && scrollListener) {
    scrollContainer.removeEventListener('scroll', scrollListener)
  }
  scrollContainer = null
  scrollListener = null
}

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

onBeforeUnmount(() => {
  if (props.lazy) {
    removeLazyLoadListener()
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
        'object-scale-down': fit === 'scale-down'
      }"
      alt=""
    />
  </div>
</template>