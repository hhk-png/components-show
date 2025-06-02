<script setup lang="ts">
import Pagination from './Pagination.vue'

const data = Array.from({ length: 111 }, (_, idx) => ({
  id: idx,
  first_name: 'firstName_' + idx,
  last_name: 'lastName_' + idx,
  email: 'email' + idx,
  phone: 'phone_' + idx,
}))
</script>

<template>
  <Pagination
    :data="data"
    :pageSize="5"
    :colNames="['ID', 'FIRST NAME', 'LAST NAME', 'EMAIL', 'PHONE']"
  />
</template>
