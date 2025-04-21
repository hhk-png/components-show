<script setup lang="ts">
import FixedSizeList from './FixedSizeList.vue'
import DynamicSizeList from './DynamicSizeList.vue'
</script>

<template>
  <div class="flex w-full justify-around items-center">
    <DynamicSizeList :height="300" :width="300" :itemCount="1000000" :item-estimated-size="50">
      <template #default="{ index }">
        <div 
        :style="{height: 20 + Math.floor(Math.random() * 50) + 'px'}" 
        :class="[index & 1 ? 'bg-blue-100' : '', 'flex', 'items-center', 'justify-center']"
        >Row {{ index }}</div>
      </template>
    </DynamicSizeList>

    <FixedSizeList :height="300" :width="300" :item-size="50" :item-count="1000">
      <template #default="{ index, style }">
        <div :style="style" :class="index & 1 ? 'bg-blue-100' : ''">Row {{ index }}</div>
      </template>
    </FixedSizeList>
  </div>
</template>
