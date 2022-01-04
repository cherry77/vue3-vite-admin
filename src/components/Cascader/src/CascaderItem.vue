<template>
  <div class="cascader-item">
    <span :class="['tag', {'tag-selected': selectedItems[level] && selectedItems[level].value === item.value}]" v-for="(item, index) in options" :key="index" @click="handleSelect(item)">{{item.label}}</span>
  </div>
  <div v-if="children && children.length">
    <CascaderItem :options="children" :selectedItems="selectedItems" :level="level + 1" @change="handleChange"></CascaderItem>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps(['options', 'selectedItems', 'level'])
const emit = defineEmits(['change'])

const children = computed(() => {
  return props.selectedItems[props.level] && props.selectedItems[props.level].children;
})

const handleSelect = (item: any) => {
  emit("change", {level: props.level, item: item});
}

const handleChange = (newValue: any) => {
  emit("change", newValue);
}
</script>
<style scoped>
  .cascader-item{
    display: flex;
  }
  .tag{
    display: inline-block;
    border: 1px solid rgb(235, 81, 81);
    padding: 2px 5px;
    margin: 5px;
    cursor: pointer;
  }
  .tag:hover{
    background-color: rgb(235, 81, 81);
    color: #fff;
    opacity: .8;
  }
  .tag-selected{
    background-color: rgb(235, 81, 81);
    color: #fff;
  }
</style>