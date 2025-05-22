<template>
  <div
    class="relative inline-block"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <button
      class="box-border w-[160px] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      菜单
    </button>

    <!-- 顶部菜单通过状态控制显示 -->
    <ul
      v-if="isOpen"
      class="absolute pt-2 left-0 bg-white shadow-lg rounded border border-gray-200 min-w-[160px] z-10"
    >
      <DropdownItemComp
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        @dropdown-item-select="handleSelect"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DropdownItemComp from './DropdownItem.vue'
import type { DropdownEmits, DropdownItem, DropdownProps } from './types'

defineProps<DropdownProps>()
const emit = defineEmits<DropdownEmits>()

const isOpen = ref(false)

const handleSelect = (item: DropdownItem) => {
  emit('select', item)
  isOpen.value = false
}
</script>
