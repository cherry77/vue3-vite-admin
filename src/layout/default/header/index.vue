<template>
  <LayoutHeader style="background: #fff; padding: 0">
    <span @click="toggleCollapsed">
      <Icon icon="mdi:menu-open" :size="28" rotate="180deg" v-if="getCollapsed"/>
      <Icon icon="mdi:menu-open" :size="28" v-else/>
    </span>
  </LayoutHeader>
</template>
<script lang="ts" setup>
import { unref, computed } from 'vue'
import { LayoutHeader } from 'ant-design-vue';
import { useAppStore } from '@/store/modules/app'
import Icon from '@/components/Icon/index';

const appStore = useAppStore()
const getCollapsed = computed(() => appStore.getCollapsed);

const toggleCollapsed = () => {
  appStore.setCollapsed(!unref(getCollapsed))
}
</script>
<style lang="less">
</style>