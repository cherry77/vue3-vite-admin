<template>
  <input type="file" @change="handleChange" multiple accept="image/*" />
  <div class="container" style="width: 300px; height: 300px">
    <canvas
      id="canvas"
      ref="canvasRef"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
    ></canvas>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

// 设置默认canvas元素大小
const canvasDefaultSize = 300
const ratio = 2

const canvasRef = ref()

const dragAbout = {
  dragging: false, // 判断是否触发裁剪操作的全局变量
  startX: null,
  startY: null,
  trimPosition: {  // 裁剪框坐标信息
    startX: null,
    startY: null,
    width: null,
    height: null
  }
}
let tempPosition = {
  startX: null,
  startY: null,
  width: null,
  height: null
}

const state = reactive({
  ctx: null,
  image: null
})


const handleChange = (e) => {
  const files = Array.from(e.target.files)
  if (!files.length) {
    state.files = null
    return
  }
  // ...
  files.forEach(file => {
    fileInfo(file).then(image => {
      drawImage(image)
    })
  })
}

// 读取图片原始信息
const fileInfo = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      // 实例一个Image对象，为了获取宽高（下面预览图片时需要）
      let image = new Image()
      image.onload = function () {
        let proportion = image.width / image.height,
          scale = proportion > 1 ? canvasDefaultSize / image.width : canvasDefaultSize / image.height,
          canvasWidth = image.width * scale * ratio,
          canvasHeight = image.height * scale * ratio;
        resolve({
          scale, // 宽高缩放比例
          canvasWidth, // canvas画布宽
          canvasHeight, // canvas画布高
          imgBase: image, // 图片实例
          type: file.type, // 文件类型
          size: file.size, // 文件大小
          src: file.link, // 文件link
          trimPosition: null, // 截图框参数 
          rotate: 0, // 旋转度数
        });
      }
      image.src = e.target?.result // base64
      image.crossOrigin = 'Anonymous' // 解决跨域问题
    }
  })
}

// 绘制图片
const drawImage = (image) => {
  const { imgBase, trimPosition } = image
  // 获取canvas的上下文
  state.ctx = canvasRef.value.getContext('2d')
  // 清除画布
  state.ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  // 初始化画布的大小，获取等比例缩放后的canvas宽高尺寸
  let proportion = imgBase.width / imgBase.height,
    scale = proportion > 1 ? (canvasDefaultSize / imgBase.width) : (canvasDefaultSize / imgBase.height),
    canvasWidth = imgBase.width * scale * ratio,
    canvasHeight = imgBase.height * scale * ratio

  canvasRef.value.width = canvasWidth
  canvasRef.value.height = canvasHeight

  canvasRef.value.style.width = canvasWidth / ratio + 'px'
  canvasRef.value.style.height = canvasHeight / ratio + 'px'

  state.image = imgBase
  state.ctx.drawImage(imgBase, 0, 0, canvasRef.value.width, canvasRef.value.height)
}

// 鼠标移入点击触发绘制裁剪框
const onMouseDown = (e) => {
  dragAbout.dragging = true
  // 保存当前鼠标开始坐标, 一般坐标都会乘以个像素比
  dragAbout.startX = e.offsetX
  dragAbout.startX = e.offsetY
}

// 鼠标移动
// 记录坐标，计算裁剪宽高
const onMouseMove = (e) => {
  if(!dragAbout.dragging) return

  // 计算临时裁剪框的宽高
  let tempWidth = e.offsetX - dragAbout.startX,
      tempHeight = e.offsetY - dragAbout.startY

  // 调用绘制裁剪框的方法
  drawTrim(dragAbout.startX, dragAbout.startY, tempWidth, tempHeight, state.ctx)
}


// 鼠标放开
const onMouseUp = (e) => {
   // 保存相关裁剪信息
  if(dragAbout.dragging){
    dragAbout.trimPosition = tempPosition
  }
  dragAbout.dragging = false
}

// 绘制裁剪框方法
const drawTrim = (startX, startY, width, height, ctx) => {
  // 每一帧都需要清除画布
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  // 绘制蒙层
  ctx.save()
  ctx.fillStyle = 'rgba(0,0,0,.6)' // 蒙层颜色
  ctx.fillRect(0,0,canvasRef.value.width, canvasRef.value.height)

  // 目标图形和源图形内容重叠的部分的目标图形会被绘制
  ctx.globalCompositeOperation = 'source-atop'
  ctx.clearRect(startX, startY, width, height) // 裁剪选择框

   // 绘制8个边框像素点并保存坐标信息以及事件参数
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = '#fc178f'

  let size = 10 // 自定义像素点大小
  ctx.fillRect(startX - size / 2, startY - size / 2, size, size)
  ctx.fillRect(startX - size / 2 + width / 2, startY - size / 2, size, size)
  ctx.fillRect(startX - size / 2 + width, startY - size / 2, size, size)
  ctx.fillRect(startX - size / 2, startY - size / 2 + height / 2, size, size)
  ctx.fillRect(startX - size / 2 + width, startY - size / 2 + height / 2, size, size)
  ctx.fillRect(startX - size / 2, startY - size / 2 + height, size, size)
  ctx.fillRect(startX - size / 2 + width / 2, startY - size / 2 + height, size, size)
  ctx.fillRect(startX - size / 2 + width, startY - size / 2 + height, size, size)
  ctx.restore()

  // 再次使用drawImage将图片绘制到蒙层下方
  ctx.save();
  ctx.globalCompositeOperation = 'destination-over';
  ctx.drawImage(state.image, 0, 0, canvasRef.value.width, canvasRef.value.height);
  ctx.restore();

  tempPosition = {
    startX,
    startY,
    width,
    height
  }

}
</script>
<style></style>