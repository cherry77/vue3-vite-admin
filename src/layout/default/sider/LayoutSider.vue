<template>
  <Layout.Sider
    class="Sider"
    v-show="showClassSideBarRef"
    ref="sideRef"
    breakpoint="lg"
    collapsible
    :class="getSiderClass"
    :width="210"
    :collapsed="false"
    :collapsedWidth="48"
    :theme="'light'"
    @breakpoint="() => {}"
  >
      <!-- :trigger="getTrigger"
    v-bind="getTriggerAttr" -->
    <!-- <template #trigger v-if="getShowTrigger">
      <LayoutTrigger />
    </template>
    <LayoutMenu :theme="getMenuTheme" :menuMode="getMode" :splitType="getSplitType" />
    <DragBar ref="dragBarRef" /> -->
    <LayoutMenu />
  </Layout.Sider>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { Layout } from 'ant-design-vue'
import { useDesign } from '@/hooks/web/useDesign';
import LayoutMenu from './../menu/index.vue';

const { prefixCls } = useDesign('layout-sideBar');

const showClassSideBarRef = computed(() => {
  // return unref(getSplit) ? !unref(getMenuHidden) : true;
  return true;
});

const getSiderClass = computed(() => {
  return [
    prefixCls,
    // {
    //   [`${prefixCls}--fixed`]: unref(getMenuFixed),
    //   [`${prefixCls}--mix`]: unref(getIsMixMode) && !unref(getIsMobile),
    // },
  ];
});
</script>
<style scoped>
</style>