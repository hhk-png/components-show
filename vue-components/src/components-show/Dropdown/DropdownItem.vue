<template>
  <li
    class="relative"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    ref="menuRef"
  >
    <button
      class="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
      @click="onItemClick"
    >
      {{ item.label }}
      <span v-if="item.children">▶</span>
    </button>

    <ul
      v-if="item.children && isOpen"
      :class="[
        'absolute top-0 bg-white shadow-lg rounded border border-gray-200 min-w-[160px] z-20',
        openLeft ? 'right-full' : 'left-full',
      ]"
    >
      <DropdownItem
        v-for="(child, idx) in item.children"
        :key="idx"
        :item="child"
        @dropdown-item-select="emit('dropdown-item-select', $event)"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { DropdownItemEmits, DropdownItemProps } from './types'

const props = defineProps<DropdownItemProps>()
defineOptions({ name: 'DropdownItem' })
const emit = defineEmits<DropdownItemEmits>()

const isOpen = ref(false)
const openLeft = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const checkPosition = () => {
  const el = menuRef.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const shouldOpenLeft = rect.right + 160 > window.innerWidth
  openLeft.value = shouldOpenLeft
}

onMounted(() => {
  window.addEventListener('resize', checkPosition)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkPosition)
})

const onItemClick = () => {
  if (!props.item.children) {
    emit('dropdown-item-select', props.item)
  }
}

const onMouseEnter = () => {
  isOpen.value = true
  checkPosition()
}

const onMouseLeave = () => {
  isOpen.value = false
}
</script>
