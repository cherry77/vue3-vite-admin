<template>
  <Table :columns="columns" :dataSource="dataSource"/>
</template>
<script lang="ts" setup>
import { Table } from 'ant-design-vue'
const props = defineProps({
  dataSource: {
    type: Object
  },
  columns: {
    type: Object
  }
})
</script>
<style></style>