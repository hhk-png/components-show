<script setup lang="ts">
import { ref } from 'vue'
import Rate from './Rate.vue'
const curScore = ref<number>(3)
</script>

<template>
  <div class="hello">
    <h3>显示数字：</h3>
    <Rate v-model:score="curScore" :disabled="false" />
    <h3>只读，显示数字：</h3>
    <Rate :score="3" :disabled="true" showText />
  </div>
</template>
