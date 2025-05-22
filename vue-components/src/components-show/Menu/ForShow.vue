<script setup lang="ts">
import Menu from './Menu.vue'
import MenuItem from './MenuItem.vue'
import SubMenu from './SubMenu.vue'
</script>

<template>
  <Menu>
    <MenuItem @click="console.log(1)">首页</MenuItem>
    <SubMenu title="用户中心">
      <MenuItem>个人资料</MenuItem>
      <MenuItem>账户设置</MenuItem>
      <SubMenu title="用户中心">
        <MenuItem>个人资料</MenuItem>
        <MenuItem>账户设置</MenuItem>
      </SubMenu>
    </SubMenu>
    <SubMenu title="系统设置">
      <MenuItem>权限管理</MenuItem>
      <MenuItem>操作日志</MenuItem>
    </SubMenu>
  </Menu>
</template>
