<template>
  <div :class="getAppLogoClass" @click="goHome">Logo</div>
</template>

<script setup lang='ts'>
  import { computed } from 'vue';
  import { useDesign } from '@/hooks/web/useDesign';

  const { prefixCls } = useDesign('app-logo');
  const getAppLogoClass = computed(() => [prefixCls]);

  const goHome = () => {

  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;

    justify-content: center;
    color: #fff;
    font-weight: 700;

    &.light {
      border-bottom: 1px solid @border-color-base;
    }

    &.collapsed-show-title {
      padding-left: 20px;
    }

    &.light &__title {
      color: @primary-color;
    }

    &.dark &__title {
      color: @white;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
      line-height: normal;
    }
  }
</style>