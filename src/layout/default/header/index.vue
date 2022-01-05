<template>
  <LayoutHeader>
    <!-- <div :class="`${prefixCls}-left`">
      <AppLogo />
    </div>
    <div :class="`${prefixCls}-menu`">
      <LayoutMenu />
    </div> -->
  </LayoutHeader>
</template>
<script lang="ts" setup>
  // import { computed } from 'vue';
  import { LayoutHeader } from 'ant-design-vue';
  // import { useDesign } from '@/hooks/web/useDesign';
  // import { AppLogo } from '@/components/Application'
  // import LayoutMenu from '../menu/index.vue';

  // const { prefixCls } = useDesign('layout-header')

  // const getHeaderClass = computed(() => {
  //   // const theme = unref(getHeaderTheme);
  //   return [
  //     prefixCls,
  //   ];
  // });
</script>
<style lang="less">
  @import './index.less';
</style>