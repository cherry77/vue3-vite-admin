<template>
  <input type="file" @change="handleChange" accept="image/*">
  <CropperImg :image="data.image"/>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import CropperImg from './CropperImg.vue'
const data = reactive({
  image: null
})

const handleChange = (e) => {
  const files = Array.from(e.target.files)
  // 读取文件
  files.forEach(file => {
    fileInfo(file).then(image => {
      data.image = image
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
        // resolve({
        //   width: image.width,
        //   height: image.height
        // })
        resolve(image)
      }
      image.src = e.target?.result  
    }
  })
}
</script>
<style scoped>
</style>