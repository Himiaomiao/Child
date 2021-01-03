<template>
  <div class="right-main" style="padding-top: 10px">
    <h1>评价学生食物</h1>
    <div style="margin-bottom: 10px">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入食物名"
        @select="handleSelect"
      ></el-autocomplete>
    </div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 10, maxRows: 20 }"
      placeholder="请输入反馈信息"
      v-model="textarea2"
      style="width: 80%"
      clearable
    ></el-input>
    <div>
      <span>您的评分</span>
      <el-rate v-model="value2"></el-rate>
    </div>
    <el-button
      type="primary"
      round
      style="display: block; margin: auto; margin-top: 20px"
      @click="submit()"
      >提交评价</el-button
    >
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FoodEvaluat',
  data() {
    return {
      textarea2: '',
      value: null,
      restaurants: [],
      state: '',
      temp: [],
      foodNum: '',
      value2: null,
      tableData: [],
      stunum: ''
    }
  },
  methods: {
    /* 远程输入提示 */
    querySearchAsync(queryString, cb) {
      var temp = this.temp
      for (var i = 0; i < temp.length; i++) {
        var obj = {}
        obj.value = temp[i].foodName
        obj.foodNum = temp[i].foodNum
        this.restaurants.push(obj)
      }
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
          state.spName.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      console.log(item)
      this.spNum = item.spNum
    },
    /* 获取套餐信息，供实现远程输入框提示 */
    getdata: function () {
      /* 保存this信息 */
      var self = this
      axios
        .get('http://114.55.141.250:8181/food/getlist')
        .then(function (res) {
          console.log(res.data)
          self.temp = res.data.data
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    submit() {
      /* 食物名 */
      console.log(this.state)
      var self = this
      var identify = this.$store.state.userInfo.data.identify
      var id = this.$store.state.userInfo.data.id
      axios
        .post('http://114.55.141.250:8181/food/appraisement', {
          classId: '1001',
          description: this.textarea2,
          foodName: this.state,
          satisfy: this.value2,
          schoolId: 'school_1',
          stuId: '190030099',
          stuName: 'AgqwS',
          useIdentity: identify,
          useNum: id
        })
        .then(function (res) {
          console.log(res)
          self.$message({
            message: '评价信息提交成功',
            type: 'success'
          })
        })
        .catch(function (err) {
          console.log(err)
          this.$message.error('提交出错')
        })
    },
    gugetdata() {
      var self = this
      var mydata = this.$store.state.userInfo.data.id
      console.log(mydata)
      var ul = 'http://114.55.141.250:8181/gu/studentList/' + mydata
      console.log('监护人链接')
      console.log(ul)
      axios
        .get(ul)
        .then(function (res) {
          console.log(res.data)
          self.tableData = res.data.data
          console.log(self.tableData)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  mounted() {
    this.getdata()
  }
}
</script>
