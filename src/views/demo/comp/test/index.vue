<template>
  <BasicTable @reload="reload" :columns="columns" :api="demoListApi"></BasicTable>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { BasicTable } from '@/components/Table'
import { getBasicColumns, getBasicData } from './tableData'
import { demoListApi } from '@/api/demo/table'

const columns = getBasicColumns()
function reload(val){
  console.log(val)
}
</script>
<style scoped>
</style>