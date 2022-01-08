<template>
  <span :style="{ fontSize: `${size}px`, color }">
    <span :class="[$attrs.class, 'iconify', 'm-iconify']" :data-icon="icon"  :data-rotate="rotate"></span>
  </span>
</template>

<script lang="ts" setup>
defineProps({
  icon: { type: String, required: true },
  size: { type: Number, default: 18 },
  color: { type: String, default: '#666' },
  rotate: { type: String }
})
</script>

<style scoped>
.m-iconify {
  display: inline-block;
  vertical-align: middle;
}
</style>