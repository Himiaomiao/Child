<template>
  <div class="right1">
    <el-table
      :row-class-name="tableRowClassName"
      :data="tables.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
    >
      <el-table-column
        label="班级编号"
        prop="classnum"
        align="center"
      ></el-table-column>
      <el-table-column
        label="班级人数"
        prop="classpeople"
        align="center"
      ></el-table-column>
      <el-table-column
        label="班级描述"
        prop="classdescript"
        align="center"
      ></el-table-column>
      <el-table-column
        label="班级老师"
        prop="classtc"
        align="center"
      ></el-table-column>
      <el-table-column
        label="老师职责"
        prop="classtcduty"
        align="center"
      ></el-table-column>
      <el-table-column
        label="老师手机号"
        prop="classtctel"
        align="center"
      ></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="{}">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
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
      <el-pagination
        layout="prev, pager, next, sizes, total, jumper"
        :total="tableData.length"
        @current-change="current_change"
        @size-change="handleSizeChange"
        :page-size="pagesize"
        :page-sizes="[10, 20, 30, 40, 50, 60, 70]"
      ></el-pagination>
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
            <el-input v-model="form.num" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级人数" :label-width="formLabelWidth">
            <el-input v-model="form.person" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级老师" :label-width="formLabelWidth">
            <el-select v-model="form.teacher" placeholder="请选择活动区域">
              <el-option label="张三" value="张三"></el-option>
              <el-option label="李四" value="李四"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="老师职责" :label-width="formLabelWidth">
            <el-select v-model="form.duty" placeholder="请选择教师职责">
              <el-option label="生活老师" value="生活老师"></el-option>
              <el-option label="班主任" value="班主任"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="老师手机号" :label-width="formLabelWidth">
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
          <el-button @click="cancelForm">重 置</el-button>
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
      search: '',
      pagesize: 0,
      currentPage: 1,
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
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then((_) => {
          this.loading = true
          axios
            .post('http://localhost:3000/class', {
              updata: this.form
            })
            .then(function (res) {
              this.timer = setTimeout(() => {
                done()
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  this.loading = false
                }, 400)
              }, 2000)
              this.$message({
                message: '更新成功！！！！',
                type: 'success'
              })
            })
            .catch(function (err) {
              console.log(err)
              this.$message.error('更新失败！！！！')
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

    /* 控制不同屏幕渲染的分页条目 */
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
    /* 从后端接口获取班级数据 */
    getdata: function () {
      /* 保存this信息 */
      var self = this
      axios
        .get('http://localhost:3000/class')
        .then(function (res) {
          /* 获取数据赋值给tableData渲染 */
          self.tableData = res.data.class
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    /* 教师获取自己班级信息 */
    tcgetdata() {
      var mydata = this.$store.state.userInfo.data.id
      var self = this
      axios
        .post('', {
          tc_id: mydata
        })
        .then(function (res) {
          self.tableData = res.data.class
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    /* 每页显示的条目 */
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    /* 改变当前页面 */
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },

    /* 点击修改按钮触发函数 */
    handleEdit(index, row) {
      this.dialog = true
      console.log(index)
      console.log(row)
      this.form.num = row.classnum
      this.form.person = row.classpeople
      this.form.teacher = row.classtc
      this.form.duty = row.tcduty
      this.form.tctel = row.classtctel
      this.form.des = row.classdescript
    }
  },
  /* 计算属性 */
  computed: {
    /* 获取登陆用户信息 */
    userInfo() {
      return this.$store.state.userInfo
    },
    /* 实现表格模糊查询功能 */
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
  /* moubted当页面组件以及ele组件渲染完毕时执行，实现获取获取后端数据 */
  mounted() {
    var identity = this.$store.state.userInfo.data.identify
    if (identity === 'teacher') this.tcgetdata()
    else this.getdata()

    this.Pagesize()
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
.right-top {
  width: 1030px;
  height: 35px;
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
