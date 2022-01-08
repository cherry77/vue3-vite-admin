<template>
  <Cascader :options="options" v-model="selectedItems" />
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { Cascader } from '@/components/Cascader'
import { options } from '@/components/Cascader/options'

const selectedItems = ref([])

watch(selectedItems, () => {
  console.log('---------', selectedItems.value)
})
</script>
<style scoped>
</style>