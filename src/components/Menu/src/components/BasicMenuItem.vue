<template>
  <MenuItem :key="item.path">
    <template #icon>
      <PieChartOutlined />
    </template>
    <span>{{item.name}}</span>
  </MenuItem>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { MenuItem, SubMenu } from 'ant-design-vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    MenuItem, SubMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  setup() {}
})
</script>
<style></style>