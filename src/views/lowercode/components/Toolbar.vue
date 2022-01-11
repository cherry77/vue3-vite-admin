<template>
  <div class="toolbar">
    <Button class="mr-3">撤销</Button>
    <Button class="mr-3">重做</Button>
    <Button class="mr-3">插入图片</Button>
    <Button class="mr-3">预览</Button>
    <Button class="mr-3">保存</Button>
  </div>
</template>
<script lang="ts" setup>
import { Button } from 'ant-design-vue'
</script>
<style lang="less">
  .toolbar{
    padding: 15px 10px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    height: 64px;
    .ant-btn{
      font-size: 12px;
    }
  }
</style>