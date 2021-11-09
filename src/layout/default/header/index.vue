<template>
  <Layout.Header>
    <!-- left start -->
    <div :class="`${prefixCls}-left`">
      1111111111
    </div>
    <!-- left end -->
  </Layout.Header>
</template>
<script lang="ts" setup>
  import { Layout } from 'ant-design-vue';
  import { useDesign } from '@/hooks/web/useDesign';

  const { prefixCls } = useDesign('layout-header')
</script>
<style lang="less">
  @import './index.less';
</style>