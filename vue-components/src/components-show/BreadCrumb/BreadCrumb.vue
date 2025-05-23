<script setup lang="ts">
import { ref, watch } from 'vue'
import type { BreadCrumbEmits, BreadCrumbProps } from './types'
import { HOME } from './types'

const props = defineProps<BreadCrumbProps>()
const emits = defineEmits<BreadCrumbEmits>()

const active = ref(props.activePath || HOME)
watch(
  () => props.activePath,
  (newPath) => {
    if (newPath) {
      active.value = newPath
    }
  }
)

const handleClick = (path: string) => {
  emits('clickElement', path)
  active.value = path
}

const getLiClassName = (path: string) => {
  return [
    'mx-2 font-bold cursor-pointer',
    path === active.value ? 'text-amber-500' : '',
  ]
}
</script>

<template>
  <div class="inline-block">
    <ul class="flex py-2 bg-gradient-to-r from-purple-600 to-blue-600">
      <!-- home -->
      <li :class="getLiClassName(HOME)">
        <span @click="handleClick(HOME)">
          <slot name="home">{{ HOME }}</slot>
        </span>
      </li>

      <template v-if="pathNames.length > 0">
        <span class="mx-1">
          <slot name="saparator">|</slot>
        </span>
      </template>

      <!-- paths -->
      <template v-for="(path, index) in pathNames" :key="index">
        <li :class="getLiClassName(path)">
          <span @click="handleClick(path)">
            {{ path }}
          </span>
        </li>

        <template v-if="index !== pathNames.length - 1">
          <span class="mx-1">
            <slot name="saparator">|</slot>
          </span>
        </template>
      </template>
    </ul>
  </div>
</template>
