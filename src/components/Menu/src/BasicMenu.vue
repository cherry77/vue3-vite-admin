<template>
  <Menu
    mode="inline"
    theme="dark"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
  >
    <template v-for="item in menus" :key="item.path">
      <BasicSubMenuItem :item="item" :theme="theme" :isHorizontal="isHorizontal" />
    </template>
  </Menu>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Menu } from 'ant-design-vue'
import BasicSubMenuItem from '@/components/Menu/src/components/BasicSubMenuItem.vue'
import menus from '@/mock/sys/menu'
import { MenuState } from './types'

export default defineComponent({
  components: {
    Menu,
    BasicSubMenuItem,
  },
  props: {
    collapsed: {
      type: Boolean
    },
  },
  setup(props) {
    const theme = 'dark'
    const isHorizontal = false
    const menuState = reactive<MenuState>({
      defaultSelectedKeys: [],
      openKeys: [],
      selectedKeys: [],
      collapsedOpenKeys: [],
    });
    return {
      menus,
      theme,
      isHorizontal,
      ...toRefs(menuState),
    }
  }
})

</script>
<style></style>