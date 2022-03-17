<template>
  <Table v-bind="$attrs" :columns="columns" :dataSource="dataSourceRef" />
</template>
<script lang="ts" setup>
import { ref, unref } from "vue";
import type { PropType } from 'vue';
import { Table } from 'ant-design-vue'
import { isFunction } from '@/utils/is'
const props = defineProps({
  dataSource: {
    type: Array,
    default: null // 这里一定要设置为null
  },
  columns: {
    type: Object,
    default: () => []
  },
  api: {
    type: Function as PropType<() => Promise<any>>
  }
})

const dataSourceRef = ref<any[]>([]); // 再定义一个变量存放table的最终数据dataSource

getDataSource()
function getDataSource() {
  const { dataSource, api } = unref(props) // unref()：是 val = isRef(val) ? val.value : val 的语法糖。
  // !api && dataSource && (dataSourceRef.value = dataSource)
  if(!api && dataSource){
    dataSourceRef.value = dataSource
  }else{
    fetch()
  }
}

async function fetch() {
  const { api } = unref(props)
  if (!api || !isFunction(api)) return

  try {
    const res = await api()
    dataSourceRef.value = res.data.result
  } catch (error) {
    console.log('-----', error)
  } finally {

  }
}


</script>
<style></style>