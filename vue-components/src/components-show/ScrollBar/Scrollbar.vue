<template>
  <div
    class="relative overflow-hidden"
    :style="containerStyle"
    @mouseenter="showScrollbars = true"
    @mouseleave="showScrollbars = false"
    ref="containerRef"
  >
    <!-- 内容容器 -->
    <div
      class="absolute w-full"
      :style="contentWrapperStyle"
      ref="contentWrapperRef"
      @mousedown="startDrag"
      @wheel.passive="handleWheel"
    >
      <slot></slot>
    </div>

    <!-- 垂直滚动条 -->
    <div
      v-if="showVerticalScrollbar"
      class="absolute top-0 right-0 bottom-0 w-2 bg-gray-200 bg-opacity-30 rounded-full transition-opacity duration-200"
      :style="{ opacity: isDraggingVertical || showScrollbars ? 1 : 0 }"
      ref="verticalTrackRef"
    >
      <div
        class="absolute top-0 left-0 right-0 bg-gray-500 rounded-full hover:bg-gray-600 transition-colors duration-200"
        :style="verticalThumbStyle"
        @mousedown="startVerticalDrag"
      ></div>
    </div>

    <!-- 水平滚动条 -->
    <div
      v-if="showHorizontalScrollbar"
      class="absolute bottom-0 left-0 right-0 h-2 bg-gray-200 bg-opacity-30 rounded-full transition-opacity duration-200"
      :style="{ opacity: isDraggingHorizontal || showScrollbars ? 1 : 0 }"
      ref="horizontalTrackRef"
    >
      <div
        class="absolute top-0 left-0 bottom-0 bg-gray-500 rounded-full hover:bg-gray-600 transition-colors duration-200"
        :style="horizontalThumbStyle"
        @mousedown="startHorizontalDrag"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
  type CSSProperties,
  useTemplateRef,
} from 'vue'
import type { ScrollbarProps } from './types'

const props = withDefaults(defineProps<ScrollbarProps>(), {
  height: '100%',
  width: '100%',
  thumbSize: 8,
  scrollSpeed: 1,
})

const containerRef = useTemplateRef<HTMLElement>('containerRef')
const contentWrapperRef = useTemplateRef<HTMLElement | null>(
  'contentWrapperRef'
)
const verticalTrackRef = useTemplateRef<HTMLElement | null>('verticalTrackRef')
const horizontalTrackRef = useTemplateRef<HTMLElement | null>(
  'horizontalTrackRef'
)

const showScrollbars = ref(false)
const isDragging = ref(false)
const isDraggingVertical = ref(false)
const isDraggingHorizontal = ref(false)
const startY = ref(0)
const startX = ref(0)
const startScrollTop = ref(0)
const startScrollLeft = ref(0)
const scrollTop = ref(0)
const scrollLeft = ref(0)
const contentHeight = ref(0)
const contentWidth = ref(0)
const containerHeight = ref(0)
const containerWidth = ref(0)
const startDragX = ref(0)
const startDragY = ref(0)
const startDragScrollLeft = ref(0)
const startDragScrollTop = ref(0)

// 容器样式
const containerStyle = computed<CSSProperties>(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
}))

// 内容容器样式
const contentWrapperStyle = computed(() => ({
  transform: `translate(${-scrollLeft.value}px, ${-scrollTop.value}px)`,
  willChange: 'transform',
}))

// 是否显示垂直滚动条
const showVerticalScrollbar = computed(() => {
  return contentHeight.value > containerHeight.value
})

// 是否显示水平滚动条
const showHorizontalScrollbar = computed(() => {
  return contentWidth.value > containerWidth.value
})

// 垂直滑块样式
const verticalThumbStyle = computed(() => {
  const thumbHeight = Math.max(
    (containerHeight.value / contentHeight.value) * containerHeight.value,
    props.thumbSize * 2
  )
  const scrollRatio =
    scrollTop.value / (contentHeight.value - containerHeight.value)
  const top = scrollRatio * (containerHeight.value - thumbHeight)

  return {
    height: `${thumbHeight}px`,
    top: `${top}px`,
    width: `${props.thumbSize}px`,
  }
})

// 水平滑块样式
const horizontalThumbStyle = computed(() => {
  const thumbWidth = Math.max(
    (containerWidth.value / contentWidth.value) * containerWidth.value,
    props.thumbSize * 2
  )
  const scrollRatio =
    scrollLeft.value / (contentWidth.value - containerWidth.value)
  const left = scrollRatio * (containerWidth.value - thumbWidth)

  return {
    width: `${thumbWidth}px`,
    left: `${left}px`,
    height: `${props.thumbSize}px`,
  }
})

// 初始化尺寸
const initSizes = () => {
  if (!contentWrapperRef.value || !containerRef.value) return

  const contentEl = contentWrapperRef.value.children[0] as HTMLElement
  if (!contentEl) return

  contentHeight.value = contentEl.offsetHeight
  contentWidth.value = contentEl.offsetWidth
  containerHeight.value = containerRef.value.offsetHeight
  containerWidth.value = containerRef.value.offsetWidth

  // 限制滚动位置, [0, contentHeight - containerHeight]
  scrollTop.value = Math.min(
    scrollTop.value,
    contentHeight.value - containerHeight.value
  )
  scrollLeft.value = Math.min(
    scrollLeft.value,
    contentWidth.value - containerWidth.value
  )
  scrollTop.value = Math.max(scrollTop.value, 0)
  scrollLeft.value = Math.max(scrollLeft.value, 0)
}

