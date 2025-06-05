<script setup lang="ts">
import Watermark from './Watermark.vue'
</script>

<template>
  <Watermark
    text="Confidential"
    :markSize="[150, 100]"
    class="w-full h-[300px]"
  >
    <div class="p-4">
      <h1 class="text-4xl font-bold">Hello World</h1>
      <p>This is a page with a watermark.</p>
    </div>
  </Watermark>
</template>
