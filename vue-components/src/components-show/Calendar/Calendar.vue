<template>
  <div class="max-w-xl mx-auto p-4">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <button
        @click="prevMonth"
        class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ‹
      </button>
      <div class="text-lg font-semibold">
        {{ currentYear }}年 {{ currentMonth + 1 }}月
      </div>
      <button
        @click="nextMonth"
        class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ›
      </button>
    </div>

    <!-- Weekdays -->
    <div class="grid grid-cols-7 text-center font-semibold mb-2">
      <div v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day">
        {{ day }}
      </div>
    </div>

    <!-- Calendar Days -->
    <div class="grid grid-cols-7 gap-1">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        @click="selectDate(day.date)"
        class="p-2 h-20 border rounded-lg cursor-pointer text-sm transition-all"
        :class="[
          day.isCurrentMonth ? '' : 'bg-gray-100 text-gray-400',
          isToday(day.date) ? 'border-blue-500 bg-blue-300' : '',
          isRangeStart(day.date) ? 'bg-blue-500 font-bold' : '',
          isRangeEnd(day.date) ? 'bg-blue-500 font-bold' : '',
          isInRange(day.date) ? 'bg-blue-100 text-blue-800' : '',
        ]"
      >
        {{ day.date.getDate() }}
      </div>
    </div>

    <!-- Output -->
    <div class="mt-4 text-sm text-gray-700">
      <div v-if="rangeStartDate">开始: {{ formatDate(rangeStartDate) }}</div>
      <div v-if="rangeEndDate">结束: {{ formatDate(rangeEndDate) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const rangeStartDate = ref<Date | undefined>(undefined)
const rangeEndDate = ref<Date | undefined>(undefined)

// 获取某个月的天数，某个月上月的最后一天
const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate()

// 获取某个月的第一天是星期几
const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay()

const calendarDays = computed(() => {
  const days: { date: Date; isCurrentMonth: boolean }[] = []

  const firstDay = getFirstDayOfMonth(currentYear.value, currentMonth.value)
  const prevMonthLastDate = daysInMonth(
    currentYear.value,
    currentMonth.value - 1
  )

  // Fill previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(
        currentYear.value,
        currentMonth.value - 1,
        prevMonthLastDate - i
      ),
      isCurrentMonth: false,
    })
  }

  // Current month days
  const totalDays = daysInMonth(currentYear.value, currentMonth.value)
  for (let i = 1; i <= totalDays; i++) {
    days.push({
      date: new Date(currentYear.value, currentMonth.value, i),
      isCurrentMonth: true,
    })
  }

  // Fill next month days
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(currentYear.value, currentMonth.value + 1, i),
      isCurrentMonth: false,
    })
  }

  return days
})

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const isSameDate = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate()

const isToday = (date: Date) => isSameDate(date, today)

const isInRange = (date: Date) => {
  return (
    rangeStartDate.value &&
    rangeEndDate.value &&
    date >= rangeStartDate.value &&
    date <= rangeEndDate.value
  )
}

const isRangeStart = (date: Date) =>
  rangeStartDate.value && isSameDate(date, rangeStartDate.value)

const isRangeEnd = (date: Date) =>
  rangeEndDate.value && isSameDate(date, rangeEndDate.value)

// 选择日期时间段的逻辑
const selectDate = (date: Date) => {
  if (!rangeStartDate.value || (rangeStartDate.value && rangeEndDate.value)) {
    rangeStartDate.value = date
    rangeEndDate.value = undefined
  } else if (!rangeEndDate.value) {
    if (date < rangeStartDate.value) {
      rangeEndDate.value = rangeStartDate.value
      rangeStartDate.value = date
    } else {
      rangeEndDate.value = date
    }
  }
}

const formatDate = (date: Date | undefined): string =>
  date ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` : ''
</script>
