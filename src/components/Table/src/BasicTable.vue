<template>
  <Table v-bind="getBindValues" @change="handleTableChange" />
</template>
<script lang="ts" setup>
import { computed, unref, useAttrs, toRaw } from "vue";
import type { PropType } from 'vue';
import { Table } from 'ant-design-vue'
import useDataSource from './hooks/useDataSource'
import usePagination from './hooks/usePagination'

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
  },
  pagination: {
    type: Object,
    default: () => { }
  }
})

// page
const { getPaginationInfo, setPagination } = usePagination(props)
// 处理table数据
const { dataSourceRef, handleTableChange } = useDataSource(props, { getPaginationInfo, setPagination })
const getBindValues = computed(() => {
  return {
    ...useAttrs(),
    columns: props.columns,
    dataSource: unref(dataSourceRef),
    pagination: toRaw(unref(getPaginationInfo))
  }
})

</script>
<style></style>