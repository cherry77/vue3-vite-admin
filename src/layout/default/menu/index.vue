<template>
  <Menu
    mode="inline"
    theme="dark"
    :inline-collapsed="state.collapsed"
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
  >
    <MenuItem key="1">
      <template #icon>
        <PieChartOutlined />
      </template>
      <span>Option 1</span>
    </MenuItem>
    <MenuItem key="2">
      <template #icon>
        <DesktopOutlined />
      </template>
      <span>Option 2</span>
    </MenuItem>
    <MenuItem key="3">
      <template #icon>
        <InboxOutlined />
      </template>
      <span>Option 3</span>
    </MenuItem>
    <SubMenu key="sub1">
      <template #icon>
        <MailOutlined />
      </template>
      <template #title>Navigation One</template>
      <MenuItem key="5">Option 5</MenuItem>
      <MenuItem key="6">Option 6</MenuItem>
      <MenuItem key="7">Option 7</MenuItem>
      <MenuItem key="8">Option 8</MenuItem>
    </SubMenu>
    <SubMenu key="sub2">
      <template #icon>
        <AppstoreOutlined />
      </template>
      <template #title>Navigation Two</template>
      <MenuItem key="9">Option 9</MenuItem>
      <MenuItem key="10">Option 10</MenuItem>
      <SubMenu key="sub3" title="Submenu">
        <MenuItem key="11">Option 11</MenuItem>
        <MenuItem key="12">Option 12</MenuItem>
      </SubMenu>
    </SubMenu>
  </Menu>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { Menu, MenuItem, SubMenu } from 'ant-design-vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';

const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
});
</script>
<style></style>