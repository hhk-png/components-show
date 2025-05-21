<script setup lang="ts">
import { ref } from 'vue'
import type { StepItem } from './types'
import Step from './Step.vue'

const stepActive = ref(4)
const stepData = ref<StepItem[]>([
  { status: 'Step 1' },
  { status: 'Step 2' },
  { status: 'Step 3' },
  { status: 'Step 4' },
  { status: 'Step 4' },
  { status: 'Step 4' },
])
</script>

<template>
  <Step :direction="'horizontal'" :step-data="stepData" :step-active="stepActive"></Step>
</template>
