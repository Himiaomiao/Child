<template>
  <div class="center">
    <!--套餐信息-->
    <div class="right-main">
      <div class="right-main-1">
        <!--模糊查询-->
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="search"
        ></el-input>
        <div style="margin-top: 10px">
          <!--顶部删除选中和取消选中-->
          <el-button type="primary" @click="Delete" :disabled="mydisable"
            >删除选中</el-button
          >
          <el-button type="primary" @click="Nodelete" :disabled="mydisable"
            >取消选中</el-button
          >
        </div>
      </div>
      <div
        class="right-main-2"
        style="margin-top: 20px; width: 100%; height: 100%"
      >
        <!--套餐信息渲染-->
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
            prop="spNum"
            label="套餐编号"
            min-width="100"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="spName"
            label="套餐名称"
            min-width="100"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="spStusum"
            label="套餐人数"
            min-width="100"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="创建时间"
            min-width="150"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="updateT"
            label="更新时间"
            min-width="150"
          ></el-table-column>
          <el-table-column align="center" label="操作" min-width="250">
            <template slot-scope="scope">
              <!--套餐信息详情按钮-->
              <el-button
                type="warning"
                size="mini"
                @click="handleDetails(scope.$index, scope.row)"
                slot="reference"
                >详情</el-button
              >
              <!--评价套餐按钮-->
              <el-button
                size="mini"
                type="success"
                @click="handleEvaluat(scope.$index, scope.row)"
                slot="reference"
                >评价</el-button
              >
              <!--修改套餐按钮-->
              <el-button
                size="mini"
                type="danger"
                @click="handleUpdate(scope.$index, scope.row)"
                :disabled="mydisable"
                >修改</el-button
              >
              <!--添加食物按钮-->
              <el-button
                type="primary"
                size="mini"
                @click="handleAddFood(scope.$index, scope.row)"
                slot="reference"
                :disabled="mydisable"
                >添加食物</el-button
              >
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
      <!--评价套餐信息-->
      <el-drawer
        title="很荣幸收集到您的评价 !"
        :before-close="handleEvaluatClose"
        :visible.sync="EvaluatDialog"
        direction="ttb"
        custom-class="demo-drawer"
        ref="EvaluatDrawer"
        size="90%"
      >
        <div class="demo-drawer__content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20 }"
            placeholder="请输入反馈信息"
            v-model="EvaluatText"
            style="width: 80%"
            clearable
          ></el-input>
          <div style="margin-top: 10px">
            <span>您的评分</span>
            <el-rate v-model="EvaluatValue" show-text></el-rate>
          </div>
          <div class="demo-drawer__footer">
            <el-button @click="EvaluatCancelForm">取 消</el-button>
            <el-button
              type="primary"
              @click="$refs.EvaluatDrawer.closeDrawer()"
              :loading="EvaluatLoading"
              >{{ EvaluatLoading ? "提交中 ..." : "提交" }}</el-button
            >
          </div>
        </div>
      </el-drawer>
      <!--添加食物信息部分-->
    </div>
    <el-drawer
      title="平台部分食物"
      ref="AddDrawe"
      :visible.sync="AddFoodTable"
      direction="rtl"
      size="70%"
      :before-close="AddHandleClose"
    >
      <el-table
        :data="foodData"
        style="width: 100%"
        max-height="400"
        align="center"
        ref="filterTable1"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="foodNum" label="食物编号"></el-table-column>
        <el-table-column property="foodName" label="食物名称"></el-table-column>
        <el-table-column
          property="foodTaste"
          label="食物口味"
        ></el-table-column>
        <el-table-column
          property="foodTechnology"
          label="食物工艺"
        ></el-table-column>
        <el-table-column property="foodType" label="食物种类"></el-table-column>
        <el-table-column property="energy" label="食物能量"></el-table-column>
        <el-table-column property="fat" label="脂肪含量"></el-table-column>
        <el-table-column
          property="protein"
          label="蛋白质含量"
        ></el-table-column>
      </el-table>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="时间">
            <el-select v-model="week" placeholder="时间">
              <el-option label="星期一" value="1"></el-option>
              <el-option label="星期二" value="2"></el-option>
              <el-option label="星期三" value="3"></el-option>
              <el-option label="星期四" value="4"></el-option>
              <el-option label="星期五" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="餐次">
            <el-select v-model="mealtime" placeholder="餐次">
              <el-option label="早餐" value="早餐"></el-option>
              <el-option label="午餐" value="午餐"></el-option>
              <el-option label="晚餐" value="晚餐"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食物质量">
            <el-input placeholder="请输入食物质量" v-model="weight"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button @click="giveup">取 消</el-button>
        <el-button
          type="primary"
          @click="$refs.AddDrawe.closeDrawer()"
          :loading="AddFoodLoading"
          >{{ AddFoodLoading ? "添加中 ..." : "添加" }}</el-button
        >
      </div>
    </el-drawer>
    <!--修改套餐信息部分-->
    <el-drawer
      title="修改套餐信息 !"
      :before-close="handleUpdateClose"
      :visible.sync="Updatedialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="UpdateDrawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="套餐编号" :label-width="formLabelWidth">
            <el-input v-model="form.spNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="套餐名称" :label-width="formLabelWidth">
            <el-input v-model="form.spName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="配餐学生" :label-width="formLabelWidth">
            <el-input v-model="form.spStusum" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="UpdatecancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="$refs.UpdateDrawer.closeDrawer()"
            :loading="Updateloading"
            >{{ Updateloading ? "提交中 ..." : "提交" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  name: 'StudentInformation',
  data() {
    return {
      formInline: {},
      /* 评价信息数据 */
      EvaluatDialog: false,
      EvaluatValue: 0,
      EvaluatLoading: false,
      EvaluatText: '',
      EvaluatTime: '',
      /* 修改数据 */
      Updatedialog: false,
      Updateloading: false,
      UpdateTimer: null,
      form: {
        spNum: '',
        spName: '',
        spStusum: ''
      },
      /* 添加食物 */
      AddFoodTable: false,
      AddFoodLoading: false,
      AddFoodTime: '',
      /* 食物详情 */
      week: '',
      period: '',
      mealtime: '',
      weight: '',
      spNum: '',
      spName: '',
      id: '',
      foodData: [],
      formLabelWidth: '80px',
      mydisable: true,
      search: '',
      pagesize: 0,
      currentPage: 1,
      textarea2: '',
      fit: 'fill',
      tableData: [],
      mydata: []
    }
  },
  methods: {
    /* 取消评价 */
    EvaluatCancelForm() {
      this.EvaluatLoading = false
      this.EvaluatDialog = false
      clearTimeout(this.EvaluatTime)
    },
    /* 提交评价信息 */
    handleEvaluatClose(done) {
      console.log('提交评价信息')
      console.log(this.spName)
      var self = this
      if (this.EvaluatText === '') {
        this.EvaluatCancelForm()
      } else {
        var identify = this.$store.state.userInfo.data.identify
        var id = this.$store.state.userInfo.data.id
        if (this.EvaluatLoading) {
          return
        }
        this.$confirm('确定要提交表单吗？')
          .then((_) => {
            this.EvaluatLoading = true
            axios
              .post('http://114.55.141.250:8181/catering/appraisement', {
                description: this.EvaluatText,
                useNum: id,
                useIdentity: identify,
                spNum: this.spNum,
                spName: this.spName,
                satisfy: this.EvaluatValue
              })
              .then(function (res) {
                console.log(res.data)

                self.EvaluatTime = setTimeout(() => {
                  done()
                  // 动画关闭需要一定的时间
                  setTimeout(() => {
                    self.EvaluatLoading = false
                  }, 400)
                }, 2000)
                if (res.data.meta.status === '200') {
                  self.$message({
                    message: '评价成功！！！！',
                    type: 'success'
                  })
                } else {
                  self.$message.error('评价失败！！！！')
                }
                console.log('评价成功')
              })
              .catch(function (err) {
                console.log(err)
                self.$message.error('评价失败！！！！')
              })
          })
          .catch((_) => {
            this.EvaluatLoading = false
            this.EvaluatDialog = false
            clearTimeout(this.EvaluatTime)
          })
      }
    },
    /* 打开评价信息表 */
    handleEvaluat(index, row) {
      this.EvaluatDialog = true
      console.log(row)
      this.spNum = row.spNum
      this.spName = row.spName
    },
    /* 提交添加食物函数 */
    AddHandleClose(done) {
      console.log('选中需要添加得食物信息')
      console.log(this.$refs.filterTable1.selection)
      var temp = this.$refs.filterTable1.selection
      var mydata = []
      for (var i = 0; i < temp.length; i++) {
        var obj = {}
        obj.foodNum = temp[i].foodNum
        obj.mealtime = this.mealtime
        obj.week = this.week
        obj.weight = this.weight
        obj.spNum = this.spNum
        obj.period = '周'
        mydata.push(obj)
      }
      console.log(mydata)
      if (this.AddFoodLoading) {
        return
      }
      var self = this
      this.$confirm('确定添加选中食物吗？')
        .then((_) => {
          this.AddFoodLoading = true
          axios
            .post('http://114.55.141.250:8181/catering/addfood', mydata)
            .then(function (res) {
              console.log(res.data)
              if (res.data.meta.status === '200') {
                console.log('食物添加成功')
                self.$message({
                  message: '食物添加成功',
                  type: 'success'
                })
              } else {
                self.$message({
                  message: '添加失败',
                  type: 'warn'
                })
              }
            })
            .catch(function (err) {
              console.log(err)
              self.$message({
                message: '添加失败',
                type: 'warn'
              })
            })
          self.AddFoodTime = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              self.AddFoodLoading = false
            }, 400)
          }, 2000)
        })
        .catch((_) => {
          this.AddFoodLoading = false
          this.AddFoodTable = false
          clearTimeout(this.AddFoodTime)
        })
    },
    /* 取消添加食物部分 */
    giveup() {
      this.$refs.filterTable1.clearSelection()
      this.AddFoodLoading = false
      clearTimeout(this.AddFoodTime)
      this.AddFoodTable = false
    },
    /* 添加食物 */
    handleAddFood(index, row) {
      var cur = parseInt(Math.random() * 70)
      var self = this
      this.AddFoodTable = true
      /* 保存配餐编号 */
      this.spNum = row.spNum
      console.log('保存的配餐员编号' + this.spNum)
      console.log(index, row)
      axios
        .post('http://114.55.141.250:8181/food/getlistbyback', {
          current: cur,
          size: 200
        })
        .then(function (res) {
          self.foodData = res.data.data
          console.log(res.data)
        })
        .catch(function (err) {
          console.log(err.date)
        })
    },
    /* 关闭更新窗口提交表单 */
    handleUpdateClose(done) {
      console.log('更新食物')
      if (this.Updateloading) {
        return
      }
      var ul =
        'http://114.55.141.250:8181/catering/update?' +
        'spName=' +
        this.form.spName +
        '&spNum=' +
        this.form.spNum +
        '&spStusum=' +
        this.form.spStusum
      var self = this
      this.$confirm('确定要提交表单吗？')
        .then((_) => {
          this.Updateloading = true
          axios
            .put(ul)
            .then(function (res) {
              self.UpdateTimer = setTimeout(() => {
                done()
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  self.Updateloading = false
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
          this.Updateloading = false
          this.Updatedialog = false
          clearTimeout(this.UpdateTimer)
        })
    },
    /* 取消更新表单提交 */
    UpdatecancelForm() {
      this.Updatedialog = false
      this.Updateloading = false
      clearTimeout(this.UpdateTimer)
    },
    /* 查看套餐详情函数 */
    handleDetails(index, row) {
      console.log(index, row)
      // this.$store.commit('getrow', row)
      // const routeData = this.$router.resolve({ path: '/test' })
      const routeData = this.$router.resolve({
        path: '/test',
        query: {
          id: row.spNum,
          name: row.spName,
          identify: this.$store.state.userInfo.data.identify
        }
      })
      window.open(routeData.href, '_blank')
    },
    /* 修改套餐按钮点击函数 */
    handleUpdate(index, row) {
      console.log(index, row)
      this.form.spNum = row.spNum
      this.form.spName = row.spName
      this.form.spStusum = row.spStusum
      this.Updatedialog = true
    },
    /* 控制页面大小函数 */
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
    /* 获取页面套餐信息 */
    getdata: function () {
      /* 保存this信息 */
      var self = this
      axios
        .get('http://114.55.141.250:8181/catering/getlist/')
        .then(function (res) {
          /* 获取数据赋值给tableData渲染 */
          console.log(res.data)
          var temp = res.data.StuPackage
          for (var i = 0; i < temp.length; i++) {
            var time = dayjs(Number(temp[i].createTime)).format(
              'YYYY-MM-DD HH:mm:ss'
            )
            var obj = {}
            obj.spNum = temp[i].spNum
            obj.spName = temp[i].spName
            obj.spStusum = temp[i].spStusum
            obj.createTime = time
            obj.updateT = temp[i].updateT
            self.tableData.push(obj)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
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

    /* 删除选中的套餐信息函数 */
    Delete() {
      var self = this
      console.log('选中删除的学生信息')
      console.log(this.$refs.filterTable.selection)
      var temp = this.$refs.filterTable.selection
      var id = ''
      for (var i = 0; i < temp.length; i++) {
        id = temp[i].spNum
        console.log(id)
        var ul = 'http://114.55.141.250:8181/catering/delete/' + id
        axios
          .delete(ul)
          .then(function (res) {
            console.log(res)
            self.$message({
              message: '删除成功，刷新查看最新数据',
              type: 'success'
            })
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    /* 取消删除选中的套餐信息 */
    Nodelete() {
      this.$refs.filterTable.clearSelection()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    /* 删除套餐食物 */
    DeleteFood(index, row) {
      console.log('打印删除食物信息')
      console.log(index)
      console.log(row)
      console.log(this.$route.params)
      console.log(window.location.href)
      this.$router.push('/upPakge')
      // window.location.href = '/addpackage'
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
    /* 判断用户角色，控制按钮权限 */
    var identity = this.$store.state.userInfo.data.identify
    if (identity === 'cateringstaff') {
      this.mydisable = false
    }
    this.getdata()
    this.Pagesize()
  }
}
</script>
<style scoped>
.el-drawer__header {
  font-size: 0.15rem !important;
  color: #409eff !important;
}
.right-top {
  width: 100%;
  height: 35px;
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
