<template>
  <ColorPicker v-model:color="color" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ColorPicker from './ColorPicker.vue'

const color = ref('#ffffff')

</script>
