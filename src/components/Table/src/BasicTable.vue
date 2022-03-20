<template>
  <Table v-bind="getBindValues" />
</template>
<script lang="ts" setup>
import { computed, unref, useAttrs } from "vue";
import type { PropType } from 'vue';
import { Table } from 'ant-design-vue'
import useDataSource from './hooks/useDataSource'

const props = defineProps({
  dataSource: {
    type: Array,
    default: null // 这里一定要设置为null,不能是[],用来判断是否传入dataSource
  },
  columns: {
    type: Object,
    default: () => []
  },
  api: {
    type: Function as PropType<() => Promise<any>>
  }
})

// 处理table数据
// const { dataSourceRef } = useDataSource(props)
const { dataSourceRef } = useDataSource({
  api: props.api,
  datasource: props.dataSource
})

const getBindValues = computed(() => {
  const attrs = useAttrs()
  return {
    ...attrs,
    columns: props.columns,
    dataSource: unref(dataSourceRef)
  }
})
</script>
<style></style>