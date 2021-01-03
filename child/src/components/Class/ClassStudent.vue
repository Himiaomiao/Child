<template>
  <div class="right1">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="查询：">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchStudent">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="classStudent" border style="width: 100%">
      <el-table-column fixed prop="stu_num" label="学号" width="150"></el-table-column>
      <el-table-column prop="stu_name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="stu_age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="stu_height" label="身高" width="120"></el-table-column>
      <el-table-column prop="stu_weight" label="体重" width="120"></el-table-column>
      <el-table-column prop="stu_gu" label="监护人" width="120"></el-table-column>
      <el-table-column prop="stu_gutel" label="监护人手机号" width="150"></el-table-column>
      <el-table-column prop="stu_adress" label="家庭住址" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">移除</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ClassStudent',
  data() {
    return {
      classStudent: [],
      state: '',
      restaurants: []
    }
  },
  methods: {
    searchStudent() {
      console.log('提交查询')
      var self = this
      axios
        .get(
          'http://localhost:3000/class' //, {
          //   classnum: this.state,
          // }
        )
        .then(function (res) {
          console.log(res.data)
          self.classStudent = res.data.classstudent
          self.restaurants = res.data.classStudent
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    handleClick(row) {
      console.log(row)
    },
    /* 实现远程搜索输入框函数 */
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },

    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    /* 获取远程搜索下拉框班级数据 */
    getdata: function () {
      /* 保存this信息 */
      var self = this
      axios
        .get('http://localhost:3000/class')
        .then(function (res) {
          self.restaurants = res.data.classstudent
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  /* 计算属性 */
  computed: {
    /* 获取登陆用户信息 */
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  mounted() {
    this.getdata()
  }
}
</script>
<style scoped>
.right1 {
  width: 100%;
  height: 100%;
}
</style>
