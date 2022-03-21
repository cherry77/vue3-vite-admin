<template>
  <Table v-bind="getBindValues" @change="handleTableChange" />
</template>
<script lang="ts" setup>
import { computed, unref, useAttrs, toRaw } from "vue";
import type { PropType } from "vue";
import { Table } from "ant-design-vue";
import useDataSource from "./hooks/useDataSource";
import usePagination from "./hooks/usePagination";
import useLoading from "./hooks/useLoading";

const props = defineProps({
  dataSource: {
    type: Array,
    default: null, // 这里一定要设置为null,不能是[],用来判断是否传入dataSource
  },
  columns: {
    type: Object,
    default: () => [],
  },
  api: {
    type: Function as PropType<() => Promise<any>>,
  },
  pagination: {
    type: Object,
    default: () => { },
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['reload'])
const { setLoading, getLoading } = useLoading(props.loading);
// 处理分页
const { getPaginationInfo, setPagination } = usePagination(props);
// 处理table数据
const { dataSourceRef, handleTableChange, reload } = useDataSource(props, {
  getPaginationInfo,
  setLoading,
  setPagination,
});
const getBindValues = computed(() => {
  return {
    ...useAttrs(),
    ...unref(props),
    dataSource: unref(dataSourceRef),
    pagination: toRaw(unref(getPaginationInfo)),
    loading: unref(getLoading)
  };
});
emit('reload', reload)
</script>
<style></style>
