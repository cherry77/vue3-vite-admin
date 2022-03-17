<template>
  <BasicTable :columns="columns" :dataSource="dataSource" />
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { BasicTable } from '@/components/Table'
import { getBasicColumns } from './tableData'
import { getTableData } from '@/api/sys/menu'

const columns = getBasicColumns()
const dataSource = ref([])

getData()
async function getData () {
  const data = await getTableData()
  dataSource.value = data.data.result
}
</script>
<style scoped>
</style>