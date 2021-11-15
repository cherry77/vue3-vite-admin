<template>
  <AppLogo :class="getLogoClass" />
  <BasicMenu
    mode="inline"
    theme="dark"
    :inline-collapsed="state.collapsed"
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
  />
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
import { AppLogo } from '@/components/Application';
import BasicMenu from '@/components/Menu/BasicMenu.vue'

const state = reactive({
  collapsed: false,
  selectedKeys: ['dashboard'],
  openKeys: [],
  preOpenKeys: ['dashboard'],
});
const { prefixCls } = useDesign('layout-menu');
const getLogoClass = computed(() => {
  return [
    `${prefixCls}-logo`,
    // unref(getComputedMenuTheme),
    // {
    //   [`${prefixCls}--mobile`]: unref(getIsMobile),
    // },
  ];
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-layout-menu";
@logo-prefix-cls: ~"@{namespace}-app-logo";

.@{prefix-cls} {
  &-logo {
    height: @header-height;
    padding: 10px 4px 10px 10px;

    // img {
    //   width: @logo-width;
    //   height: @logo-width;
    // }
  }

  &--mobile {
    .@{logo-prefix-cls} {
      &__title {
        opacity: 100%;
      }
    }
  }
}
</style>
