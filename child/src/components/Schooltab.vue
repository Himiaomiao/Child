<template>
  <div>
    <el-row>
      <!--学校禁忌食物-->
      <el-col :span="12">
        <el-card class="box-card" shadow="always">
          <!--食物禁忌卡片头部-->
          <div slot="header" class="clearfix">
            <span>禁忌食物</span>
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
              @click="open_food()"
            ></el-button>
          </div>
          <!--食物禁忌渲染列表-->
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
              v-for="(item, index) in text"
              :label="item"
              :key="index"
              :border="true"
              >{{ item }}</el-checkbox
            >
          </el-checkbox-group>
        </el-card>
      </el-col>
      <!--学校口味禁忌-->
      <el-col :span="12">
        <el-card class="box-card" shadow="always">
          <!--口味禁忌卡片头部-->
          <div slot="header" class="clearfix">
            <span>口味禁忌</span>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              style="float: right; padding: 3px 0"
              @click="click1()"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              style="float: right; padding: 3px 0; margin-right: 5px"
              @click="open_ing()"
            ></el-button>
          </div>
          <!--口味禁忌渲染-->
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
            type="textarea"
            :rows="2"
            placeholder="请输入禁忌食物，不同食物之间用逗号分隔"
            v-model="form.addbatfood"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="口味名称"
          :label-width="formLabelWidth"
          v-if="show"
        >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入禁忌口味，不同口味之间用逗号分隔"
            v-model="form.addbating"
          >
          </el-input>
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
      checkAll: false,
      isIndeterminate: true,
      checkedCities: [],
      checkAll1: false,
      isIndeterminate1: true,
      checkedCities1: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        addbatfood: '',
        addbating: ''
      }
    }
  },
  methods: {
    open_ing() {
      this.dialogFormVisible = true
      this.show = true
    },
    open_food() {
      this.dialogFormVisible = true
      this.show = false
    },
    /* 口味禁忌全选函数 */
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.text1 : []
      this.isIndeterminate = false
    },
    /* 口味禁忌选中函数 */
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.text1.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.text1.length
    },
    /* 食物禁忌全选函数 */
    handleCheckAllChange1(val) {
      this.checkedCities1 = val ? this.text : []
      this.isIndeterminate1 = false
    },
    /* 食物禁忌选中函数 */
    handleCheckedCitiesChange1(value) {
      const checkedCount = value.length
      this.checkAll1 = checkedCount === this.text.length
      this.isIndeterminate1 =
        checkedCount > 0 && checkedCount < this.text.length
    },
    click1() {
      console.log('删除口味禁忌')
      console.log(this.checkedCities)
      const data = this.checkedCities
      axios
        .delete('http://114.55.141.250:8181/data/deletestyle/school_1', {
          data
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.meta.msg === '200') {
            this.$message({
              message: '删除成功，请刷新查看',
              type: 'success'
            })
          } else {
            this.$message({
              message: '删除失败，请重新操作',
              type: 'warning'
            })
          }
        })
        .catch((err) => {
          console.log(err.data)
        })
    },
    click2() {
      console.log('删除食物禁忌')
      console.log(this.checkedCities1)
      const data = this.checkedCities1
      axios
        .delete('http://114.55.141.250:8181/data/delete/school_1', {
          data
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.meta.msg === '200') {
            this.$message({
              message: '删除成功，请刷新查看',
              type: 'success'
            })
          } else {
            this.$message({
              message: '删除失败，请重新操作',
              type: 'warning'
            })
          }
        })
        .catch((err) => {
          console.log(err.data)
        })
    },
    /* 添加食物禁忌 */
    foodbat() {
      if (this.show === false) {
        console.log('添加禁忌食物')
        console.log(this.form.addbatfood)
        const foodlist = this.form.addbatfood.split(',')
        console.log(foodlist)
        axios
          .post('http://114.55.141.250:8181/data/insertforbidfood', {
            fsList: foodlist,
            schoolId: 'school_1'
          })
          .then((res) => {
            console.log(res.data)
            if (res.data.meta.status === '200') {
              this.$message({
                message: '添加成功，请刷新查看',
                type: 'success'
              })
              this.dialogFormVisible = false
            } else {
              this.dialogFormVisible = false
              this.$message({
                message: '添加失败，请重新操作',
                type: 'warning'
              })
            }
          })
          .catch((err) => {
            console.log(err.data)
          })
      } else {
        console.log('添加禁忌口味')
        console.log(this.form.addbating)
        const inglist = this.form.addbating.split(',')
        console.log(inglist)
        axios
          .post('http://114.55.141.250:8181/data/insertforbidstyle', {
            fsList: inglist,
            schoolId: 'school_1'
          })
          .then((res) => {
            console.log(res.data)
            if (res.data.meta.status === '200') {
              this.$message({
                message: '添加成功，请刷新查看',
                type: 'success'
              })
              this.dialogFormVisible = false
            } else {
              this.dialogFormVisible = false
              this.$message({
                message: '添加失败，请重新操作',
                type: 'warning'
              })
            }
          })
          .catch((err) => {
            console.log(err.data)
          })
      }
    }
  },
  mounted() {
    axios
      .get('http://114.55.141.250:8181/data/getforbidfood/school_1')
      .then((res) => {
        console.log(res.data)
        this.text = res.data.food
        this.text1 = res.data.stylelist
      })
      .catch((err) => {
        console.log(err.data)
      })
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
