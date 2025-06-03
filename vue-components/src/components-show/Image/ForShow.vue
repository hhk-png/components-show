<script setup lang="ts">
import Image from './Image.vue'
</script>

<template>
  <div class="h-[300px] w-[200px] overflow-y-auto">
    <div class="h-[1000px] bg-gray-200"></div>
    <Image
      src="https://jsonplaceholder.typicode.com/mockend.svg"
      :lazy="true"
    ></Image>
  </div>
</template>
