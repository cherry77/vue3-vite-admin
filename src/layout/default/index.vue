<template>
  <Layout>
    <Layout>
      <LayoutSideBar/>
      <Layout>
        <LayoutMultipleHeader />
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script setup lang='ts'>
import { Layout } from 'ant-design-vue';
import LayoutSideBar from './sider/index.vue';
</script>
<style scoped>
</style>