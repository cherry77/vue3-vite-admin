<template>
  <div :style="getHiddenDomStyle"></div>
  <LayoutSider class="layout-sidebar layout-sidebar--fixed" breakpoint="lg" :width="width">
    <LayoutMenu />
  </LayoutSider>
</template>

<script setup lang='ts'>
import { computed, CSSProperties } from 'vue'
import { LayoutSider } from 'ant-design-vue'
import LayoutMenu from './../menu/index.vue';

const width = '220px'
const getHiddenDomStyle = computed((): CSSProperties => {
  return {
    width: width,
    overflow: 'hidden',
    flex: `0 0 ${width}`,
    maxWidth: width,
    minWidth: width,
    transition: 'all 0.2s',
  };
});
</script>
<style lang="less">
.layout-sidebar {
  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }
}
</style>