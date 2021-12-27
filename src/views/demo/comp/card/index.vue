<template>
  <div class="list">
  <div class="list-item">
    <div class="list-item-icon-wrapper">
      <SwitcherOutlined class="icon"/>名单收集
    </div>
    <div class="list-item-content">
      <h4 class="list-item-title">用于活动名单收集，类似于Excel表格</h4>
      <p class="list-item-desc">如管理层收集优秀员工名单</p>
    </div>
  </div>
  <div class="list-item">
    <div class="list-item-icon-wrapper">
      <UserOutlined class="icon"/>个人报名
    </div>
    <div class="list-item-content">
      <h4 class="list-item-title">用于个人报名收集，可导出填写人信息</h4>
      <p class="list-item-desc">如公司旅游等...</p>
    </div>
  </div>
  <div class="list-item">
    <div class="list-item-icon-wrapper">
      <PieChartOutlined class="icon"/>个人调研
    </div>
    <div class="list-item-content">
      <h4 class="list-item-title">用于个人意见调研</h4>
    </div>
  </div>
</div>
</template>

<script setup lang='ts'>
import { SwitcherOutlined, UserOutlined, PieChartOutlined } from "@ant-design/icons-vue";
</script>
<style scoped>
  .list-item{
    display: flex;
    flex: 1;
    align-items: flex-start;
    padding: 15px;
  }
  .list-item-icon-wrapper{
    margin-right: 20px;
    color: #1890ff;
    cursor: pointer;
  }
  .list-item-icon-wrapper .icon{
    font-size: 20px;
    margin-right: 5px;
  }
  .list-item-icon-wrapper:hover{
    color: #40a9ff
  }
  .list-item-content{
    flex: 1 0;
  }
  .list-item-title{
    margin-bottom: 4px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }
  .list-item-desc{
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }
</style>