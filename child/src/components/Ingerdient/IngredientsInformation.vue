<template>
  <div class="right-main">
    <div class="right-main-1">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="search"
      ></el-input>
      <div style="margin-top: 10px">
        <el-button type="primary" @click="Delete()" :disabled="mydisable"
          >删除选中</el-button
        >
        <el-button type="primary" @click="NoDelete()" :disabled="mydisable"
          >取消选中</el-button
        >
      </div>
    </div>
    <div class="add-food2" style="margin-top: 20px">
      <el-table :data="tables" border style="width: 100%" ref="filterTable">
        <el-table-column
          prop="ingNum"
          label="食材编号"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="ingOthername"
          label="食材名称"
          min-width="180"
        ></el-table-column>
        <el-table-column
          prop="ingType"
          label="食材类型"
          min-width="150px"
        ></el-table-column>
        <el-table-column
          prop="energy"
          label="食材能量"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          prop="carbohydrates"
          label="碳水化合物"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          prop="protein"
          label="蛋白质"
          min-width="100px"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              type="text"
              size="small"
              >评价</el-button
            >
            <el-button
              type="text"
              :disabled="mydisable"
              size="small"
              style="margin-right: 5px"
              >修改</el-button
            >
            <el-button
              size="small"
              type="text"
              @click="handleEdit1(scope.$index, scope.row)"
              >详情</el-button
            >
            <!-- </el-popover>-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next, sizes, total, jumper"
        :page-sizes="[20, 40, 60, 80, 100, 150]"
        @current-change="current_change"
        @size-change="handleSizeChange"
        :total="total"
      >
      </el-pagination>
    </div>
    <!--评价食材信息-->
    <el-drawer
      title="很荣幸收集到您的评价 !"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ttb"
      custom-class="demo-drawer"
      ref="drawer"
      size="90%"
    >
      <div class="demo-drawer__content">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          placeholder="请输入反馈信息"
          v-model="textarea2"
          style="width: 80%"
          clearable
        ></el-input>
        <div style="margin-top: 10px">
          <span>您的评分</span>
          <el-rate v-model="value" show-text></el-rate>
        </div>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "提交" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
    <!--食材详情-->
    <el-dialog
      title="食材详情"
      :visible.sync="dialogTableVisible"
      :fullscreen="true"
    >
      <el-table :data="ingData" max-height="300">
        <el-table-column
          align="center"
          property="ingNum"
          label="食材编号"
          min-width="50"
        ></el-table-column>
        <el-table-column
          align="center"
          property="ingOthername"
          label="食材名称"
          min-width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          property="ingType"
          label="食材类型"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="energy"
          label="食材能量"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="carbohydrates"
          label="碳水化合物"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="protein"
          label="蛋白质"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="ingIntroduction"
          label="食材介绍"
          min-width="350px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="ingCharacteristics"
          label="食用建议"
          min-width="400px"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      pagesize: 20,
      currentPage: 1,
      total: '',
      multipleSelection: [],
      dialogTableVisible: false,
      search: '',
      ingData: [],
      value: null,
      dialog: false,
      loading: false,
      mydisable: true,
      textarea2: '',
      formInline: {
        ingName: '',
        ingType: ''
      },
      tableData: [],
      ingNum: '',
      ingName: ''
    }
  },
  methods: {
    /* 改变页面大小 */
    handleSizeChange(psize) {
      this.pagesize = psize
      axios
        .post('http://114.55.141.250:8181/ingredients/getlistbyback', {
          current: this.currentPage,
          size: this.pagesize
        })
        .then((res) => {
          console.log(res.data)
          this.tableData = res.data.data
          this.total = res.data.pagestatus.total
        })
        .catch((ree) => {
          console.log(ree.data)
        })
    },
    /* 改变当前页 */
    current_change: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
      console.log(this.pagesize)
      axios
        .post('http://114.55.141.250:8181/ingredients/getlistbyback', {
          current: this.currentPage,
          size: this.pagesize
        })
        .then((res) => {
          console.log(res.data)
          this.tableData = res.data.data
          this.total = res.data.pagestatus.total
        })
        .catch((ree) => {
          console.log(ree.data)
        })
    },
    /* 详情信息表 */
    handleEdit1(index, row) {
      console.log(index, row)
      this.ingNum = row.ingNum
      var temp = []
      var self = this
      var ul = 'http://114.55.141.250:8181/ingredients/getlist/' + row.ingNum
      axios
        .get(ul)
        .then(function (res) {
          console.log(res.data)
          temp.push(res.data.data)
        })
        .catch(function (err) {
          console.log('出错')
          console.log(err.data)
        })
      self.ingData = temp
      this.dialogTableVisible = true
    },
    /* 提交评价表单 */
    handleClose(done) {
      var self = this
      if (this.textarea2 === '') {
        this.cancelForm()
      } else {
        console.log(this.ingNum)
        console.log(this.ingName)
        var identify = this.$store.state.userInfo.data.identify
        var id = this.$store.state.userInfo.data.id
        if (this.loading) {
          return
        }
        this.$confirm('确定要提交表单吗？')
          .then((_) => {
            this.loading = true
            axios
              .post('http://114.55.141.250:8181/ingredients/appraisement', {
                description: this.textarea2,
                useNum: id,
                useIdentity: identify,
                ingNum: this.ingNum,
                ingName: this.ingName,
                satisfy: this.value
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
                  message: '评价成功！！！！',
                  type: 'success'
                })
                console.log('评价成功')
              })
              .catch(function (err) {
                console.log(err)
                self.$message.error('评价失败！！！！')
              })
          })
          .catch((_) => {
            this.loading = false
            this.dialog = false
            clearTimeout(this.timer)
          })
      }
    },
    /* 打开评价列表 */
    handleEdit(index, row) {
      this.dialog = true
      console.log(index, row)
      this.ingNum = row.ingNum
      this.ingName = row.ingName
    },
    /* 取消评价 */
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
    /* 查询食材信息 */
    onSubmit() {
      axios
        .post('', {
          ingName: this.formInline.ingName,
          ingType: this.formInline.ingType
        })
        .then(function (res) {
          this.tableData = res.data
        })
        .catch(function (err) {
          console.log(err.data)
        })
    },

    /* 获取全部食材信息 */
    getData() {
      /* var self = this
      axios
        .get('http://114.55.141.250:8181/ingredients/getlist')
        .then(function (res) {
          console.log(res.data)
          self.tableData = res.data.data
        })
        .catch(function (err) {
          console.log(err)
        }) */
      axios
        .post('http://114.55.141.250:8181/ingredients/getlistbyback', {
          current: this.currentPage,
          size: this.pagesize
        })
        .then((res) => {
          console.log(res.data)
          this.tableData = res.data.data
          this.total = res.data.pagestatus.total
        })
        .catch((ree) => {
          console.log(ree.data)
        })
    },
    Delete() {
      console.log(this.$refs.filterTable.selection)
      axios
        .post('', {
          deleteData: this.$refs.filterTable.selection
        })
        .then(function (res) {
          this.$message({
            showClose: true,
            message: '恭喜你，这是一条成功消息',
            type: 'success'
          })
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    Nodelete() {
      this.$refs.filterTable.clearSelection()
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
    var identity = this.$store.state.userInfo.data.identify
    if (identity === 'ingadmin') {
      this.mydisable = false
    }
    this.getData()
  }
}
</script>

<style  scoped>
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
