<template>
  <div class="text-center p-4">
    <div class="flex justify-center items-center gap-6">
      <!-- 左边列表 -->
      <TransferList :items="left" v-model:checked="checked" />

      <!-- 控制按钮 -->
      <div class="flex flex-col space-y-2">
        <button
          @click="handleAllRight"
          :disabled="left.length === 0"
          class="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          ≫
        </button>
        <button
          @click="handleCheckedRight"
          :disabled="leftChecked.length === 0"
          class="border border-green-500 text-green-700 px-3 py-1 rounded disabled:opacity-50"
        >
          &gt;
        </button>
        <button
          @click="handleCheckedLeft"
          :disabled="rightChecked.length === 0"
          class="border border-green-500 text-green-700 px-3 py-1 rounded disabled:opacity-50"
        >
          &lt;
        </button>
        <button
          @click="handleAllLeft"
          :disabled="right.length === 0"
          class="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          ≪
        </button>
      </div>

      <!-- 右边列表 -->
      <TransferList :items="right" v-model:checked="checked" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TransferList from './TransferList.vue'
import type { TransferProps, TransferEmits } from './types.ts'

const props = defineProps<TransferProps>()
const emit = defineEmits<TransferEmits>()

const checked = ref<number[]>([...(props.initialChecked || [])])

const not = <T>(a: T[], b: T[]) => a.filter((v) => !b.includes(v))
const intersection = <T>(a: T[], b: T[]) => a.filter((v) => b.includes(v))

const left = computed(() => props.left)
const right = computed(() => props.right)

const leftChecked = computed(() => intersection(checked.value, left.value))
const rightChecked = computed(() => intersection(checked.value, right.value))

const handleAllRight = () => {
  emit('update:left', [])
  emit('update:right', [...right.value, ...left.value])
}

const handleCheckedRight = () => {
  emit('update:left', not(left.value, leftChecked.value))
  emit('update:right', [...right.value, ...leftChecked.value])
  checked.value = not(checked.value, leftChecked.value)
}

const handleCheckedLeft = () => {
  emit('update:left', [...left.value, ...rightChecked.value])
  emit('update:right', not(right.value, rightChecked.value))
  checked.value = not(checked.value, rightChecked.value)
}

const handleAllLeft = () => {
  emit('update:left', [...left.value, ...right.value])
  emit('update:right', [])
}
</script>
