<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang='ts'>
import { defineProps, ref, onMounted } from 'vue';
const props = defineProps({
  imageInfo: {
    type: Object,
    default: () => {}
  }
})
const canvasRef = ref()
onMounted(() => {
  drawImage()
})
const drawImage = () => {
  console.log('------------', props.imageInfo)
  const ctx = canvasRef.value.getContext('2d')
}

</script>
<style scoped>
</style>