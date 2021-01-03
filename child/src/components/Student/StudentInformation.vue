<template>
  <div class="center">
    <!--学生信息-->
    <div class="right-main" style="height: 150px !important">
      <div class="right-main-1" style="padding-top: 40px">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="search"
        ></el-input>
      </div>
      <div class="right-main-2" style="width: 100%; height: 100%">
        <el-table
          ref="filterTable"
          :data="
            tables.slice((currentPage - 1) * pagesize, currentPage * pagesize)
          "
          style="width: 100%"
        >
          <el-table-column type="selection" min-width="55"></el-table-column>
          <el-table-column
            v-if="first"
            prop="classNum"
            label="班级"
            sortable
            width="120"
            column-key="date"
            :filters="deal"
            :filter-method="filterHandler"
          ></el-table-column>
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
            prop="studentHeight"
            label="身高"
            min-width="80"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="studentWeight"
            label="体重"
            min-width="80"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="studentAge"
            label="年龄"
            min-width="80"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="studentAddress"
            label="地址"
            min-width="180"
          ></el-table-column>
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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'StudentInformation',
  data() {
    return {
      search: '',
      first: true,
      deal: [],
      pagesize: 0,
      currentPage: 1,
      textarea2: '',
      formInline: {
        studentNum: '',
        studentName: '',
        classNum: '',
        studentGd: ''
      },
      fit: 'fill',
      isCollapse: false,
      tableData: []
    }
  },
  methods: {
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
    /* 获取全部学生信息 */
    getdata: function () {
      /* 保存this信息 */
      var self = this
      axios
        .get('http://114.55.141.250:8181/all/studentList')
        .then(function (res) {
          /* 获取数据赋值给tableData渲染 */
          console.log(res.data)
          // self.tableData = res.data.data
          var temp = res.data.data
          for (var i = 0; i < temp.length; i++) {
            var tempstu = temp[i].studentNum
            var ul =
              'http://114.55.141.250:8181/student/information/' + tempstu
            axios
              .get(ul)
              .then((res) => {
                console.log(res.data)
                var obj = {}
                obj.text = res.data.classNum
                obj.value = res.data.classNum
                self.deal.push(obj)
                self.tableData.push(res.data)
              })
              .catch((err) => {
                console.log(err.data)
              })
          }
          self.table = res.data.student.student
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    /* 获取表格班级筛选的筛选条目 */
    getclass() {
      var self = this
      axios
        .get('')
        .then(function (res) {
          self.filters = res.filters
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
    /* 获取用户身份 */
    var identity = this.$store.state.userInfo.data.identify
    /* 用户身份为教师默认显示自己班级学生 */
    if (identity === 'teacher') {
      this.first = false
      this.tcgetdata()
    } else {
      this.getdata()
    }
    this.Pagesize()
  }
}
</script>
<style scoped>
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
