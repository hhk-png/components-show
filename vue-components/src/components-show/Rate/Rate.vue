<script setup lang="ts">
import { ref } from 'vue'
import Star from './Star.vue'
import type { RateEmits, RateProps } from './types'

defineProps<RateProps>()

const emit = defineEmits<RateEmits>()

const curScore = ref<number>(0)

const setScore = (val: number) => {
  emit('update:score', val)
}
</script>

<template>
  <div
    class="flex items-center space-x-2"
    :class="{ 'pointer-events-none opacity-50': disabled }"
  >
    <span v-if="showText" class="text-orange-500 font-bold text-lg">
      {{ score }}分
    </span>
    <div class="flex space-x-1">
      <div
        v-for="i in 5"
        :key="i"
        class="w-6 h-6 cursor-pointer"
        @mouseenter="!disabled && (curScore = i)"
        @mouseleave="!disabled && (curScore = 0)"
        @click="!disabled && setScore(i)"
      >
        <Star
          :color="(i <= Math.floor(score) || i === curScore) ? 'yellow' : 'gray'"
        ></Star>
      </div>
    </div>
  </div>
</template>
