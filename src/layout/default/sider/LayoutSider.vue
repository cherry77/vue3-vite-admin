<template>
  <div :style="getHiddenDomStyle"></div>
  <LayoutSider
    class="layout-sidebar layout-sidebar--fixed"
    breakpoint="lg"
    :width="siderWidth"
    :collapsedWidth="48"
    :trigger="null"
    collapsible
    v-model:collapsed="getCollapsed"
  >
    <LayoutMenu />
  </LayoutSider>
</template>

<script setup lang='ts'>
import { computed, CSSProperties, ref } from 'vue'
import { LayoutSider } from 'ant-design-vue'
import LayoutMenu from './../menu/index.vue';

import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
const getCollapsed = computed(() => appStore.getCollapsed);

const maxWidth = '220px'
const minWidth = '48px'
const siderWidth = computed(() => getCollapsed.value ? minWidth : maxWidth)
const getHiddenDomStyle = computed((): CSSProperties => {
  return {
    width: siderWidth.value,
    overflow: 'hidden',
    flex: `0 0 ${siderWidth.value}`,
    maxWidth: siderWidth.value,
    minWidth: siderWidth.value,
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