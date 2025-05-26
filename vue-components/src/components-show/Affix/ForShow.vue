<script setup lang="ts">
import Affix from './Affix.vue'
</script>

<template>
  <div>
    <div class="h-[150px]">
      Scroll down to see the affix in action.
    </div>
    <Affix :top="100" :left="100" :offset="200">
      <div class="w-[200px] h-[50px] bg-blue-200 text-center leading-[50px]">
        Affix Element
      </div>
    </Affix>
    <div class="h-[1500px] pt-[200px]">
      Scroll down to see the affix in action.
    </div>
  </div>
</template>
