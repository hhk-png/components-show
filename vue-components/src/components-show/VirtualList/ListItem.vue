<script lang="ts" setup>
import { onMounted, onUnmounted, useTemplateRef, type CSSProperties } from 'vue'

defineOptions({
  name: 'DynamicSizeListItem'
})
defineSlots<{
  default: (props: { index: number }) => any
}>()
const props = defineProps<{
  index: number
  style: CSSProperties
}>()
const emits = defineEmits<{
  (e: 'size-change', index: number, domNode: HTMLElement): void
}>()

const container = useTemplateRef<HTMLElement>('containerRef')
onMounted(() => {
  if (!container.value) {
    return
  }
  const domNode = container.value.firstElementChild  as HTMLElement
  const resizeObserver = new ResizeObserver(() => {
    emits('size-change', props.index, domNode)
  })
  resizeObserver.observe(domNode)
  onUnmounted(() => {
    resizeObserver.unobserve(domNode)
  })
})

</script>

<template>
  <div :style="style" ref="containerRef">
    <slot :index="index"></slot>
  </div>
</template>