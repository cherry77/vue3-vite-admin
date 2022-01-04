<template>
  <CascaderItem :options="options" :selectedItems="selectedItems" :level="0" @change="handleChange"></CascaderItem>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CascaderItem from './CascaderItem.vue'

defineProps(['options', 'modelValue'])
const emit = defineEmits(['on-change', 'update:modelValue'])

const selectedItems = ref([])
const handleChange = (newValue: any) => {
  selectedItems.value.splice(newValue.level, 1, newValue.item); // 替换当前点击位置信息
  selectedItems.value.splice(newValue.level + 1); // 删除当前点击位置之后的数据
  const values = selectedItems.value.map(item => item.value)

  emit('on-change', values)
  emit('update:modelValue', values)
}
</script>

<style scoped>
</style>