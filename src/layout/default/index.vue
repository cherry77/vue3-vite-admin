<template>
  <Layout :class="prefixCls">
    <!-- <LayoutFeature /> -->
    <LayoutHeader />
    <Layout :class="[layoutClass]">
      <LayoutSideBar/>
      <Layout :class="`${prefixCls}-main`">
        <!-- <LayoutMultipleHeader /> -->
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script setup lang='ts'>
import { computed, unref } from 'vue';
import { Layout } from 'ant-design-vue';
import LayoutFeature from './feature/index.vue';
import LayoutHeader from './header/index.vue';
import LayoutSideBar from './sider/index.vue';
import LayoutContent from './content/index.vue';
import LayoutFooter from './footer/index.vue';

import { useDesign } from '@/hooks/web/useDesign';

const { prefixCls } = useDesign('default-layout')

const layoutClass = computed(() => {
  let cls: string[] = ['ant-layout'];
  // if (unref(getIsMixSidebar) || unref(getShowMenu)) {
  //   cls.push('ant-layout-has-sider');
  // }
  return cls;
});

</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }
</style>