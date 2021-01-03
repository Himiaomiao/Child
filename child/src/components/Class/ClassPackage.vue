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
    <el-table :data="classPackage" border style="width: 100%">
      <el-table-column prop="pag_name" label="套餐名称" width="120"></el-table-column>
      <el-table-column prop="pag_des" label="套餐描述" width="200"></el-table-column>
      <el-table-column prop="pag_time" label="套餐周期" width="120"></el-table-column>
      <el-table-column prop="pag_fit" label="适宜餐次" width="120"></el-table-column>
      <el-table-column prop="pag_maketime" label="配餐时间" width="120"></el-table-column>
      <el-table-column prop="make_name" label="配餐员" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">评价</el-button>
          <el-button type="text" size="small" disabled="mydisabled">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ClassInformation',
  data() {
    return {
      mydisabled: false,
      classPackage: [],
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
          'http://localhost:3000/res' //, {
          //   classnum: this.state,
          // }
        )
        .then(function (res) {
          console.log(res.data)
          self.classPackage = res.data.classPackage
        })
        .catch(function (err) {
          console.log(err)
        })
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
    /* 从后端接口获取全部班级全部数据数据 */
    getdata: function () {
      /* 保存this信息 */
      var self = this
      axios
        .get('http://localhost:3000/data')
        .then(function (res) {
          self.restaurants = res.data.class
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  /* 教师获取本班级套餐信息 */
  tcgetdata() {
    var self = this
    /* 获取教师ID */
    var mydata = this.$store.state.userInfo.data.id
    axios
      .post('', {
        tc_id: mydata
      })
      .then(function (res) {
        self.tableData = res.data.student
        self.table = res.data.student
        console.log(res)
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  /* 计算属性 */
  computed: {
    /* 获取登陆用户信息 */
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  /* moubted当页面组件以及ele组件渲染完毕时执行，实现获取获取后端数据 */
  mounted() {
    var identity = this.$store.state.userInfo.data.identify
    /* 用户身份为教师默认显示自己班级学生 */
    if (identity === 'teacher') {
      this.first = false
      this.mydisabled = true
      this.tcgetdata()
    } else {
      this.getdata()
    }
  }
}
</script>
<style scoped>
.right1 {
  width: 100%;
  min-height: 100%;
}
</style>
