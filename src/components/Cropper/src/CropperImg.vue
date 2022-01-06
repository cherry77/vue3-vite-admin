<template>
  <div style="width: 300px; height: 300px">
    <canvas ref="canvasRef" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"></canvas>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch } from 'vue';
const props = defineProps({
  image: {
    type: HTMLImageElement,
    required: false
  }
})
let ctx: CanvasRenderingContext2D | null = null
const canvasRef = ref()
// 设置默认canvas元素大小
const canvasDefaultSize = 300
const ratio = 2
// 是否处于拖拽中
let dragging:boolean = false, 
    startX:number = 0, 
    startY:number = 0

watch(() => props.image, () => {
  drawImage()
})

// 在canvas中绘制图片 ctx.drawImage(image,dx,dy,dw,dh) 
// image：需要绘制的img图片 dx,dy：绘制的img图片在canvas中的坐标(x,y) dw,dh：绘制的img图片在canvas中的大小(w,h)宽高
const drawImage = () => {
  const { image } = props
  // 获取canvas的上下文
  ctx = canvasRef.value.getContext('2d')
  // 清除画布
  ctx?.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  let proportion: number = image.width / image.height,
      scale: number = proportion > 1 ? canvasDefaultSize / image.width : canvasDefaultSize / image.height, // 缩放比例
      canvasWidth: number = image.width * scale * ratio,
      canvasHeight: number = image.height * scale * ratio

  canvasRef.value.width = canvasWidth
  canvasRef.value.height = canvasHeight

  canvasRef.value.style.width = canvasWidth / ratio + 'px'
  canvasRef.value.style.height = canvasHeight / ratio + 'px'

  ctx?.drawImage(image, 0, 0, canvasWidth, canvasHeight)
}

// 绘制剪裁区
const drawTrimArea = (startX: number, startY: number, tempWidth: number, tempHeight: number, ctx: CanvasRenderingContext2D | null ) => {
  
}

// offset意为偏移量，是被点击的元素距左上角为参考原点的长度
// page为页面的意思，页面的高度一般情况client游览器显示区域装不下，所以会出现垂直滚动条。
const onMouseDown = (e: MouseEvent) => {
  dragging = true
  // 记录鼠标按下起始坐标
  startX = e.offsetX
  startY = e.offsetY
}

const onMouseMove = (e: MouseEvent) => {
  if(!dragging) return

  const tempWidth = e.offsetX - startX
  const tempHeight = e.offsetY - startY

  drawTrimArea(startX, startY, tempWidth, tempHeight, ctx)
}

const onMouseUp = () => {
  
}

</script>
<style scoped>
</style>