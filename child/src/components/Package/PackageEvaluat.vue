<template>
  <div class="right-main" style="padding-top: 10px">
    <div style="margin-bottom: 10px">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入套餐名"
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
      <el-rate v-model="value" show-text></el-rate>
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
      input: '',
      restaurants: [],
      state: '',
      timeout: null,
      temp: [],
      spNum: ''
    }
  },
  methods: {
    /* 远程输入提示 */
    querySearchAsync(queryString, cb) {
      var temp = this.temp
      for (var i = 0; i < temp.length; i++) {
        var obj = {}
        obj.value = temp[i].spName
        obj.spNum = temp[i].spNum
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
        .get('http://114.55.141.250:8181/catering/getlist/')
        .then(function (res) {
          self.temp = res.data.StuPackage
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    /* 提交评价信息 */
    submit() {
      var self = this
      console.log(this.value)
      console.log(this.spNum)
      console.log(this.textarea2)
      console.log(this.state)
      var identify = this.$store.state.userInfo.data.identify
      var id = this.$store.state.userInfo.data.id

      axios
        .post('http://114.55.141.250:8181/catering/appraisement', {
          description: this.textarea2,
          useNum: id,
          useIdentity: identify,
          spNum: this.spNum,
          spName: this.state,
          satisfy: this.value
        })
        .then(function (res) {
          console.log(res.data)
          if (res.data.meta.status === '200') {
            self.$message({
              message: '已收到您的评价信息',
              type: 'success'
            })
          } else {
            self.$message.error('提交出错')
          }
        })
        .catch(function (err) {
          console.log(err)
          self.$message.error('提交出错')
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
