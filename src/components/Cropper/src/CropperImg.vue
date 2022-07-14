<template>
  <div style="width: 500px; height: 300px; border: 1px solid red">
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
const borderSize = 30 // 节点大小
// 是否处于拖拽中
let dragging:boolean = false, // 判断canvas图层鼠标事件结束与否
    draggingTrim:boolean = false, // 判断裁剪框鼠标事件结束与否
    trimPosition = {
      startX: 0, 
      startY: 0,
      width: 0,
      height: 0,
    },
    // 点击移动裁剪框时的鼠标位置参数
    movePosition = {
      moveStartX: null,
      moveStartY: null
    }
    borderArr = [], // 裁剪框的边框坐标和节点坐标
    borderOption = null // 裁剪框边框事件参数

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
      scale: number = proportion > 1 ? (canvasDefaultSize / image.width) : (canvasDefaultSize / image.height), // 缩放比例
      canvasWidth: number = image.width * scale * ratio,
      canvasHeight: number = image.height * scale * ratio

  canvasRef.value.width = canvasWidth
  canvasRef.value.height = canvasHeight

  canvasRef.value.style.width = canvasWidth / ratio + 'px'
  canvasRef.value.style.height = canvasHeight / ratio + 'px'

  // 绘制图片
  ctx?.drawImage(image, 0, 0, canvasWidth, canvasHeight)
}

// offset意为偏移量，是被点击的元素距左上角为参考原点的长度
// page为页面的意思，页面的高度一般情况client游览器显示区域装不下，所以会出现垂直滚动条。
const onMouseDown = (e: MouseEvent) => {
  // 点击时表示触发裁剪操作
  dragging = true
  // 记录鼠标按下起始坐标, 一般坐标都会乘以个像素比
  trimPosition.startX = getOffset(e.offsetX)
  trimPosition.startY = getOffset(e.offsetY)
  if(borderOption){
    draggingTrim = true
    movePosition.moveStartX = getOffset(e.offsetX)
    movePosition.moveStartY = getOffset(e.offsetY)
  }
}

const onMouseMove = (e: MouseEvent) => {
  let currentX = getOffset(e.offsetX), currentY = getOffset(e.offsetY)
  // 计算临时裁剪框的宽高
  trimPosition.width =  currentX - trimPosition.startX
  trimPosition.height = currentY - trimPosition.startY

  // 移入裁剪框的相关操作
  moveTrim(currentX, currentY, ctx)
  if(!dragging || draggingTrim) return

  // 绘制剪裁框
  drawTrim(trimPosition.startX, trimPosition.startY, trimPosition.width, trimPosition.height, ctx)
}

