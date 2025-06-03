<template>
  <div class="max-w-lg mx-auto mt-10">
    <Slider v-model="volume" :min="0" :max="100" :step="5" label="音量" />
  </div>
</template>

<script setup lang="ts">
import Slider from './Slider.vue'
import { ref } from 'vue'

const volume = ref(50)
</script>
