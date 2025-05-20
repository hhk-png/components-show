<script setup lang="ts">
import Popover from './Popover.vue'

</script>

<template>
  <Popover>
    <template #default> Hover me </template>

    <template #content> I am a popover! </template>
  </Popover>
</template>
