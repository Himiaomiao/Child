<template>
  <div class="AddCenter">
    <el-form :inline="true" :model="addinformation" class="demo-form-inline">
      <el-form-item label="套餐名称">
        <el-input
          v-model="addinformation.name"
          placeholder="套餐名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="套餐人数">
        <el-input
          v-model="addinformation.people"
          placeholder="套餐人数"
        ></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="warning" @click="onSubmit">创建空套餐</el-button>
    </div>
    <div class="center"></div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      addinformation: {
        num: '',
        name: '',
        people: ''
      }
    }
  },
  methods: {
    onSubmit() {
      var ul =
        'http://114.55.141.250:8181/catering/add?' +
        'spName=' +
        this.addinformation.name +
        '&spNum=' +
        this.addinformation.num +
        '&spStusum=' +
        this.addinformation.people
      axios
        .post(ul)
        .then((res) => {
          console.log(res.data)
          this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err.data)
        })
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
.AddCenter {
  margin-top: 10px;
}
</style>
