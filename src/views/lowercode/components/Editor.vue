<template>
  <div id="editor">
    <component v-for="item in components" :key="item.component" :is="item.component" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useVisualStore } from '@/store/modules/visual'
const visualStore = useVisualStore()
const components = computed(() => visualStore.getComponents)
</script>
<style>
#editor {
  position: relative;
  width: 1200px;
  height: 740px;
  background-color: bisque;
}
</style>