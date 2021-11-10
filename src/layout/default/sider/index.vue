<template>
  <Sider :class="prefixCls"/>
</template>
<script lang="ts" setup>
  import Sider from './LayoutSider.vue'
  import { useDesign } from '@/hooks/web/useDesign';

  const { prefixCls } = useDesign('layout-sider-wrapper');
  
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sider-wrapper';

  .@{prefix-cls} {
    .ant-drawer-body {
      height: 100vh;
      padding: 0;
    }

    .ant-drawer-header-no-title {
      display: none;
    }
  }
</style>