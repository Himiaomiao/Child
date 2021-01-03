<template>
  <div>
    <el-row>
      <!--学校禁忌食物-->
      <el-col :span="8">
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
              @click="addbatfood()"
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
      </el-col>
      <!--食材禁忌-->
      <el-col :span="8">
        <el-card class="box-card" shadow="always">
          <!--食材禁忌卡片头部-->
          <div slot="header" class="clearfix">
            <span>禁忌食材</span>
            <el-button
              type="warning"
              icon="el-icon-delete"
              circle
              style="float: right; padding: 3px 0"
              @click="click2()"
            ></el-button>
            <!--添加禁忌食材-->
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              style="float: right; padding: 3px 0; margin-right: 5px"
              @click="addbating()"
            ></el-button>
          </div>
          <!--食材禁忌渲染列表-->
          <el-checkbox
            :indeterminate="isIndeterminate1"
            v-model="checkAll1"
            @change="handleCheckAllChange1"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="checkedCities1"
            @change="handleCheckedCitiesChange1"
          >
            <el-checkbox
              v-for="(item, index) in text2"
              :label="item"
              :key="index"
              :border="true"
              >{{ item }}</el-checkbox
            >
          </el-checkbox-group>
        </el-card>
      </el-col>
      <!--学校口味禁忌-->
      <el-col :span="8">
        <el-card class="box-card" shadow="always">
          <!--口味禁忌卡片头部-->
          <div slot="header" class="clearfix">
            <span>禁忌口味</span>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              style="float: right; padding: 3px 0"
              @click="click3()"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              style="float: right; padding: 3px 0; margin-right: 5px"
              @click="click1()"
            ></el-button>
          </div>
          <!--口味禁忌渲染-->
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll2"
            @change="handleCheckAllChange2"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange2"
          >
            <el-checkbox
              v-for="(item, index) in text1"
              :label="item"
              :key="index"
              :border="true"
              >{{ item }}</el-checkbox
            >
          </el-checkbox-group>
        </el-card></el-col
      >
    </el-row>
    <!--添加食物禁忌-->
    <el-dialog title="添加禁忌食物" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item
          label="食物名称"
          :label-width="formLabelWidth"
          v-if="!show"
        >
          <el-input
            v-model="form.name"
            type="textarea"
            :rows="2"
            placeholder="请输入禁忌食物，不同食物之间用逗号分隔"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="口味名称"
          :label-width="formLabelWidth"
          v-if="show"
        >
          <el-input
            v-model="form.ing"
            type="textarea"
            :rows="2"
            placeholder="请输入禁忌口味，不同名称之间用逗号分隔"
          ></el-input>
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
      show: false,
      text: [],
      text1: [],
      text2: [],
      checkAll: false,
      isIndeterminate: true,
      checkedCities: [],
      checkAll1: false,
      checkAll2: false,
      isIndeterminate1: true,
      checkedCities1: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        ing: ''
      }
    }
  },
  methods: {
    addbatfood() {
      this.dialogFormVisible = true
      this.show = false
    },
    addbating() {
      this.dialogFormVisible = true
      this.show = true
    },
    /* 获取禁忌详情 */
    gugetdata() {
      var mydata = this.$store.state.userInfo.data.id
      var ul = 'http://114.55.141.250:8181/gu/studentList/' + mydata
      console.log(ul)
      axios
        .get(ul)
        .then((res) => {
          console.log(res.data.data)
          this.stuId = res.data.data[0].studentNum
          var ul =
            'http://114.55.141.250:8181/data/getforbidfood/school_1/' +
            this.stuId
          console.log(ul)
          axios
            .get(ul)
            .then((res) => {
              console.log(res.data)
              this.text = res.data.food
              this.text1 = res.data.inglist
              this.text2 = res.data.stylelist
            })
            .catch((err) => {
              console.log(err.data)
            })
        })
        .catch((err) => {
          console.log(err)
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
    /* 食物禁忌全选函数 */
    handleCheckAllChange2(val) {
      this.checkedCities1 = val ? this.text1 : []
      this.isIndeterminate1 = false
    },
    /* 食物禁忌选中函数 */
    handleCheckedCitiesChange2(value) {
      const checkedCount = value.length
      this.checkAll1 = checkedCount === this.text1.length
      this.isIndeterminate1 =
        checkedCount > 0 && checkedCount < this.text1.length
    },
    click1() {
      console.log('删除食物')
      console.log(this.checkedCities)
      const data = this.checkedCities
      console.log(data)
      var ul = 'http://114.55.141.250:8181/data/delete/school_1/' + this.stuId
      console.log('链接')
      console.log(ul)
      axios
        .delete(ul, { data: this.checkedCities })
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
      const ul =
        'http://114.55.141.250:8181/data/deletestudentstyle/school_1/' +
        this.stuId
      axios
        .delete(ul, {
          data: this.checkedCities1
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err.data)
        })
    },
    /* 添加食物禁忌 */
    foodbat() {
      if (this.show === true) {
        console.log('添加口味食材禁忌')
        console.log(this.form.name)
        const inglist = this.form.ing.split(',')
        // foodlist.push(this.form.name)
        axios
          .post('http://114.55.141.250:8181/data/insertstudentforbidstyle', {
            fsList: inglist,
            schoolId: 'school_1',
            stuNum: this.stuId
          })
          .then((res) => {
            console.log(res.data)
            this.dialogFormVisible = false
          })
          .catch((err) => {
            console.log(err.data)
          })
      } else {
        console.log('添加食物禁忌')
        console.log(this.form.name)
        const foodlist = this.form.name.split(',')
        // foodlist.push(this.form.name)
        axios
          .post('http://114.55.141.250:8181/data/insertstudentforbidfood', {
            fsList: foodlist,
            schoolId: 'school_1',
            stuNum: this.stuId
          })
          .then((res) => {
            console.log(res.data)
            this.dialogFormVisible = false
          })
          .catch((err) => {
            console.log(err.data)
          })
      }
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
