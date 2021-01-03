<template>
  <div class="center">
    <!--学生信息-->
    <div class="right-main">
      <div class="right-main-2" style="margin-top:20px;width:100%;height:100%">
        <el-table ref="filterTable" :data="tableData" style="width: 100%">
          <el-table-column align="center" prop="studentClass" label="班级" min-width="120"></el-table-column>
          <el-table-column align="center" prop="studentNum" label="学号" min-width="120"></el-table-column>
          <el-table-column align="center" prop="studentName" label="姓名" min-width="120"></el-table-column>
          <el-table-column align="center" prop="studentAge" label="年龄" min-width="80"></el-table-column>
          <el-table-column align="center" prop="studentSex" label="性别" min-width="80"></el-table-column>
          <el-table-column align="center" label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                type="success"
                round
              >详情</el-button>
              <el-button
                size="mini"
                @click="handleUpdata(scope.$index, scope.row)"
                type="warning"
                round
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--学生详情页面-->
    <el-drawer
      title="学生详情"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ttb"
      custom-class="demo-drawer"
      ref="drawer"
      size="95%"
    >
      <div class="demo-drawer__content">
        <el-form :model="information" :inline="true" class="demo-form-inline">
          <el-form-item label="班级编号">
            <el-input
              v-model="information.studentClass"
              :disabled="mydisable"
              style="min-width:250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生编号">
            <el-input
              v-model="information.classPeoplesum"
              style="min-width:250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生姓名">
            <el-input
              v-model="information.studentNum"
              style="min-width:250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生身高">
            <el-input
              v-model="information.studentName"
              style="min-width:250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生体重">
            <el-input
              v-model="information.studentWeight"
              style="min-width:250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生性别">
            <el-input
              v-model="information.studentSex"
              style="min-width:250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生年龄">
            <el-input
              v-model="information.studentAge"
              style="min-width:250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>
          <template v-for="(info,index) in information.fguardianList">
            <el-form-item :label="'监护人'+(index+1)+'姓名'" :key="info.gdName">
              <el-input v-model="info.gdName" style="min-width:250px" :disabled="mydisable"></el-input>
            </el-form-item>
            <el-form-item :label="'监护人'+(index+1)+'手机号'" :key="info.gdName">
              <el-input v-model="info.gdTelnum" style="min-width:250px" :disabled="mydisable"></el-input>
            </el-form-item>
            <el-form-item :label="'学生与监护人'+(index+1)+'关系'" :key="info.gdName">
              <el-input v-model="info.relation" style="min-width:250px" :disabled="mydisable"></el-input>
            </el-form-item>
          </template>
          <el-form-item label="学生住址">
            <el-input
              v-model="information.studentAddress"
              style="min-width:250px"
              :disabled="mydisable"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm" :disabled="mydisable">取 消</el-button>
          <el-button
            type="primary"
            :disabled="mydisable"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
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
      tableData: [],
      information: [],
      mydisable: false,
      dialog: false,
      loading: false
    }
  },
  methods: {
    /* 关闭弹出框,提交修改学生信息表单 */
    handleClose(done) {
      if (this.mydisable === true) {
        this.loading = false
        this.dialog = false
        clearTimeout(this.timer)
      } else {
        var self = this
        if (this.loading) {
          return
        }
        this.$confirm('确定要提交表单吗？')
          .then((_) => {
            this.loading = true
            axios
              .post('http://moon-ice.com:38080/app/mock/16/updata/class', {
                data: this.information
              })
              .then(function (res) {
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
                console.log(err)
                self.$message.error('更新失败！！！！')
              })
          })
          .catch((_) => {
            this.loading = false
            this.dialog = false
            clearTimeout(this.timer)
          })
      }
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
    /* 点击详情获取学生信息 */
    handleEdit(index, row) {
      this.mydisable = true
      console.log('获取学生详情')
      console.log(index, row)
      this.dialog = true
      var ul =
        'http://114.55.141.250:8181/gu/studentInformation/' + row.studentNum
      console.log(ul)
      var self = this
      axios
        .get(ul)
        .then(function (res) {
          console.log(res.data)
          self.information = res.data.data
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    /* 监护人修改学生信息 */
    handleUpdata(index, row) {
      console.log(index, row)
      this.dialog = true
      this.mydisable = false
      var ul =
        'http://114.55.141.250:8181/gu/studentInformation/' + row.studentNum
      console.log(ul)
      var self = this
      axios
        .get(ul)
        .then(function (res) {
          console.log(res.data)
          self.information = res.data.data
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    /* 监护人获取班级学生信息 */
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
    this.gugetdata()
  }
}
</script>
<style scoped>
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
  height: 130px;
  border-bottom: 1px solid #c1d3de;
  padding: 10px;
}
</style>
