<script setup lang="ts">
import { ref } from 'vue'
import type { StepDirection, StepItem } from './types'
import Step from './Step.vue'

const direction = ref<StepDirection>('horizontal')
const stepActive = ref(2)
const stepData = ref<StepItem[]>([
  { status: 'Step 1' },
  { status: 'Step 2' },
  { status: 'Step 3' },
  { status: 'Step 4' },
])

const activeChange = (index: number) => {
  stepActive.value = index + 1
}

const directionChange = (newDirection: StepDirection) => {
  direction.value = newDirection
}
</script>

<template>
  <div class="flex items-center justify-center h-[50vh]">
    <div class="basis-1/4 flex flex-col items-center justify-center mb-4">
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded mb-2"
        @click="directionChange('horizontal')"
      >
        Horizontal
      </button>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded"
        @click="directionChange('vertical')"
      >
        Vertical
      </button>
    </div>
    <Step
      class="flex-1"
      @step-click="activeChange"
      :direction="direction"
      :step-data="stepData"
      :step-active="stepActive"
    ></Step>
  </div>
</template>
