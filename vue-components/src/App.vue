<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const global = getCurrentInstance()?.appContext.config.globalProperties

const toast = () => {
  global?.$toast.show('hello world')
}

</script>

<template>
  <button @click="toast" class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
    click
  </button>
</template>

<style scoped></style>
