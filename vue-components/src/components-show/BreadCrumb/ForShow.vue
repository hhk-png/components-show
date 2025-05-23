<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue'
</script>

<template>
  <BreadCrumb
    :pathNames="['产品', '详情']"
    :activePath="'详情'"
    :onClickElement="console.log"
  >
    <template #home>首页</template>
    <template #separator><span>/</span></template>
  </Breadcrumb>
</template>
