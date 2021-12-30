<template>
  <input type="file" @change="handleChange" accept="image/*">
  <CropperImg :imageInfo="data.imageInfo"/>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import CropperImg from './CropperImg.vue'
const data = reactive({
  imageInfo: {}
})

const handleChange = (e) => {
  const files = Array.from(e.target.files)
  // 读取文件
  files.forEach(file => {
    fileInfo(file).then(imageInfo => {
      data.imageInfo = imageInfo
      // drawImage(imageInfo)
    })
  })
  
}

const fileInfo = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(e){
      let image = new Image()
      image.onload = function(){
        resolve({
          width: image.width,
          height: image.height
        })
      }
      image.src = e.target?.result  
    }
  })
}
</script>
<style scoped>
</style>