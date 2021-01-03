<template>
  <div class="right-main">
    <div class="right-main-1">
      <div class="tag-group" style="float: left">
        <el-tag type="info" effect="dark"> 种类 </el-tag>
        <el-tag
          style="margin-left: 10px"
          v-for="item in items"
          :key="item.label"
          :type="item.type"
          :effect="item.typeeffect"
          @click="myclick(item)"
        >
          {{ item.label }}
        </el-tag>
      </div>
      <div class="tag-group" style="float: left; margin-top: 5px">
        <el-tag type="info" effect="dark"> 口味 </el-tag>
        <el-tag
          style="margin-left: 10px"
          v-for="item in items2"
          :key="item.label"
          :type="item.type"
          :effect="item.typeeffect"
          @click="myclick(item)"
        >
          {{ item.label }}
        </el-tag>
      </div>

      <el-input
        style="margin-top: 8px"
        placeholder="请输入关键字"
        prefix-icon="el-icon-search"
        v-model="search"
      ></el-input>

      <div style="margin-top: 10px">
        <el-button type="primary" @click="Delete" :disabled="mydisable"
          >删除选中</el-button
        >
        <el-button type="primary" @click="Nodelete" :disabled="mydisable"
          >取消选中</el-button
        >
      </div>
    </div>
    <div class="add-food2" style="margin-top: 20px">
      <el-table :data="tables" border style="width: 100%" ref="filterTable">
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
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              type="text"
              size="small"
              >详情</el-button
            >
            <el-button
              type="text"
              size="small"
              :disabled="mydisable"
              @click="handleEdit1(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              v-show="myshow"
              type="text"
              size="small"
              @click="handleEvaluat(scope.$index, scope.row)"
              >评价</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--食物详情以及修改食物信息-->
    <el-drawer
      title="食物详情"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ttb"
      custom-class="demo-drawer"
      ref="drawer"
      size="95%"
    >
      <div class="heard" style="width: 100%; height: 50px">
        <el-radio-group
          v-model="radio3"
          size="small"
          style="float: left"
          @change="mychang"
        >
          <el-radio-button
            label="信息详情"
            :disabled="mydisable"
          ></el-radio-button>
          <el-radio-button
            label="修改信息"
            :disabled="mydisable"
          ></el-radio-button>
        </el-radio-group>
      </div>
      <div class="demo-drawer__content">
        <el-form :model="information" :inline="true" class="demo-form-inline">
          <el-form-item label="食物编号">
            <el-input
              v-model="information.foodNum"
              :disabled="mydisable1"
              style="min-width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="食物名称">
            <el-input
              v-model="information.foodName"
              style="min-width: 250px"
              :disabled="mydisable1"
            ></el-input>
          </el-form-item>
          <el-form-item label="适宜餐次">
            <el-select
              v-model="information.foodSuitable"
              placeholder="适宜餐次"
              :disabled="mydisable1"
            >
              <el-option label="早餐" value="早餐"></el-option>
              <el-option label="午餐" value="午餐"></el-option>
              <el-option label="晚餐" value="晚餐"></el-option>
              <el-option label="早午餐" value="早午餐"></el-option>
              <el-option label="晚午餐" value="晚午餐"></el-option>
              <el-option label="早晚餐" value="早晚餐"></el-option>
              <el-option label="任何餐次" value="任何餐次"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食物口感">
            <el-form-item label="食物口感">
              <el-select
                v-model="information.foodTaste"
                placeholder="食物口感"
                :disabled="mydisable1"
              >
                <el-option label="咸香" value="咸香"></el-option>
                <el-option label="清淡" value="清淡"></el-option>
                <el-option label="糯香" value="糯香"></el-option>
                <el-option label="辣香" value="辣香"></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="食物工艺">
            <el-select
              v-model="information.foodTechnology"
              placeholder="食物工艺"
              :disabled="mydisable1"
            >
              <el-option label="红烧" value="红烧"></el-option>
              <el-option label="煮" value="煮"></el-option>
              <el-option label="蒸" value="蒸"></el-option>
              <el-option label="卤" value="卤"></el-option>
              <el-option label="炒" value="炒"></el-option>
              <el-option label="炖" value="炖"></el-option>
              <el-option label="凉拌" value="凉拌"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食物种类">
            <el-input
              v-model="information.foodType"
              style="min-width: 250px"
              :disabled="mydisable1"
            ></el-input>
          </el-form-item>
          <el-form-item label="食物重量">
            <el-input
              v-model="information.foodWeight"
              style="min-width: 250px"
              :disabled="mydisable1"
            ></el-input>
          </el-form-item>
          <el-form-item label="热量">
            <el-input
              v-model="information.energy"
              style="min-width: 250px"
              :disabled="mydisable1"
            ></el-input>
          </el-form-item>
          <el-form-item label="脂质含量">
            <el-input
              v-model="information.fat"
              style="min-width: 250px"
              :disabled="mydisable1"
            ></el-input>
          </el-form-item>
          <el-form-item label="食物介绍">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6 }"
              placeholder="请输入内容"
              v-model="information.foodIntroduction"
              :disabled="mydisable1"
              style="min-width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="食物辅料">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6 }"
              placeholder="请输入内容"
              v-model="information.foodMaterials"
              :disabled="mydisable1"
              style="min-width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="做法">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6 }"
              placeholder="请输入内容"
              v-model="information.foodMake"
              :disabled="mydisable1"
              style="min-width: 350px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm" :disabled="mydisable1"
            >取 消</el-button
          >
          <el-button
            type="primary"
            :disabled="mydisable1"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
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
          placeholder="请输入评价学生学号"
          v-model="studentnum"
          clearable
          style="width: 200px"
        >
        </el-input>
        <div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20 }"
            placeholder="请输入反馈信息"
            v-model="EvaluatText"
            style="width: 80%; margin-top: 10px"
            clearable
          ></el-input>
        </div>
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
    <el-pagination
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[20, 40, 60, 80, 100, 150]"
      @current-change="current_change"
      @size-change="handleSizeChange"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      myshow: false,
      studentnum: '',
      pagesize: 20,
      currentPage: 1,
      total: 0,
      EvaluatDialog: false,
      EvaluatValue: 0,
      EvaluatLoading: false,
      EvaluatText: '',
      EvaluatTime: '',
      items: [
        { type: '', label: '豆类', typeeffect: 'plain' },
        { type: '', label: '蔬菜类', typeeffect: 'plain' },
        { type: '', label: '猪肉类', typeeffect: 'plain' },
        { type: '', label: '面类', typeeffect: 'plain' },
        { type: '', label: '牛肉类', typeeffect: 'plain' },
        { type: '', label: '鸡肉类', typeeffect: 'plain' },
        { type: '', label: '鸭肉类', typeeffect: 'plain' },
        { type: '', label: '羊肉类', typeeffect: 'plain' },
        { type: '', label: '瓜类', typeeffect: 'plain' },
        { type: '', label: '鱼肉类', typeeffect: 'plain' },
        { type: '', label: '汤类', typeeffect: 'plain' },
        { type: '', label: '粥类', typeeffect: 'plain' },
        { type: '', label: '水果类', typeeffect: 'plain' }
      ],
      items2: [
        { type: 'warning', label: '炒 ', typeeffect: 'plain' },
        { type: 'warning', label: '拌', typeeffect: 'plain' },
        { type: 'warning', label: '冻', typeeffect: 'plain' },
        { type: 'warning', label: '煮', typeeffect: 'plain' },
        { type: 'warning', label: '蒸', typeeffect: 'plain' },
        { type: 'warning', label: '炖 ', typeeffect: 'plain' },
        { type: 'warning', label: '溜', typeeffect: 'plain' },
        { type: 'warning', label: '爆', typeeffect: 'plain' },
        { type: 'warning', label: '烧', typeeffect: 'plain' },
        { type: 'warning', label: '烩', typeeffect: 'plain' },
        { type: 'warning', label: '扒', typeeffect: 'plain' },
        { type: 'warning', label: '炸', typeeffect: 'plain' },
        { type: 'warning', label: '焖', typeeffect: 'plain' },
        { type: 'warning', label: '煎', typeeffect: 'plain' },
        { type: 'warning', label: '凉菜', typeeffect: 'plain' },
        { type: 'warning', label: '腌', typeeffect: 'plain' },
        { type: 'warning', label: '拔丝', typeeffect: 'plain' },
        { type: 'warning', label: '塌', typeeffect: 'plain' }
      ],
      radio3: '信息详情',
      dialog: false,
      loading: false,
      search: '',
      mydisable: true,
      mydisable1: true,
      textarea2: '',
      information: {
        foodNum: '',
        energy: '',
        fat: '',
        foodIntroduction: '',
        foodMake: '',
        foodSuitable: '',
        foodTaste: '',
        foodTechnology: '',
        foodType: '',
        foodWeight: '',
        protein: '',
        foodMaterials: ''
      },
      fit: 'fill',
      tableData: [],
      foodNum: '',
      foodName: '',
      studentName: '',
      classnum: ''
    }
  },
  methods: {
    /* 改变页面大小 */
    handleSizeChange(psize) {
      this.pagesize = psize
      axios
        .post('http://114.55.141.250:8181/food/getlistbyback', {
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
        .post('http://114.55.141.250:8181/food/getlistbyback', {
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

    /* 取消评价 */
    EvaluatCancelForm() {
      this.EvaluatLoading = false
      this.EvaluatDialog = false
      clearTimeout(this.EvaluatTime)
    },
    /* 提交评价信息 */
    async handleEvaluatClose(done) {
      const getUl =
        'http://114.55.141.250:8181/student/information/' + this.studentnum
      await axios
        .get(getUl)
        .then((res) => {
          console.log('获取学生信息')
          console.log(res.data)
          if (res.data !== null) {
            this.classnum = res.data.classNum
            this.studentName = res.data.studentName
          }
        })
        .catch((err) => {
          console.log(err.data)
        })
      // 提交评价信息函数
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
              .post('http://114.55.141.250:8181/food/appraisement', {
                description: this.EvaluatText,
                useNum: id,
                useIdentity: identify,
                foodName: this.foodName,
                satisfy: this.EvaluatValue,
                stuId: this.studentnum,
                stuName: this.studentName,
                classId: this.classnum,
                schoolId: 'school_1'
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
      this.foodNum = row.foodNum
      this.foodName = row.foodName
    },
    myclick(item) {
      console.log('变色')
      console.log(item)
      if (item.typeeffect === 'plain') {
        item.typeeffect = 'dark'
      } else {
        item.typeeffect = 'plain'
      }
    },
    /* 关闭弹出框,提交修改学生信息表单 */
    handleClose(done) {
      if (this.mydisable1 === true) {
        this.loading = false
        this.dialog = false
        clearTimeout(this.timer)
      } else {
        var self = this
        console.log(self.information)
        if (this.loading) {
          return
        }
        this.$confirm('确定要提交表单吗？')
          .then((_) => {
            this.loading = true
            axios
              .put('http://114.55.141.250:8181/food/update', {
                energy: this.information.energy,
                fat: this.information.fat,
                foodIntroduction: this.information.foodIntroduction,
                foodMake: this.information.foodMake,
                foodMaterials: this.information.foodMaterials,
                foodName: this.information.foodName,
                foodNum: this.information.foodNum,
                foodSuitable: this.information.foodSuitable,
                foodTaste: this.information.foodTaste,
                foodTechnology: this.information.foodTechnology,
                foodType: this.information.foodType,
                foodWeight: this.information.foodWeight,
                protein: this.information.protein
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
    /* 切换信息修改和信息展示 */
    mychang(value) {
      console.log(value)
      if (value === '修改信息') this.mydisable1 = false
      else this.mydisable1 = true
    },
    /* 点击详情获取学生信息 */
    handleEdit(index, row) {
      console.log('获取食物详情')
      console.log(index, row)
      this.dialog = true
      var ul = 'http://114.55.141.250:8181/food/detail/' + row.foodNum
      console.log('获取食物详情链接' + ul)
      var self = this
      axios
        .get(ul)
        .then(function (res) {
          console.log('食物详情信息数据')
          console.log(res.data)
          self.information = res.data.data
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    /* 修改食物信息 */
    handleEdit1(index, row) {
      console.log('食物修改')
      console.log(index, row)
      this.dialog = true
      this.radio3 = '修改信息'
      this.mydisable1 = false
      var ul = 'http://114.55.141.250:8181/food/detail/' + row.foodNum
      console.log('获取食物详情链接' + ul)
      var self = this
      axios
        .get(ul)
        .then(function (res) {
          console.log('食物详情信息数据')
          console.log(res.data)
          self.information = res.data.data
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    /* 删除选中的食物 */
    Delete() {
      console.log(this.$refs.filterTable.selection)
      var temp = this.$refs.filterTable.selection
      console.log(temp)
      var mydata = []
      for (var i = 0; i < temp.length; i++) {
        mydata.push(temp[i].foodNum)
      }
      console.log(mydata)
      axios
        .delete('http://114.55.141.250:8181/food/delete', mydata)
        .then(function (res) {
          console.log(res.data)
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
    },
    /* 获取食物信息 */
    getdata: function () {
      axios
        .post('http://114.55.141.250:8181/food/getlistbyback', {
          current: 1,
          size: 20
        })
        .then((res) => {
          console.log(res.data)
          this.tableData = res.data.data
          this.total = res.data.pagestatus.total
        })
        .catch((ree) => {
          console.log(ree.data)
        })
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
    if (identity === 'cook') {
      this.mydisable = false
    }
    if (identity === 'teacher' || identity === 'guardian') {
      this.myshow = true
    }
    this.getdata()
  }
}
</script>

<style  scoped>
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .right-main {
    min-height: 12.031rem;
  }
}
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .right-main {
    min-height: 6.1rem;
  }
}
@media screen and (min-width: 1500px) {
  .right-main {
    min-height: 7.1rem;
  }
}
@media screen and (min-width: 1270px) and (max-width: 1500px) and (min-height: 650px) {
  .right-main {
    min-height: 4.5rem;
  }
}
@media screen and (min-width: 1270px) and (max-width: 1500px) {
  .right-main {
    min-height: 3.5rem;
  }
}
.right-main-1 {
  width: 100%;
  border-bottom: 1px solid #c1d3de;
  padding: 10px;
}
</style>
