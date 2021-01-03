<template>
  <div class="right1">
    <el-table :data="tableData">
      <el-table-column
        label="班级编号"
        prop="classNum"
        align="center"
      ></el-table-column>
      <el-table-column
        label="班级人数"
        prop="classPeoplesum"
        align="center"
      ></el-table-column>
      <el-table-column
        label="班级描述"
        prop="classDescription"
        align="center"
      ></el-table-column>
      <el-table-column
        label="老师"
        prop="tcName"
        align="center"
      ></el-table-column>
      <el-table-column
        label="职责"
        prop="tcDuty"
        align="center"
      ></el-table-column>
      <el-table-column
        label="手机号"
        prop="tcTelnum"
        align="center"
      ></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="primary"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)"
            :disabled="userInfo.data.identify === 'teacher' ? false : true"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <!--分页部分-->
    </div>
    <!--修改班级信息弹出表单部分-->
    <el-drawer
      title="更新班级信息!"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="班级编号" :label-width="formLabelWidth">
            <el-input v-model="form.num" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="班级人数" :label-width="formLabelWidth">
            <el-input v-model="form.person" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级老师" :label-width="formLabelWidth">
            <el-select v-model="form.teacher" placeholder="请选择班级老师">
              <el-option label="张三" value="张三"></el-option>
              <el-option label="李四" value="李四"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职责" :label-width="formLabelWidth">
            <el-select v-model="form.duty" placeholder="请选择教师职责">
              <el-option label="生活老师" value="生活老师"></el-option>
              <el-option label="班主任" value="班主任"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.tctel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级描述" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.des"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确定更改" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ClassInformation',
  data() {
    return {
      dialog: false,
      loading: false,
      tableData: [],
      form: {
        num: '',
        person: '',
        teacher: '',
        duty: '',
        tctel: '',
        des: ''
      },
      formLabelWidth: '80px',
      timer: null
    }
  },
  methods: {
    /* 关闭弹出框 */
    handleClose(done) {
      var mydata = this.$store.state.userInfo.data.id
      var self = this
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then((_) => {
          this.loading = true
          axios
            .put('http://114.55.141.250:8181/class/updatedetail', {
              classNum: this.form.num,
              classPeoplesum: this.form.person,
              classDescription: this.form.des,
              tcName: this.form.teacher,
              tcDuty: this.form.duty,
              tcTelnum: this.form.tctel,
              tcNum: mydata
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
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
    /* 点击修改按钮触发函数 */
    handleEdit(index, row) {
      this.dialog = true
      console.log(index)
      console.log(row)
      this.form.num = row.classNum
      this.form.person = row.classPeoplesum
      this.form.teacher = row.tcName
      this.form.duty = row.classtcduty
      this.form.tctel = row.tcTelnum
      this.form.des = row.classDescription
    }
  },
  /* 教师身份从获取自己班级信息 */

  /* 计算属性 */
  computed: {
    /* 获取登陆用户信息 */
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  /* moubted当页面组件以及ele组件渲染完毕时执行，实现获取获取后端数据 */
  mounted() {
    var mydata = this.$store.state.userInfo.data.id
    var self = this
    var ul = 'http://114.55.141.250:8181/class/getdetailbytc/' + mydata
    axios
      .get(ul)
      .then(function (res) {
        console.log(res.data)
        self.tableData.push(res.data.data)
        console.log(self.tableData)
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>
<style scoped>
.right {
  width: 1030px;
  height: 100%;
  /* overflow-y: auto;*/
  overflow-x: hidden;
  margin-left: 221px;
  border: 1px solid #c1d3de;
}

.right1 {
  width: 100%;
  min-height: 420px;
}
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-table .main-row {
  background: #c0c4cc69;
}
</style>
