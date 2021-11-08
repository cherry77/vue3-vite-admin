<template>
  <Layout>
    <LayoutFeature />
    <LayoutHeader />
    <Layout>
      <LayoutSideBar/>
      <Layout>
        <!-- <LayoutMultipleHeader /> -->
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script setup lang='ts'>
import { Layout } from 'ant-design-vue';
import LayoutFeature from './feature/index.vue';
import LayoutHeader from './header/index.vue';
import LayoutSideBar from './sider/index.vue';
import LayoutContent from './content/index.vue';
import LayoutFooter from './footer/index.vue';
</script>
<style scoped>
</style>