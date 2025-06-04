<template>
  <div class="w-52 h-44 overflow-y-auto border rounded shadow p-2">
    <ul class="space-y-1">
      <li
        v-for="item in items"
        :key="item"
        @click="toggle(item)"
        :class="[
          'flex items-center p-1 cursor-pointer rounded hover:bg-green-100',
          checked.includes(item) ? 'bg-green-200' : ''
        ]"
      >
        <input
          type="checkbox"
          :checked="checked.includes(item)"
          readonly
          class="mr-2 accent-green-600"
        />
        <span>{{ `Item ${item}` }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: number[]
  checked: number[]
}>()

const emit = defineEmits<{
  (e: 'update:checked', value: number[]): void
}>()

const toggle = (value: number) => {
  const newChecked = [...props.checked]
  const index = newChecked.indexOf(value)

  if (index === -1) {
    newChecked.push(value)
  } else {
    newChecked.splice(index, 1)
  }

  emit('update:checked', newChecked)
}
</script>