// 处理鼠标滚轮
const handleWheel = (e: WheelEvent) => {
  e.preventDefault()

  // 优先处理垂直滚动
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    scrollTop.value += e.deltaY * props.scrollSpeed
    scrollTop.value = Math.max(
      0,
      Math.min(scrollTop.value, contentHeight.value - containerHeight.value)
    )
  } else {
    scrollLeft.value += e.deltaX * props.scrollSpeed
    scrollLeft.value = Math.max(
      0,
      Math.min(scrollLeft.value, contentWidth.value - containerWidth.value)
    )
  }

  showScrollbars.value = true
  resetHideTimer()
}

// 开始拖动内容
const startDrag = (e: MouseEvent) => {
  if (e.button !== 0) return // 只处理左键

  isDragging.value = true
  startDragX.value = e.clientX
  startDragY.value = e.clientY
  startDragScrollLeft.value = scrollLeft.value
  startDragScrollTop.value = scrollTop.value

  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
  document.body.style.cursor = 'grabbing'
  document.body.style.userSelect = 'none'

  e.preventDefault()
}

// 处理拖动内容
const handleDrag = (e: MouseEvent) => {
  if (!isDragging.value) return

  const deltaX = startDragX.value - e.clientX
  const deltaY = startDragY.value - e.clientY

  scrollLeft.value = startDragScrollLeft.value + deltaX
  scrollTop.value = startDragScrollTop.value + deltaY

  // 限制滚动范围
  scrollLeft.value = Math.max(
    0,
    Math.min(scrollLeft.value, contentWidth.value - containerWidth.value)
  )
  scrollTop.value = Math.max(
    0,
    Math.min(scrollTop.value, contentHeight.value - containerHeight.value)
  )

  e.preventDefault()
}

// 停止拖动内容
const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

// 开始垂直拖动滚动条
const startVerticalDrag = (e: MouseEvent) => {
  isDraggingVertical.value = true
  startY.value = e.clientY
  startScrollTop.value = scrollTop.value

  document.addEventListener('mousemove', handleVerticalDrag)
  document.addEventListener('mouseup', stopVerticalDrag)
  document.body.style.cursor = 'grabbing'
  document.body.style.userSelect = 'none'

  e.preventDefault()
  e.stopPropagation()
}

// 处理垂直拖动滚动条
const handleVerticalDrag = (e: MouseEvent) => {
  if (!isDraggingVertical.value || !verticalTrackRef.value) return

  const deltaY = e.clientY - startY.value
  const trackHeight = verticalTrackRef.value.offsetHeight
  const thumbHeight =
    (containerHeight.value / contentHeight.value) * trackHeight
  const scrollableDistance = trackHeight - thumbHeight

  const scrollDelta = (deltaY / scrollableDistance) * contentHeight.value
  scrollTop.value = startScrollTop.value + scrollDelta

  // 限制滚动范围
  scrollTop.value = Math.max(
    0,
    Math.min(scrollTop.value, contentHeight.value - containerHeight.value)
  )

  e.preventDefault()
}

// 停止垂直拖动滚动条
const stopVerticalDrag = () => {
  isDraggingVertical.value = false
  document.removeEventListener('mousemove', handleVerticalDrag)
  document.removeEventListener('mouseup', stopVerticalDrag)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

// 开始水平拖动滚动条
const startHorizontalDrag = (e: MouseEvent) => {
  isDraggingHorizontal.value = true
  startX.value = e.clientX
  startScrollLeft.value = scrollLeft.value

  document.addEventListener('mousemove', handleHorizontalDrag)
  document.addEventListener('mouseup', stopHorizontalDrag)
  document.body.style.cursor = 'grabbing'
  document.body.style.userSelect = 'none'

  e.preventDefault()
  e.stopPropagation()
}

// 处理水平拖动滚动条
const handleHorizontalDrag = (e: MouseEvent) => {
  if (!isDraggingHorizontal.value || !horizontalTrackRef.value) return

  const deltaX = e.clientX - startX.value
  const trackWidth = horizontalTrackRef.value.offsetWidth
  const thumbWidth = (containerWidth.value / contentWidth.value) * trackWidth
  const scrollableDistance = trackWidth - thumbWidth

  const scrollDelta = (deltaX / scrollableDistance) * contentWidth.value
  scrollLeft.value = startScrollLeft.value + scrollDelta

  // 限制滚动范围
  scrollLeft.value = Math.max(
    0,
    Math.min(scrollLeft.value, contentWidth.value - containerWidth.value)
  )

  e.preventDefault()
}

// 停止水平拖动滚动条
const stopHorizontalDrag = () => {
  isDraggingHorizontal.value = false
  document.removeEventListener('mousemove', handleHorizontalDrag)
  document.removeEventListener('mouseup', stopHorizontalDrag)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

// 自动隐藏滚动条的计时器
let hideTimer: number | null = null
const resetHideTimer = () => {
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = window.setTimeout(() => {
    showScrollbars.value = false
  }, 1500)
}

// 监听内容变化
let resizeObserver: ResizeObserver | null = null
let mutationObserver: MutationObserver | null = null

onMounted(() => {
  nextTick(() => {
    initSizes()

    // 监听容器大小变化
    if (containerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        initSizes()
      })
      resizeObserver.observe(containerRef.value)
    }

    // 监听内容变化
    if (contentWrapperRef.value?.firstElementChild) {
      mutationObserver = new MutationObserver(() => {
        initSizes()
      })
      mutationObserver.observe(contentWrapperRef.value.firstElementChild, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      })
    }
  })
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (mutationObserver) {
    mutationObserver.disconnect()
  }

  // 清理事件监听
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('mousemove', handleVerticalDrag)
  document.removeEventListener('mouseup', stopVerticalDrag)
  document.removeEventListener('mousemove', handleHorizontalDrag)
  document.removeEventListener('mouseup', stopHorizontalDrag)

  if (hideTimer) clearTimeout(hideTimer)
})
</script>
