<template>
  <input type="file" @change="handleChange" accept="image/*">
  <CropperImg v-show="state.imageUpload" :image="state.imageUpload"/>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import CropperImg from './CropperImg.vue'
const state = reactive({
  imageUpload: null
})

const handleChange = (e) => {
  const files = Array.from(e.target.files)
  if(!files.length){
    // 释放上传系统存储当前值，避免相同文件不触发onchange事件
    state.imageUpload = null
    return
  }
  // 上传规则校验（比如图片格式，图片大小限制等等)

  // 读取文件
  readFilesInfo(files)
}

function readFilesInfo (files) {
  files.forEach(file => {
    fileInfo(file).then(image => {
      state.imageUpload = image
    })
  })
}

function fileInfo (file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(e){
      let image = new Image()
      image.onload = function(){
        // resolve({
        //   width: image.width,
        //   height: image.height
        // })
        resolve(image)
      }
      image.src = e.target?.result  // base64
    }
  })
}
</script>
<style scoped>
</style>