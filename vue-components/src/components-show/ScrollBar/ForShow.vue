<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">完全自定义滚动条示例</h1>
    
    <div class="flex gap-8">
      <!-- 垂直滚动示例 -->
      <div class="w-64">
        <h2 class="text-lg font-semibold mb-2">垂直滚动</h2>
        <CustomScrollbar class="border border-gray-300 rounded-lg" height="300px">
          <div class="p-4">
            <div v-for="i in 30" :key="i" class="py-2 border-b border-gray-200">
              项目 {{ i }}
            </div>
          </div>
        </CustomScrollbar>
      </div>
      
      <!-- 水平滚动示例 -->
      <div class="flex-1">
        <h2 class="text-lg font-semibold mb-2">水平滚动</h2>
        <CustomScrollbar class="border border-gray-300 rounded-lg" height="150px">
          <div class="flex gap-4 p-4" style="width: 1200px">
            <div v-for="i in 30" :key="i" class="w-32 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
              卡片 {{ i }}
            </div>
          </div>
        </CustomScrollbar>
      </div>
    </div>
    
    <!-- 双向滚动示例 -->
    <div class="mt-8">
      <h2 class="text-lg font-semibold mb-2">双向滚动</h2>
      <CustomScrollbar class="border border-gray-300 rounded-lg" height="300px" width="500px">
        <div class="p-4" style="width: 800px">
          <div v-for="i in 20" :key="i" class="flex gap-4 py-2">
            <span class="w-12">行 {{ i }}</span>
            <div v-for="j in 15" :key="j" class="w-16 h-10 bg-green-100 rounded flex items-center justify-center">
              {{ i }}-{{ j }}
            </div>
          </div>
        </div>
      </CustomScrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CustomScrollbar from './Scrollbar.vue'
</script>