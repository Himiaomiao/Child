<template>
  <div class="center" style="padding-top: 10px">
    <el-input
      v-model="input"
      placeholder="请输入学生学号"
      style="width: 300px; margin-right: 10px"
    ></el-input>
    <el-button type="success" round @click="myclick()">查询</el-button>
    <el-row style="margin-top: 10px" shadow="hover">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>食物禁忌</span>
            <!--删除禁忌食物-->
            <el-button
              type="primary"
              icon="el-icon-delete"
              circle
              style="float: right; padding: 3px 0"
              @click="click2()"
            ></el-button>
            <!--添加禁忌食物-->
            <el-button
              type="info"
              icon="el-icon-plus"
              circle
              style="float: right; padding: 3px 0; margin-right: 5px"
              @click="dialogFormVisible = true"
            ></el-button>
          </div>
          <div v-for="(item, index) in text" :key="index" class="text item">
            {{ item }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"
        ><el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>食材禁忌</span>
            <el-button
              type="warning"
              icon="el-icon-delete"
              circle
              style="float: right; padding: 3px 0"
              @click="click2()"
            ></el-button>
            <!--添加禁忌食物-->
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              style="float: right; padding: 3px 0; margin-right: 5px"
              @click="dialogFormVisible = true"
            ></el-button>
          </div>
          <div v-for="(item, index) in text2" :key="index" class="text item">
            {{ item }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"
        ><el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>口味禁忌</span>
            <el-button
              icon="el-icon-delete"
              circle
              style="float: right; padding: 3px 0"
              @click="click2()"
            ></el-button>
            <!--添加禁忌食物-->
            <el-button
              type="danger"
              icon="el-icon-plus"
              circle
              style="float: right; padding: 3px 0; margin-right: 5px"
              @click="dialogFormVisible = true"
            ></el-button>
          </div>
          <div v-for="(item, index) in text3" :key="index" class="text item">
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
  name: 'StuTab',
  data() {
    return {
      input: '',
      text: '',
      text2: '',
      text3: ''
    }
  },
  methods: {
    myclick() {
      var ul =
        'http://114.55.141.250:8181/data/getforbidfood/school_1/' + this.input
      axios
        .get(ul)
        .then((res) => {
          console.log(res.data)
          this.text = res.data.food
          this.text2 = res.data.inglist
          this.text3 = res.data.stylelist
        })
        .catch((err) => {
          console.log(err.data)
        })
    }
  }
}
</script>
<style  scoped>
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
}
</style>
