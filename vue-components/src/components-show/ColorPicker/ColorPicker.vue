<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ColorRGB, ColorPickerProps, ColorPickerEmits } from './types'
import {
  clamp,
  DEFAULT_COLORS,
  getHueCoordinates,
  getSaturationCoordinates,
  hsvToRgb,
  parseColor,
  rgbToHex,
} from './utils'
import PredefinedSelector from './PredefinedSelector.vue'
import FreeSelector from './FreeSelector.vue'

const props = defineProps<ColorPickerProps>()
const emit = defineEmits<ColorPickerEmits>()

const color = computed(() => props.color)
const parsedColor = ref(parseColor(color.value))
const satCoords = ref(getSaturationCoordinates(parsedColor.value))
const hueCoords = ref(getHueCoordinates(parsedColor.value))
watch(color, (newV) => {
  parsedColor.value = parseColor(newV)
  satCoords.value = getSaturationCoordinates(parsedColor.value)
  hueCoords.value = getHueCoordinates(parsedColor.value)
})

function handleHexChange(e: Event) {
  const val = (e.target as HTMLInputElement).value
  const formatted = val.startsWith('#') ? val : `#${val}`
  emit('update:color', formatted)
}

function handleRgbChange(component: keyof ColorRGB, value: number) {
  const { r, g, b } = parsedColor.value.rgb
  if (component === 'r') emit('update:color', rgbToHex({ r: value ?? 0, g, b }))
  if (component === 'g') emit('update:color', rgbToHex({ r, g: value ?? 0, b }))
  if (component === 'b') emit('update:color', rgbToHex({ r, g, b: value ?? 0 }))
}

function handleSaturationChange(e: MouseEvent) {
  const rect = (e.target as HTMLElement).getBoundingClientRect()
  const x = clamp(e.clientX - rect.left, 0, rect.width)
  const y = clamp(e.clientY - rect.top, 0, rect.height)

  const s = (x / rect.width) * 100
  const v = 100 - (y / rect.height) * 100

  const rgb = hsvToRgb({ h: parsedColor.value.hsv.h, s, v })
  emit('update:color', rgbToHex(rgb))
}

function handleHueChange(e: MouseEvent) {
  const rect = (e.target as HTMLElement).getBoundingClientRect()
  const x = clamp(e.clientX - rect.left, 0, rect.width)
  const h = Math.round((x / rect.width) * 360)

  const hsv = { h, s: parsedColor.value.hsv.s, v: parsedColor.value.hsv.v }
  const rgb = hsvToRgb(hsv)
  emit('update:color', rgbToHex(rgb))
}
</script>

<template>
  <div class="p-3 w-fit">
    <PredefinedSelector
      :colors="DEFAULT_COLORS"
      :parsedColor="parsedColor"
      :onSelect="(color) => emit('update:color', color)"
      class="mb-1"
    />

    <FreeSelector
      :parsedColor="parsedColor"
      :satCoords="satCoords"
      :hueCoords="hueCoords"
      :onSaturationChange="handleSaturationChange"
      :onHueChange="handleHueChange"
    />

    <!-- 输入区域 -->
    <div class="flex justify-between m-1">
      <!-- Hex 部分 -->
      <div class="grid grid-cols-[1fr_3fr] gap-2 items-center">
        <div
          class="w-7 h-7 rounded-full shadow-lg"
          :style="{ background: color }"
        />
        <div>
          <label for="cp-input-hex" class="text-md block">Hex:</label>
          <input
            id="cp-input-hex"
            class="w-[75px] p-1 block"
            placeholder="Hex"
            v-model="parsedColor.hex"
            @change="handleHexChange"
          />
        </div>
      </div>

      <!-- RGB 部分 -->
      <div class="grid grid-cols-3 gap-2 items-center">
        <div v-for="c in ['r', 'g', 'b']" :key="c">
          <label :for="`cp-input-${c}`" class="text-[12px] block">
            {{ c.toUpperCase() }}:
          </label>
          <input
            :id="`cp-input-${c}`"
            class="w-9 p-1 block"
            :value="parsedColor.rgb[c as keyof ColorRGB]"
            @change="(e) => handleRgbChange(c as keyof ColorRGB, Number((e.target! as HTMLInputElement).value))"
            inputmode="numeric"
            pattern="[0-9]*"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  </div>
</template>
