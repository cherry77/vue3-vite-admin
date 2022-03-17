<template>
  <BasicTable :columns="columns" :api="getTableData"></BasicTable>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { BasicTable } from '@/components/Table'
import { getBasicColumns, getBasicData } from './tableData'
import { getTableData } from '@/api/sys/menu'

const columns = getBasicColumns()
const dataSource = getBasicData()
</script>
<style scoped>
</style>