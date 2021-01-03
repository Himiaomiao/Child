<template>
  <div style="padding: 10px">
    <span style="color: #f4516c; font-size: 0.25rem">早餐推荐</span>
    <el-divider content-position="left" style="color: #f4516c"
      >Breakfast</el-divider
    >
    <el-collapse accordion style="margin-bottom: 10px">
      <el-collapse-item v-for="(item, index) in food" :key="index">
        <template slot="title">
          {{ item.day }} <i class="header-icon el-icon-info"></i>
        </template>
        <div>
          <i class="el-icon-s-opportunity" style="color: #f56c6c"></i>
          {{
            item.breakfastFood1 +
            " ( " +
            "重量：" +
            item.breakfastWeight1 +
            " )"
          }}
        </div>
        <div v-if="item.breakfastFood2 !== ' '">
          <i class="el-icon-s-opportunity" style="color: #e6a23c"></i>
          {{
            item.breakfastFood2 +
            " ( " +
            "重量：" +
            item.breakfastWeight2 +
            " )"
          }}
        </div>
        <div v-if="item.breakfastFood3 !== undefined">
          <i class="el-icon-s-opportunity" style="color: #c0c4cc"></i>
          {{
            item.breakfastFood3 +
            " ( " +
            "重量：" +
            item.breakfastWeight3 +
            " )"
          }}
        </div>
      </el-collapse-item>
    </el-collapse>
    <!--午餐-->
    <span style="margin-top: 10px; color: #40c9c6; font-size: 0.25rem"
      >午餐推荐</span
    >
    <el-divider>午餐</el-divider>
    <el-collapse accordion style="margin-bottom: 10px">
      <el-collapse-item v-for="(item, index) in food" :key="index">
        <template slot="title">
          {{ item.day }} <i class="el-icon-question"></i>
        </template>
        <div>
          <i class="el-icon-thumb" style="color: #67c23a"></i>
          {{ item.lunchFood1 + "(" + "重量：" + item.lunchWeight1 + ")" }}
        </div>
        <div v-if="item.lunchFood2 !== ' '">
          <i class="el-icon-discount" style="color: #e6a23c"> </i>
          {{ item.lunchFood2 + "(" + "重量：" + item.lunchWeight2 + ")" }}
        </div>
        <div v-if="item.breakfastFood3 !== undefined">
          <i class="el-icon-collection-tag" style="color: #909399"></i>
          {{ item.lunchFood3 + "(" + "重量：" + item.lunchWeight3 + ")" }}
        </div>
      </el-collapse-item>
    </el-collapse>
    <span style="color: #76b6ff; font-size: 0.25rem">晚餐推荐</span>
    <el-divider content-position="right">晚餐</el-divider>
    <el-collapse accordion style="margin-bottom: 10px">
      <el-collapse-item v-for="(item, index) in food" :key="index">
        <template slot="title">
          {{ item.day }} <i class="el-icon-warning"></i>
        </template>
        <div>
          <i class="el-icon-coordinate" style="color: #e6a23c"></i>
          {{ item.dinnerFood1 + "(" + "重量：" + item.dinnerWeight1 + ")" }}
        </div>
        <div v-if="item.lunchFood2 !== ' '">
          <i class="el-icon-coordinate" style="color: #67c23a"></i>
          {{ item.dinnerFood2 + "(" + "重量：" + item.dinnerWeight2 + ")" }}
        </div>
        <div v-if="item.breakfastFood3 !== undefined">
          <i class="el-icon-coordinate" style="color: #f56c6c"></i>
          {{ item.dinnerFood3 + "(" + "重量：" + item.dinnerWeight3 + ")" }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ChildFood',

  data() {
    return {
      food: [],
      class: '',
      stuId: ''
    }
  },
  methods: {
    gugetdata() {
      console.log('HELLO')
      var mydata = this.$store.state.userInfo.data.id
      var ul = 'http://114.55.141.250:8181/gu/studentList/' + mydata
      axios
        .get(ul)
        .then((res) => {
          console.log(res.data.data)
          this.class = res.data.data[0].studentClass
          this.stuId = res.data.data[0].studentNum
          axios
            .post('http://114.55.141.250:8181/data/pushchildstupk', {
              classId: this.class,
              schoolId: 'school_1',
              stuId: this.stuId
            })
            .then((res) => {
              console.log(res.data)
              this.food = res.data.data
            })
            .catch((err) => {
              console.log(err.data)
            })
        })
        .catch((err) => {
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
    this.gugetdata()
  }
}
</script>
<style scoped>
.el-divider__text.is-left {
  color: #f4516c !important;
  font-size: 0.13rem !important;
}
.el-divider__text.is-center {
  color: #40c9c6 !important;
  font-size: 0.13rem !important;
}
.el-divider__text.is-right {
  color: #76b6ff !important;
  font-size: 0.13rem !important;
}
</style>
