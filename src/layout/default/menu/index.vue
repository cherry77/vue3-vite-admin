<template>
  <AppLogo :class="getLogoClass" />
  <BasicMenu mode="inline"/>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
import { AppLogo } from '@/components/Application';
import { BasicMenu } from '@/components/Menu';

const { prefixCls } = useDesign('layout-menu');
const getLogoClass = computed(() => {
  return [
    `${prefixCls}-logo`,
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
