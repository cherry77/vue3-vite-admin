<template>
  <MenuItem v-if="!item.children || !item.children.length" :key="item.name">
    <MenuItemContent :item="item"/>
  </MenuItem>

  <SubMenu v-if="item.children && item.children.length" :key="item.name">
    <template #title>
      <MenuItemContent :item="item"/>
    </template>
    
    <template v-for="childItem in item.children" :key="childItem.name">
      <BasicSubMenuItem v-bind="$props" :item="childItem" />
    </template>
  </SubMenu>
  
</template>
<script lang="ts" setup>
import { MenuItem, SubMenu } from 'ant-design-vue'
import MenuItemContent from './MenuItemContent.vue'
import BasicSubMenuItem from './BasicSubMenuItem.vue'

defineProps({
  item: {
    type: Object,
    default: () => { }
  },
  theme: {
    type: String
  },
  isHorizontal: {
    type: Boolean
  }
})
</script>
<style></style>