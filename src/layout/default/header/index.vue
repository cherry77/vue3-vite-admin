<template>
  <LayoutHeader style="background: #fff; padding: 0">
    <span @click="toggleCollapsed">
      <MenuUnfoldOutlined class="trigger" v-if="getCollapsed" /> 
      <MenuFoldOutlined class="trigger" v-else />
    </span>
  </LayoutHeader>
</template>
<script lang="ts" setup>
import { ref, unref, computed } from 'vue'
import { LayoutHeader } from 'ant-design-vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const getCollapsed = computed(() => appStore.getCollapsed);

const toggleCollapsed = () => {
  appStore.setCollapsed(!unref(getCollapsed))
}
</script>
<style lang="less">
@import "./index.less";
.trigger{
  font-size: 20px;
}
</style>