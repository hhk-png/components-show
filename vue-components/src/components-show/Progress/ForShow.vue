<template>
  <div>
    <b class="block mb-3">ContinuousProgress:</b>
    <div class="w-[300px]">
      <ContinuousProgress :bgcolor="'#6a1b9a'" :ratio="70" />
    </div>

    <b class="block mb-8">DisContinuousProgress:</b>
    <div class="w-[300px] flex justify-center">
      <DisContinuous :step="12" :currentStep="7" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContinuousProgress from './Continuous.vue'
import DisContinuous from './DisContinuous.vue'
</script>
