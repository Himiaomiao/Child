<template>
  <div class="center">
    <!--学生信息-->
    <div class="right-main">
      <div class="right-main-1">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="search"
        ></el-input>
        <div style="margin-top: 10px">
          <el-button type="primary" @click="Delete">删除选中</el-button>
          <el-button type="primary" @click="Nodelete">取消选中</el-button>
        </div>
      </div>
      <div
        class="right-main-2"
        style="margin-top: 20px; width: 100%; height: 100%"
      >
        <el-table
          ref="filterTable"
          :data="
            tables.slice((currentPage - 1) * pagesize, currentPage * pagesize)
          "
          style="width: 100%"
        >
          <el-table-column type="selection" min-width="55"></el-table-column>
          <el-table-column
            align="center"
            prop="studentNum"
            label="学号"
            min-width="120"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="studentName"
            label="姓名"
            min-width="120"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="studentAge"
            label="年龄"
            min-width="80"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="studentGd"
            label="监护人"
            min-width="120"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="studentGdtel"
            label="监护人手机号"
            min-width="180"
          ></el-table-column>
          <el-table-column align="center" label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >详情</el-button
              >
              <!--  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">修改</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          layout="prev, pager, next, sizes, total, jumper"
          :total="tableData.length"
          @current-change="current_change"
          @size-change="handleSizeChange"
          :page-size="pagesize"
          :page-sizes="[10, 20, 30, 40, 50, 60, 70]"
        ></el-pagination>
      </div>
    </div>
    <!--抽屉页面-->
    <el-drawer
      title="学生详情"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ttb"
      custom-class="demo-drawer"
      ref="drawer"
      size="95%"
    >
      <div class="heard" style="width: 100%; height: 60px">
        <el-radio-group
          v-model="radio3"
          size="small"
          style="float: left"
          @change="mychang"
        >
          <el-radio-button label="信息详情"></el-radio-button>
          <el-radio-button label="修改信息"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="demo-drawer__content">
        <el-form :model="information" :inline="true" class="demo-form-inline">
          <el-form-item label="班级编号">
            <el-input
              v-model="information.classNum"
              :disabled="mydisable"
              style="min-width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生编号">
            <el-input
              v-model="information.studentNum"
              style="min-width: 250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生姓名">
            <el-input
              v-model="information.studentName"
              style="min-width: 250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生身高">
            <el-input
              v-model="information.studentHeight"
              style="min-width: 250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生体重">
            <el-input
              v-model="information.studentWeight"
              style="min-width: 250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生性别">
            <el-input
              v-model="information.studentSex"
              style="min-width: 250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="Age">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="information.Age"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <template v-for="(info, index) in information.fGuardian">
            <el-form-item :label="'监护人' + (index + 1) + '姓名'" :key="index">
              <el-input
                v-model="info.gdName"
                style="min-width: 250px"
                :disabled="mydisable"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="'监护人' + (index + 1) + '手机号'"
              :key="index"
            >
              <el-input
                v-model="info.gdTelnum"
                style="min-width: 250px"
                :disabled="mydisable"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="'学生与监护人' + (index + 1) + '关系'"
              :key="index"
            >
              <el-input
                v-model="info.relation"
                style="min-width: 250px"
                :disabled="mydisable"
              ></el-input>
            </el-form-item>
          </template>
          <!--    <el-form-item label="学生住址">
            <el-input
              v-model="information.studentAddress"
              style="min-width: 250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>-->
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm" :disabled="mydisable">取 消</el-button>
          <el-button
            type="primary"
            :disabled="mydisable"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StudentInformation',
  data() {
    return {
      radio3: '信息详情',
      mydisable: true,
      dialog: false,
      loading: false,
      search: '',
      pagesize: 0,
      currentPage: 1,
      tableData: [],
      information: {
        studentSex: '',
        Age: '',
        classNum: '',
        studentNum: '',
        studentName: '',
        studentAge: '',
        studentAdress: '',
        studentHeight: '',
        studentWeight: '',
        fGuardian: [
          {
            gdNum: '',
            gdName: '',
            gdTelnum: '',
            relation: ''
          }
        ]
      }
    }
  },
  methods: {
    /* 关闭弹出框,提交修改学生信息表单 */
    handleClose(done) {
      console.log(this.information)
      this.radio3 = '信息详情'
      var self = this
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then((_) => {
          this.loading = true
          axios
            .put('http://114.55.141.250:8181/student/updata', {
              classNum: this.information.classNum,
              studentAddress: this.information.studentAdress,
              studentHeight: this.information.studentAdress,
              studentName: this.information.studentName,
              studentNum: this.information.studentNum,
              studentWeight: this.information.studentWeight,
              studentSex: this.information.studentSex,
              studentUpdateWithGdList: this.information.fGuardian,
              studentBirthday: this.information.Age
            })
            .then(function (res) {
              console.log(res.data)
              self.timer = setTimeout(() => {
                done()
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  self.loading = false
                }, 400)
              }, 2000)
              self.$message({
                message: '更新成功！！！！',
                type: 'success'
              })
              console.log('更新成功')
            })
            .catch(function (err) {
              this.loading = false
              this.dialog = false
              clearTimeout(this.timer)
              console.log(err)
              self.$message.error('更新失败！！！！')
            })
        })
        .catch((_) => {
          this.loading = false
          this.dialog = false
          clearTimeout(this.timer)
        })
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
    /* 切换信息修改和信息展示 */
    mychang(value) {
      console.log(value)
      if (value === '修改信息') this.mydisable = false
      else this.mydisable = true
    },
    /* 点击详情获取学生信息 */
    handleEdit(index, row) {
      console.log('获取学生详情')
      console.log(index, row)
      this.dialog = true
      var ul =
        'http://114.55.141.250:8181/student/information/' + row.studentNum
      console.log(ul)
      var self = this
      axios
        .get(ul)
        .then(function (res) {
          console.log(res.data)
          if (res.data !== null) {
            self.information = res.data
          } else {
            self.information.studentNum = row.studentNum
            self.information.studentName = row.studentName
            self.information.studentHeight = ''
            self.information.studentWeight = ''
            self.information.fGuardian = []
            self.information.studentSex = row.studentSex
            self.information.classNum =
              self.$store.state.userInfo.data.classnum
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    /* 改变当前页面 */
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    filterHandler(value, row, column) {
      const property = column.property
      return row[property] === value
    },
    /* 控制不同设备的初始页面条数 */
    Pagesize: function () {
      if (document.documentElement.clientHeight < 700) {
        this.pagesize = 10
      } else if (document.documentElement.clientHeight <= 800) {
        this.pagesize = 12
      } else if (document.documentElement.clientHeight <= 1024) {
        this.pagesize = 20
      } else if (document.documentElement.clientHeight <= 1920) {
        this.pagesize = 25
      }
    },
    /* 删除选中的学生信息 */
    Delete() {
      console.log(this.$refs.filterTable.selection)
      var temp = this.$refs.filterTable.selection
      var self = this
      var obj = {}
      var deleteData = []
      for (var i = 0; i < temp.length; i++) {
        obj.classNum = temp[i].classNum
        obj.stuNum = temp[i].studentNum
        deleteData.push(obj)
      }
      console.log(deleteData)
      axios
        .delete('http://114.55.141.250:8181/student/delete', {
          data: deleteData
        })
        .then(function (res) {
          console.log(res.data)
          self.$message({
            message: '删除成功，刷新查看现有学生信息',
            type: 'success'
          })
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    /* 取消删除选中的学生信息 */
    Nodelete() {
      this.$refs.filterTable.clearSelection()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    /* 模糊查询数据 */
    tables() {
      const search = this.search
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.tableData.filter((data) => {
          // some() 方法用于检测数组中的元素是否满足指定条件;
          // some() 方法会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。
          // 注意： some() 不会对空数组进行检测。
          // 注意： some() 不会改变原始数组。
          return Object.keys(data).some((key) => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.tableData
    }
  },
  mounted() {
    var self = this
    /* 获取教师所管理的班级 */
    var mydata = this.$store.state.userInfo.data.classnum
    var ul = 'http://114.55.141.250:8181/teacher/information/' + mydata
    console.log(ul)
    axios
      .get(ul)
      .then(function (res) {
        console.log(res.data)
        self.tableData = res.data.data
      })
      .catch(function (err) {
        console.log(err)
      })
    // 获取分页页面大小
    this.Pagesize()
  }
}
</script>
<style scoped>
.el-form--inline .el-form-item {
  margin-right: 0.5rem;
}
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .right-main {
    min-height: 12.031rem; /*no*/
  }
}
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .right-main {
    min-height: 6.1rem; /*no*/
  }
}
@media screen and (min-width: 1500px) {
  .right-main {
    min-height: 7.1rem; /*no*/
  }
}
@media screen and (min-width: 1270px) and (max-width: 1500px) and (min-height: 650px) {
  .right-main {
    min-height: 4.5rem; /*no*/
  }
}
@media screen and (min-width: 1270px) and (max-width: 1500px) {
  .right-main {
    min-height: 3.5rem; /*no*/
  }
}

.right-main-1 {
  width: 100%;
  border-bottom: 1px solid #c1d3de;
  padding: 10px;
}
</style>
