<template>
  <div>
    <el-row>
      <!--学校禁忌食物-->
      <el-card class="box-card" shadow="always">
        <!--食物禁忌卡片头部-->
        <div slot="header" class="clearfix">
          <span>禁忌食物</span>
          <el-button
            type="warning"
            icon="el-icon-delete"
            circle
            style="float: right; padding: 3px 0"
            @click="click1()"
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
        <!--食物禁忌渲染列表-->
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <div>
            <el-checkbox
              v-for="(item, index) in text"
              :label="item"
              :key="index"
              :border="true"
              >{{ item }}</el-checkbox
            >
          </div>
        </el-checkbox-group>
      </el-card>
    </el-row>
    <!--添加食物禁忌-->
    <el-dialog title="添加禁忌食物" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="食物名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="foodbat()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Schooltab',
  data() {
    return {
      text: [],
      text1: [],
      text2: [],
      checkAll: false,
      isIndeterminate: true,
      checkedCities: [],
      checkAll1: false,
      isIndeterminate1: true,
      checkedCities1: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: ''
      }
    }
  },
  methods: {
    /* 获取禁忌详情 */
    gugetdata() {
      var ul = 'http://114.55.141.250:8181/data/getforbidfood/school_1'
      console.log(ul)
      axios
        .get(ul)
        .then((res) => {
          console.log(res.data)
          this.text = res.data.stylelist
          this.text1 = res.data.inglist
          this.text2 = res.data.stylelist
        })
        .catch((err) => {
          console.log(err.data)
        })
    },
    /* 食物禁忌全选函数 */
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.text : []
      this.isIndeterminate = false
    },
    /* 食物禁忌选中函数 */
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.text.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.text.length
    },
    /* 食物禁忌全选函数 */
    handleCheckAllChange1(val) {
      this.checkedCities1 = val ? this.text1 : []
      this.isIndeterminate1 = false
    },
    /* 食物禁忌选中函数 */
    handleCheckedCitiesChange1(value) {
      const checkedCount = value.length
      this.checkAll1 = checkedCount === this.text1.length
      this.isIndeterminate1 =
        checkedCount > 0 && checkedCount < this.text1.length
    },
    click1() {
      console.log('hello')
      console.log(this.checkedCities)
      var mydata = this.checkedCities
      console.log(mydata)
      var ul = 'http://114.55.141.250:8181/data/delete/school_1/' + this.stuId
      console.log('链接')
      console.log(ul)
      axios
        .delete(ul, this.checkedCities)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err.data)
        })
    },
    click2() {
      console.log('hello')
      console.log(this.checkedCities1)
      axios
        .delete(
          'http://114.55.141.250:8181/data/delete/school_1',
          this.checkedCities1
        )
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err.data)
        })
    },
    /* 添加食物禁忌 */
    foodbat() {
      console.log(this.form.name)
      var foodlist = []
      foodlist.push(this.form.name)
      axios
        .post('http://114.55.141.250:8181/data/insertforbidfood', {
          flist: foodlist,
          schoolId: 'school_1'
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err.data)
        })
    }
  },
  mounted() {
    this.gugetdata()
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
