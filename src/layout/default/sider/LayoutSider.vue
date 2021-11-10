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
    :theme="'dark'"
    @breakpoint="() => {}"
    :trigger="null"
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
  ];
});
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sideBar';

  .@{prefix-cls} {
    z-index: @layout-sider-fixed-z-index;

    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    }

    &--mix {
      top: @header-height;
      height: calc(100% - @header-height);
    }

    &.ant-layout-sider-dark {
      background-color: @sider-dark-bg-color;

      .ant-layout-sider-trigger {
        color: darken(@white, 25%);
        background-color: @trigger-dark-bg-color;

        &:hover {
          color: @white;
          background-color: @trigger-dark-hover-bg-color;
        }
      }
    }

    &:not(.ant-layout-sider-dark) {
      // box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

      .ant-layout-sider-trigger {
        color: @text-color-base;
        border-top: 1px solid @border-color-light;
      }
    }

    .ant-layout-sider-zero-width-trigger {
      top: 40%;
      z-index: 10;
    }

    & .ant-layout-sider-trigger {
      height: 36px;
      line-height: 36px;
    }
  }
</style>