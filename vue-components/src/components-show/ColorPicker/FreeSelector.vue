<script setup lang="ts">
import type { FreeSelectorEmits, FreeSelectorProps } from './types'

const emit = defineEmits<FreeSelectorEmits>()
defineProps<FreeSelectorProps>()

</script>

<template>
  <div :class="`grid gap-2 mb-4 w-[400px] ${className}`">
    <!-- 饱和度面板 -->
    <div
      class="w-full h-[150px] relative cursor-crosshair rounded"
      :style="{
        backgroundImage: `linear-gradient(transparent, black), linear-gradient(to right, white, transparent)`,
        backgroundColor: `hsl(${parsedColor.hsv.h}, 100%, 50%)`,
      }"
      @click="(e) => emit('saturationChange', e)"
    >
      <div
        class="absolute w-[15px] h-[15px] border-2 border-white rounded-full translate-x-[-7.5px] translate-y-[-7.5px]"
        :style="{
          backgroundColor: parsedColor.hex,
          left: `${satCoords?.[0] ?? 0}%`,
          top: `${satCoords?.[1] ?? 0}%`,
        }"
      />
    </div>

    <!-- 色相选择条 -->
    <div
      class="w-full h-3 relative cursor-crosshair rounded-full"
      :style="{
        backgroundImage:
          'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
      }"
      @click="(e) => emit('hueChange', e)"
    >
      <div
        class="absolute w-[15px] h-[15px] border-2 border-white rounded-full translate-x-[-7.5px] translate-y-[-2px]"
        :style="{
          backgroundColor: parsedColor.hex,
          left: `${hueCoords ?? 0}%`,
        }"
      />
    </div>
  </div>
</template>
