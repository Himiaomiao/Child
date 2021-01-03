<template>
  <div class="school">
    <!--  <div class="right-main-1">
      <el-divider content-position="center">学校套餐推荐</el-divider>
       <el-input
        placeholder="请输入关键字搜索"
        prefix-icon="el-icon-search"
        v-model="search"
      ></el-input>
    </div>-->
    <div
      class="right-main-2"
      style="width: 100%; height: 100%; margin-top: 10px"
    >
      <!--  <el-table :data="tables" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
              v-for="item in props.row.foods"
              :key="item.foodname"
            >
              <el-form-item label="食物名称">
                <span>{{ item.foodname }}</span>
              </el-form-item>
              <el-form-item label="食物质量">
                <span>{{ item.weight }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="套餐编号" prop="spNum"> </el-table-column>
        <el-table-column label="食物编号" prop="numofFood"> </el-table-column>
        <el-table-column label="时间" prop="day"> </el-table-column>
        <el-table-column label="推荐时间" prop="time"> </el-table-column>
      </el-table>
    </div>-->
      <el-tag @click="show()" :effect="myeffect">星期一</el-tag>
      <el-tag
        type="success"
        style="margin-left: 10px"
        @click="show1()"
        :effect="myeffect1"
        >星期二</el-tag
      >
      <el-tag
        type="info"
        style="margin-left: 10px"
        @click="show2()"
        :effect="myeffect2"
        >星期三</el-tag
      >
      <el-tag
        type="warning"
        style="margin-left: 10px"
        @click="show3()"
        :effect="myeffect3"
        >星期四</el-tag
      >
      <el-tag
        type="danger"
        style="margin-left: 10px"
        @click="show4()"
        :effect="myeffect4"
        >星期五</el-tag
      >
    </div>
    <div>
      <el-table
        ref="filterTable"
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
      >
        <el-table-column label="早餐">
          <el-table-column label="食物名称" prop="onename"></el-table-column>
          <el-table-column label="食物质量" prop="oneweight"></el-table-column>
        </el-table-column>
        <el-table-column label="午餐">
          <el-table-column label="食物名称" prop="twoname"></el-table-column>
          <el-table-column label="食物质量" prop="twoweight"></el-table-column>
        </el-table-column>
        <el-table-column label="晚餐">
          <el-table-column label="食物名称" prop="threename"></el-table-column>
          <el-table-column
            label="食物质量"
            prop="threeweight"
          ></el-table-column>
        </el-table-column>
      </el-table>
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
</template>
<script>
import axios from 'axios'
export default {
  name: 'SchoolPackage',
  data() {
    return {
      myeffect: 'plain',
      myeffect1: 'plain',
      myeffect2: 'plain',
      myeffect3: 'plain',
      myeffect4: 'plain',
      pagesize: 10,
      currentPage: 1,
      tableData: [],
      search: '',
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: []
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
    show() {
      console.log('000')
      this.tableData = this.tableData1
      this.myeffect = 'dark'
      this.myeffect1 = 'plain'
      this.myeffect2 = 'plain'
      this.myeffect3 = 'plain'
      this.myeffect4 = 'plain'
    },
    show1() {
      console.log('111')
      this.tableData = this.tableData2
      this.myeffect = 'plain'
      this.myeffect1 = 'dark'
      this.myeffect2 = 'plain'
      this.myeffect3 = 'plain'
      this.myeffect4 = 'plain'
    },
    show2() {
      console.log('222')
      this.tableData = this.tableData3
      this.myeffect = 'plain'
      this.myeffect1 = 'plain'
      this.myeffect2 = 'dark'
      this.myeffect3 = 'plain'
      this.myeffect4 = 'plain'
    },
    show3() {
      console.log('333')
      this.tableData = this.tableData4
      this.myeffect = 'plain'
      this.myeffect1 = 'plain'
      this.myeffect2 = 'plain'
      this.myeffect3 = 'dark'
      this.myeffect4 = 'plain'
    },
    show4() {
      console.log('444')
      this.tableData = this.tableData5
      this.myeffect = 'plain'
      this.myeffect1 = 'plain'
      this.myeffect2 = 'plain'
      this.myeffect3 = 'plain'
      this.myeffect4 = 'dark'
    },
    /* 修改数据格式函数 */
    getarr(arr) {
      var temparr1 = arr

      var tableData1 = []
      var tableData2 = []
      var tableData3 = []

      for (let j = 0; j < temparr1.length; j++) {
        if (temparr1[j].meal === '早') {
          var temparr11 = temparr1[j].foods.split(' ')
          console.log(temparr11.length)
          var temparr12 = temparr1[j].weight.split(' ')
          for (let k = 0; k < temparr11.length; k++) {
            var obj = {}
            obj.onename = temparr11[k]
            obj.oneweight = temparr12[k]
            tableData1.push(obj)
          }
        } else if (temparr1[j].meal === '中') {
          var temparr21 = temparr1[j].foods.split(' ')
          var temparr22 = temparr1[j].weight.split(' ')
          for (let k = 0; k < temparr21.length; k++) {
            var obj1 = {}
            obj1.twoname = temparr21[k]
            obj1.twoweight = temparr22[k]
            tableData2.push(obj1)
          }
        } else if (temparr1[j].meal === '晚') {
          var temparr31 = temparr1[j].foods.split(' ')
          var temparr32 = temparr1[j].weight.split(' ')
          for (let k = 0; k < temparr31.length; k++) {
            var obj2 = {}
            obj2.threename = temparr31[k]
            obj2.threeweight = temparr32[k]
            tableData3.push(obj2)
          }
        }
      }
      var tempdata = tableData1.map((item, index) => {
        return { ...item, ...tableData2[index] }
      })
      var tableData = tempdata.map((item, index) => {
        return { ...item, ...tableData3[index] }
      })
      return tableData
    },
    getdata() {
      var self = this
      axios
        .get('http://114.55.141.250:8181/data/cateringstatistics/school_1')
        .then(function (res) {
          console.log(res.data.data)
          var temparr1 = []
          var temparr2 = []
          var temparr3 = []
          var temparr4 = []
          var temparr5 = []
          var temp = res.data.data
          for (let i = 0; i < temp.length; i++) {
            if (temp[i].day === '周一') {
              temparr1[i] = temp[i]
            } else if (temp[i].day === '周二') {
              temparr2.push(temp[i])
            } else if (temp[i].day === '周三') {
              temparr3.push(temp[i])
            } else if (temp[i].day === '周四') {
              temparr4.push(temp[i])
            } else if (temp[i].day === '周五') {
              temparr5.push(temp[i])
            }
          }
          console.log(temparr2)
          self.tableData = self.getarr(temparr1)
          self.tableData1 = self.getarr(temparr1)
          self.tableData2 = self.getarr(temparr2)
          self.tableData3 = self.getarr(temparr3)
          self.tableData4 = self.getarr(temparr4)
          self.tableData5 = self.getarr(temparr5)

          console.log(self.tableData2)
        })
        .catch((err) => {
          console.log(err.data.data)
        })
    }
  },
  computed: {
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
    this.getdata()
  }
}
</script>
<style  scoped>
.el-divider__text {
  color: #40c9c6 !important;
}
.el-divider__text {
  font-size: 0.15rem !important;
}
.el-divider {
  background-color: #a4a4a4 !important;
}
.right-main-1 {
  width: 100%;
  /* border-bottom: 1px solid #c1d3de;*/
  padding: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
