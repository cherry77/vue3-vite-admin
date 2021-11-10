<template>
  <Layout.Header :class="getHeaderClass">
    <!-- left start -->
    <div :class="`${prefixCls}-left`">
      <!-- logo -->
      <AppLogo />
    </div>
    <!-- left end -->

    <!-- menu start -->
    <div :class="`${prefixCls}-menu`" v-if="getShowTopMenu">
      <LayoutMenu />
    </div>
    <!-- menu-end -->
  </Layout.Header>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { AppLogo } from '@/components/Application'
  import LayoutMenu from '../menu/index.vue';

  const { prefixCls } = useDesign('layout-header')

  const getHeaderClass = computed(() => {
    // const theme = unref(getHeaderTheme);
    return [
      prefixCls,
      // {
      //   [`${prefixCls}--fixed`]: props.fixed,
      //   [`${prefixCls}--mobile`]: unref(getIsMobile),
      //   [`${prefixCls}--${theme}`]: theme,
      // },
    ];
  });

  const getShowTopMenu = false
</script>
<style lang="less">
  @import './index.less';
</style>