// 移出/松开事件
const onMouseUp = () => {
  // 保存相关裁剪选择框信息
  if (dragging) { 
    // saveTrimInfo()
    // 保存裁剪边框节点的坐标
    saveBorderArr(borderArr, borderSize, trimPosition)
    // ctx.fillStyle = '#ff6';
    // const fillIndex = 0
    // ctx.fillRect(borderArr[fillIndex].x, borderArr[fillIndex].y, borderArr[fillIndex].width, borderArr[fillIndex].height);
  }
  dragging = false
  draggingTrim = false
}
// 绘制剪裁区
const drawTrim = (startX: number, startY: number, width: number, height: number, ctx: CanvasRenderingContext2D | null ) => {
  // 每一帧都需要清除画布
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  // 绘制蒙层
  ctx.save()
  ctx.fillStyle = 'rgba(0,0,0,.6)'
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  // 裁剪选择框
  ctx.globalCompositeOperation = 'source-atop'
  ctx.clearRect(startX, startY, width, height)

  // 绘制8个边框像素点并保存坐标信息以及事件参数
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = '#fc178f'
  const size = borderSize // 像素点大小
  ctx.fillRect(startX - size / 2, startY - size / 2, size, size);
  ctx.fillRect(startX - size / 2 + width / 2, startY - size / 2, size, size);
  ctx.fillRect(startX - size / 2 + width, startY - size / 2, size, size);
  ctx.fillRect(startX - size / 2, startY - size / 2 + height / 2, size, size);
  ctx.fillRect(startX - size / 2 + width, startY - size / 2 + height / 2, size, size);
  ctx.fillRect(startX - size / 2, startY - size / 2 + height, size, size);
  ctx.fillRect(startX - size / 2 + width / 2, startY - size / 2 + height, size, size);
  ctx.fillRect(startX - size / 2 + width, startY - size / 2 + height, size, size);
  ctx.restore();
  // 绘制底图, 再次使用drawImage将图片绘制到蒙层下方
  ctx.save()
  ctx.globalCompositeOperation = 'destination-over'
  ctx.drawImage(props.image, 0, 0, canvasRef.value.width, canvasRef.value.height)
  ctx.restore()
}
// 操作裁剪框
const moveTrim = (currentX, currentY, ctx) => {
  const { moveStartX, moveStartY } = movePosition
  // 是否存在裁剪框
  if (borderArr.length && !draggingTrim) {
    let flag = false
    ctx.beginPath();
    for(let i = 0; i < borderArr.length; i++){
      ctx.rect(borderArr[i].x, borderArr[i].y, borderArr[i].width, borderArr[i].height);
      if(ctx.isPointInPath(currentX, currentY)){
        switch (borderArr[i].index) {
            case 1:
                canvasRef.value.style.cursor = 'move'; break;
            case 2:
                canvasRef.value.style.cursor = 'ns-resize'; break;
            case 3:
                canvasRef.value.style.cursor = 'ew-resize'; break;
            case 4:
                canvasRef.value.style.cursor = 'nwse-resize'; break;
            case 5:
                canvasRef.value.style.cursor = 'nesw-resize'; break;
            default:
                break;
        }
        borderOption = borderArr[i].option
        flag = true
        break
      }
    }
    ctx.closePath();
    if (!flag) {
      canvasRef.value.style.cursor = 'default';
      borderOption = null;
    }
  }

  // 正在操作裁剪框时
  if(draggingTrim){
    if(borderOption == 1){
      const x = 
    }
  }

}
// 保存裁剪边框节点的坐标
const saveBorderArr = (borderArr, borderSize, trimPosition) => {
  let { startX, startY, width, height } = trimPosition,
  halfBorderSize = borderSize / 2;
  // move, n北s南e东w西, index为样式, option为操作
  borderArr[0] = { x: startX + halfBorderSize, y: startY + halfBorderSize, width: width - borderSize, height: height - borderSize, index: 1, option: 1 };
  // n
  borderArr[1] = { x: startX + halfBorderSize, y: startY, width: width - borderSize, height: halfBorderSize, index: 2, option: 2 };
  borderArr[2] = { x: startX - halfBorderSize + width / 2, y: startY - halfBorderSize, width: borderSize, height: halfBorderSize, index: 2, option: 2 };
  // s
  borderArr[3] = { x: startX + halfBorderSize, y: startY - halfBorderSize + height, width: width - borderSize, height: halfBorderSize, index: 2, option: 3 };
  borderArr[4] = { x: startX - halfBorderSize + width / 2, y: startY + height, width: borderSize, height: halfBorderSize, index: 2, option: 3 }
  // w
  borderArr[5] = { x: startX , y: startY + halfBorderSize, width: halfBorderSize, height: height - borderSize, index: 3, option: 4 };
  borderArr[6] = { x: startX - halfBorderSize, y: startY - halfBorderSize + height / 2, width: halfBorderSize, height: borderSize, index: 3, option: 4 };
  // e
  borderArr[7] = { x: startX - halfBorderSize + width, y: startY + halfBorderSize, width: halfBorderSize, height: height - borderSize, index: 3, option: 5 };
  borderArr[8] = { x: startX + width, y: startY - halfBorderSize + height / 2, width: halfBorderSize, height: borderSize, index: 3, option: 5 }
  // nw
  borderArr[9] = { x: startX - halfBorderSize, y: startY - halfBorderSize, width: borderSize, height: borderSize, index: 4, option: 6 }
  // se
  borderArr[10] = { x: startX - halfBorderSize + width, y: startY - halfBorderSize + height, width: borderSize, height: borderSize, index: 4, option: 7 }
  // ne
  borderArr[11] = { x: startX - halfBorderSize + width, y: startY - halfBorderSize, width: borderSize, height: borderSize, index: 5, option: 8 }
  // sw
  borderArr[12] = { x: startX - halfBorderSize, y: startY - halfBorderSize + height, width: borderSize, height: borderSize, index: 5, option: 9 }
}

const getOffset = (value) => {
  return value * ratio
}

</script>
<style scoped>
</style>