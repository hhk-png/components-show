<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import type { SegmentedControlEmits, SegmentedControlProps } from './types'

const props = withDefaults(defineProps<SegmentedControlProps>(), {
  defaultIndex: 0,
})
const emits = defineEmits<SegmentedControlEmits>()

const activeIndex = ref<number>(props.defaultIndex)
const componentReady = ref(false)
const controlRef = useTemplateRef<HTMLElement>('controlRef')
const segmentRefs = ref<HTMLElement[]>([])

const onInputChange = (value: string, index: number) => {
  activeIndex.value = index
  emits('select', value, index)
}

function updateHighlightPosition() {
  const activeSegment = segmentRefs.value[activeIndex.value]
  const root = controlRef.value

  if (activeSegment && root) {
    const { offsetWidth, offsetLeft } = activeSegment
    root.style.setProperty('--highlight-width', `${offsetWidth}px`)
    root.style.setProperty('--highlight-x-pos', `${offsetLeft}px`)
  }
}
onMounted(() => {
  componentReady.value = true
  updateHighlightPosition()
})

watch(activeIndex, async () => {
  updateHighlightPosition()
})
</script>

<template>
  <div
    class="flex"
    :style="{
      '--highlight-width': 'auto',
      '--highlight-x-pos': '0',
    }"
    ref="controlRef"
  >
    <div
      :class="[
        'inline-flex justify-between bg-white shadow-md rounded-lg max-w-[500px] p-3 mx-auto overflow-hidden relative',
        'before:absolute before:content-[\'\'] before:top-2 before:bottom-2 before:left-0 before:z-[0]',
        'before:bg-blue-500 before:rounded-lg before:w-[var(--highlight-width)] before:translate-x-[var(--highlight-x-pos)]',
        componentReady
          ? 'before:transition-transform before:transition-width before:duration-300'
          : '',
      ]"
    >
      <div
        v-for="(item, i) in segments"
        :key="item.value"
        class="min-w-[120px] relative text-center z-[1]"
        :ref="el => segmentRefs[i] = el as HTMLElement"
      >
        <input
          class="absolute inset-0 w-full h-full opacity-0 m-0 cursor-pointer"
          type="radio"
          :value="item.value"
          :id="item.label"
          :name="name"
          :checked="i === activeIndex"
          @change="onInputChange(item.value, i)"
        />
        <label
          class="cursor-pointer block font-bold p-3 transition-colors duration-500"
          :class="{ 'text-white': i === activeIndex }"
          :for="item.label"
        >
          {{ item.label }}
        </label>
      </div>
    </div>
  </div>
</template>
