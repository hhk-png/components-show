<script setup lang="ts">
import type { DropdownItem } from './types'
import Dropdown from './Dropdown.vue'

const menuItems: DropdownItem[] = [
  { label: '文件' },
  {
    label: '编辑',
    children: [
      {
        label: '复制',
        children: [
          { label: '深拷贝' },
          {
            label: '浅拷贝',
            children: [{ label: '第一种方式' }, { label: '第二种方式' }],
          },
        ],
      },
    ],
  },
  { label: '视图' },
  { label: '帮助' },
]
</script>

<template>
  <Dropdown :items="menuItems" @select="console.log"></Dropdown>
</template>
