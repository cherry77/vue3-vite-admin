<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang='ts'>
import { defineProps, ref } from 'vue';
const props = defineProps({
  imageInfo: {
    type: Object,
    default: () => {}
  }
})
const canvasRef = ref()

drawImage()
function drawImage () {
  console.log('------------', props.imageInfo)
  const ctx = canvasRef.value.getContext('2d')
  console.log(ctx)
}
</script>
<style scoped>
</style>