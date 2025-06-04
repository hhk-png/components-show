<template>
  <Transfer
    v-model:left="left"
    v-model:right="right"
    :initialChecked="[2, 8]"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Transfer from './Transfer.vue'

const left = ref([1, 2, 3, 4, 5])
const right = ref([6, 7, 8, 9, 10])
</script>
