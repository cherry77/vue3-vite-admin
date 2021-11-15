<template>
  <Menu
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
  >
    <template v-for="item in menus" :key="item.path">
      <BasicSubMenuItem :item="item" :theme="theme" :isHorizontal="isHorizontal" />
    </template>
  </Menu>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Menu } from 'ant-design-vue'
import BasicSubMenuItem from '@/components/Menu/components/BasicSubMenuItem.vue'
import menus from '@/mock/sys/menu'
export default defineComponent({
  components: {
    Menu,
    BasicSubMenuItem,
  },
  props: {
    collapsed: {
      type: Boolean
    },
    openKeys: {
      type: Array,
      default: () => []
    },
    selectedKeys: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const theme = 'dark'
    const isHorizontal = false
    return {
      menus,
      theme,
      isHorizontal
    }
  }
})

</script>
<style></style>