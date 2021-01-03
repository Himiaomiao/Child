<template>
  <div>
    <el-row>
      <!--学校禁忌食物-->
      <el-col :span="12">
        <el-card class="box-card" shadow="always">
          <!--食物禁忌卡片头部-->
          <div slot="header" class="clearfix">
            <span>禁忌食物</span>
          </div>
          <!--食物禁忌渲染列表-->
          <div v-for="(item, index) in text" :key="index" class="text item">
            {{ item }}
          </div>
        </el-card>
      </el-col>
      <!--学校口味禁忌-->
      <el-col :span="12">
        <el-card class="box-card" shadow="always">
          <!--口味禁忌卡片头部-->
          <div slot="header" class="clearfix">
            <span>口味禁忌</span>
          </div>
          <!--口味禁忌渲染-->
          <div v-for="(item, index) in text1" :key="index" class="text item">
            {{ item }}
          </div>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Schooltab',
  data() {
    return {
      text: [],
      text1: []
    }
  },
  methods: {},
  mounted() {
    axios
      .get('http://114.55.141.250:8181/data/getforbidfood/school_1')
      .then((res) => {
        console.log(res.data)
        this.text = res.data.food
        this.text1 = res.data.inglist
      })
      .catch((err) => {
        console.log(err.data)
      })
  }
}
</script>
<style scoped>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 100%;
  min-height: 400px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
</style>
