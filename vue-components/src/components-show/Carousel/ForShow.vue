<template>
  <div class="max-w-4xl mx-auto p-4">
    <Carousel :images="slides" :interval="4000" />
  </div>
</template>

<script setup lang="ts">
import Carousel from './Carousel.vue'

const slides = [
  "https://picsum.photos/id/1015/800/600",
  "https://picsum.photos/id/1016/800/600",
  "https://picsum.photos/id/1018/800/600",
  "https://picsum.photos/id/1020/800/600",
  "https://picsum.photos/id/1021/800/600"
]
</script>