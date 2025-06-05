<script setup lang="ts">
import { onMounted, watch, useTemplateRef } from 'vue'
import type { WatermarkProps } from './types'

const props = defineProps<WatermarkProps>()

const containerRef = useTemplateRef<HTMLElement>('containerRef')

const drawWatermark = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const [width, height] = props.markSize ?? [300, 200]
  canvas.width = width
  canvas.height = height

  ctx.clearRect(0, 0, width, height)
  ctx.globalAlpha = props.opacity ?? 0.1
  ctx.font = `${props.fontSize ?? 16}px sans-serif`
  ctx.fillStyle = '#000'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.translate(width / 2, height / 2)
  ctx.rotate(((props.rotate ?? -20) * Math.PI) / 180)
  ctx.fillText(props.text, 0, 0)

  const dataUrl = canvas.toDataURL()

  if (containerRef.value) {
    containerRef.value.style.backgroundImage = `url(${dataUrl})`
  }
}

onMounted(drawWatermark)

watch(
  () => [
    props.text,
    props.fontSize,
    props.rotate,
    props.opacity,
    props.markSize,
  ],
  drawWatermark,
  { deep: true }
)
</script>

<template>
  <div
    ref="containerRef"
    class="pointer-events-none bg-repeat"
    :style="{
      backgroundSize:
        `${props.markSize?.[0] ?? 300}px ${props.markSize?.[1] ?? 200}px`,
    }"
  >
    <slot />
  </div>
</template>
