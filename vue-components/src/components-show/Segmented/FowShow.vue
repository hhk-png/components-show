<template>
  <div>
    <SegmentedControl
      name="group-1"
      :segments="segments"
      :defaultIndex="0"
      :onSelect="handleSelect"
    />
    <p class="text-center">Selected: {{ selectedValue1 }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SegmentedControl from './Segmented.vue'
import type { Segment } from './types'

const selectedValue1 = ref('complete')

const segments: Segment[] = [
  { label: 'Complete', value: 'complete' },
  { label: 'Incomplete', value: 'incomplete' },
  { label: 'Pending', value: 'pending' },
]

const handleSelect = (val: string) => {
  selectedValue1.value = val
}
</script>
