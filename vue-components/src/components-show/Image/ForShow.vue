<script setup lang="ts">
import Image from './Image.vue'
</script>

<template>
  <div :style="{ height: '3000px', width: '100px' }"></div>
  <Image src="https://jsonplaceholder.typicode.com/mockend.svg" :lazy="true"></Image>
</template>
