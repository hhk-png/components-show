<template>
  <div
    :class="[
      'relative mb-2',
      direction === 'vertical' ? 'flex flex-col' : 'flex',
    ]"
  >
    <!-- 步骤节点 -->
    <div
      v-for="(item, index) in stepData"
      :key="index"
      @click="handleStepClick(index)"
      :class="[
        'z-10 text-center cursor-pointer',
        direction === 'vertical' ? 'h-25' : 'w-40',
        stepActive - 1 > index
          ? 'text-gray-900'
          : stepActive - 1 === index
            ? 'text-orange-500'
            : 'text-gray-500',
      ]"
    >
      <div
        :class="[
          'w-7 h-7 mx-auto flex items-center justify-center ' +
            'rounded-full border-2 font-bold text-white text-sm',
          stepActive - 1 > index
            ? 'bg-green-700 border-green-200'
            : stepActive - 1 === index
              ? 'bg-orange-500 border-orange-200'
              : 'bg-gray-500 border-gray-300',
        ]"
      >
        <img
          v-if="stepActive - 1 > index"
          src="./images/successIco.png"
          alt="Success"
        />
        <span v-else>{{ index + 1 }}</span>
      </div>
      <div class="text-base leading-10 h-10">{{ item.status }}</div>
    </div>

    <!-- 背景线 -->
    <div
      :class="[
        'absolute bg-gray-300',
        direction === 'vertical'
          ? 'w-1 left-1/2 -translate-x-1/2 top-7'
          : 'top-3 h-1 left-20',
      ]"
      :style="direction === 'vertical'
        ? { height: `${(stepData.length - 1) * 100}px` }
        : { width: `${(stepData.length - 1) * 160}px` }"
    ></div>

    <!-- 进度线 -->
    <div
      :class="[
        'absolute bg-green-700 z-5',
        direction === 'vertical'
          ? 'w-1 left-1/2 -translate-x-1/2 top-7'
          : 'top-3 h-1 left-20',
      ]"
      :style="direction === 'vertical'
        ? { height: `${Math.min(stepActive - 1, stepData.length - 1) * 100}px` }
        : { width: `${Math.min(stepActive - 1, stepData.length - 1) * 160}px` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { StepEmits, StepProps } from './types'

const emits = defineEmits<StepEmits>()

defineProps<StepProps>()

const handleStepClick = (index: number) => {
  emits('stepClick', index)
}
</script>