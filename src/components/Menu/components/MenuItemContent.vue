<template>
  <span>
    <PieChartOutlined />
    {{ item.name }}
  </span>
  <span></span>
</template>
<script lang="ts">
import { defineComponent } from "vue";
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
  props: {
    item: {
      type: Object,
      default: () => { }
    },
  },
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },
  setup(props){
  }
})
</script>
<style></style>