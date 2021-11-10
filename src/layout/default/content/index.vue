<template>
  <PageLayout :class="[prefixCls]"/>
</template>
<script lang="ts" setup>
import PageLayout from '@/layout/page/index.vue';
import { useDesign } from '@/hooks/web/useDesign'
const { prefixCls } = useDesign('layout-content');
</script>
<style></style>