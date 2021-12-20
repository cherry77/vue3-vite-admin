<template>
  <Menu
    mode="inline"
    theme="dark"
    v-model:openKeys="menuState.openKeys"
    v-model:selectedKeys="menuState.selectedKeys"
    @select="handleSelect"
  >
    <template v-for="item in menus" :key="item.path">
      <BasicSubMenuItem :item="item" :theme="theme" :isHorizontal="isHorizontal" />
    </template>
  </Menu>
</template>
<script lang="ts" setup>
import {reactive, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { Menu } from 'ant-design-vue'
import BasicSubMenuItem from '@/components/Menu/src/components/BasicSubMenuItem.vue'
import { MenuState } from './types'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore();

const theme = 'dark'
const isHorizontal = false
const menuState = reactive<MenuState>({
  defaultSelectedKeys: [],
  openKeys: [],
  selectedKeys: [],
  collapsedOpenKeys: [],
});
const menus = userStore.getMenus

const handleSelect = ({ key }) => {
  router.push({name: key})
}
</script>
<style></style>