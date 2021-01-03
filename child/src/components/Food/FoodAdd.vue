<template>
  <div class="right-main">
    <el-form :inline="true" :model="addinformation" class="demo-form-inline">
      <el-form-item label="食物名">
        <el-input
          v-model="addinformation.foodName"
          placeholder="食物名"
          style="width: 250px"
        ></el-input>
      </el-form-item>
      <el-form-item label="食物口感">
        <el-select v-model="addinformation.foodTexture" placeholder="食物口感">
          <el-option label="咸香" value="咸香"></el-option>
          <el-option label="清淡" value="清淡"></el-option>
          <el-option label="糯香" value="糯香"></el-option>
          <el-option label="辣香" value="辣香"></el-option>
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label="食物工艺">
          <el-select v-model="addinformation.foodCarft" placeholder="食物工艺">
            <el-option label="红烧" value="红烧"></el-option>
            <el-option label="煮" value="煮"></el-option>
            <el-option label="蒸" value="蒸"></el-option>
            <el-option label="卤" value="卤"></el-option>
            <el-option label="炒" value="炒"></el-option>
            <el-option label="炖" value="炖"></el-option>
            <el-option label="凉拌" value="凉拌"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适宜餐次">
          <el-select
            v-model="addinformation.foodSuitablemeal"
            placeholder="适宜餐次"
          >
            <el-option label="早餐" value="早餐"></el-option>
            <el-option label="午餐" value="午餐"></el-option>
            <el-option label="晚餐" value="晚餐"></el-option>
            <el-option label="早午餐" value="早午餐"></el-option>
            <el-option label="晚午餐" value="晚午餐"></el-option>
            <el-option label="早晚餐" value="早晚餐"></el-option>
            <el-option label="任何餐次" value="任何餐次"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="食物原料">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 7 }"
            placeholder="请输入内容"
            v-model="addinformation.foodIng"
            style="width: 400px"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="display: block"
          >添加</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="display: block"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addinformation: {
        foodName: '',
        foodType: '',
        foodCarft: '',
        foodTexture: '',
        foodSuitablemeal: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('提交')
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style  scoped>
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .right-main {
    min-height: 12.031rem; /*no*/
  }
}
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .right-main {
    min-height: 6.1rem; /*no*/
  }
}
@media screen and (min-width: 1500px) {
  .right-main {
    min-height: 7.1rem; /*no*/
  }
}
@media screen and (min-width: 1270px) and (max-width: 1500px) and (min-height: 650px) {
  .right-main {
    min-height: 4.5rem; /*no*/
  }
}
@media screen and (min-width: 1270px) and (max-width: 1500px) {
  .right-main {
    min-height: 3.5rem; /*no*/
  }
}
</style>
