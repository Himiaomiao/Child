<template>
  <div>
    <h4>{{ spName + "食谱详情" }}</h4>
    <el-button @click="exportExcel" type="success">导出数据</el-button>
    <el-table
      :data="spfoodData"
      border
      style="width: 100%; margin-top: 20px"
      id="out-table"
    >
      <el-table-column property="time" width="150" align="center">
        <template slot-scope="scope">
          <h5>{{ scope.row.time }}</h5>
        </template>
      </el-table-column>
      <el-table-column property="breakfast" label="早餐" align="center">
        <template slot-scope="scope">
          <!-- <p v-for="(item, index) in scope.row.breakfast" :key="index">
            <el-checkbox v-model="item.foodNum" >{{
              item.foodName + ":" + item.weight
            }}</el-checkbox>
          </p>-->
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="item in scope.row.breakfast"
              :label="item.id"
              :key="item.foodNum"
              >{{ item.foodName + ":" + item.weight }}</el-checkbox
            >
          </el-checkbox-group>
        </template>
      </el-table-column>
      <el-table-column property="lunch" label="午餐" align="center">
        <template slot-scope="scope">
          <!-- <p v-for="(item, index) in scope.row.lunch" :key="index">
            {{ item.foodName + ":" + item.weight }}
          </p>-->
          <el-checkbox-group
            v-model="checkedCities1"
            @change="handleCheckedCitiesChange1"
          >
            <el-checkbox
              v-for="item in scope.row.lunch"
              :label="item.id"
              :key="item.foodNum"
              >{{ item.foodName + ":" + item.weight }}</el-checkbox
            >
          </el-checkbox-group>
        </template></el-table-column
      >
      <el-table-column property="dinner" label="晚餐" align="center">
        <template slot-scope="scope">
          <!-- <p v-for="(item, index) in scope.row.dinner" :key="index">
            {{ item.foodName + ":" + item.weight }}
          </p>-->
          <el-checkbox-group
            v-model="checkedCities2"
            @change="handleCheckedCitiesChange2"
          >
            <el-checkbox
              v-for="item in scope.row.dinner"
              :label="item.id"
              :key="item.foodNum"
              >{{ item.foodName + ":" + item.weight }}</el-checkbox
            >
          </el-checkbox-group>
        </template></el-table-column
      >
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            :disabled="mydisable"
            size="mini"
            @click="DelectFood(scope.$index, scope.row)"
            type="primary"
            >删除食物</el-button
          >
          <el-button
            :disabled="mydisable"
            size="mini"
            type="warning"
            @click="UpdateFood(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            :disabled="mydisable"
            size="mini"
            type="info"
            @click="handleAddFood(scope.$index, scope.row)"
            >新增食物</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--添加食物-->
    <el-drawer
      title="平台食物"
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
      </el-table>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="餐次">
            <el-select v-model="formInline.mealtime" placeholder="餐次">
              <el-option label="早餐" value="早餐"></el-option>
              <el-option label="午餐" value="午餐"></el-option>
              <el-option label="晚餐" value="晚餐"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食物质量">
            <el-input
              placeholder="请输入食物质量"
              v-model="formInline.weight"
            ></el-input>
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
    <!--修改食物-->
    <el-dialog title="修改套餐" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item
          :label-width="formLabelWidth"
          :label="'早餐' + (index + 1)"
          :key="item.foodNum"
          v-for="(item, index) in form.date11"
        >
          <el-input
            v-model="item.foodName"
            autocomplete="off"
            ref="getValue"
            :disabled="true"
          ></el-input>
          <el-input v-model="item.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          :label="'午餐' + (index + 1)"
          :key="item1.foodNum"
          v-for="(item1, index) in form.date22"
        >
          <el-input
            v-model="item1.foodName"
            autocomplete="off"
            :disabled="true"
          ></el-input>
          <el-input v-model="item1.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          :label="'晚餐' + (index + 1)"
          :key="item2.foodNum"
          v-for="(item2, index) in form.date33"
        >
          <el-input
            v-model="item2.foodName"
            autocomplete="off"
            :disabled="true"
          ></el-input>
          <el-input v-model="item2.weight" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  data() {
    return {
      checkedCities: [],
      checkedCities1: [],
      checkedCities2: [],
      checked: '',
      dialogFormVisible: false,
      form: {
        value: '',
        date1: [],
        date2: [],
        date3: [],
        date11: [],
        date22: [],
        date33: []
      },
      formLabelWidth: '120px',
      AddFoodTable: false,
      AddFoodLoading: false,
      AddFoodTime: '',
      mydisable: false,
      spName: '',
      spNum: '',
      formInline: {
        mealtime: '',
        weight: ''
      },
      spfoodData: [],
      foodData: [],
      foodtime: '',
      updatebrefood: [],
      updatelunfood: [],
      updatedinfood: []
    }
  },
  methods: {
    /* 提交删除数据 */
    DelectFood(index, row) {
      console.log(this.spNum)
      console.log(row.time)
      console.log(row.breakfast)
      const delbre = this.getdelectfood(row.breakfast, this.updatebrefood)
      const dellun = this.getdelectfood(row.lunch, this.updatelunfood)
      const deldin = this.getdelectfood(row.dinner, this.updatedinfood)
      console.log(delbre)
      console.log(dellun)
      console.log(deldin)
      const alldel = delbre.concat(dellun, deldin)
      console.log(alldel)
      axios
        .delete('http://114.55.141.250:8181/catering/deletefood', {
          data: alldel
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.meta.status === '200') {
            this.$message({
              message: '删除成功，刷新查看',
              type: 'success'
            })
          } else {
            this.$message({
              message: '删除失败',
              type: 'warning'
            })
          }
        })
        .catch((err) => {
          console.log(err.data)
        })
    },
    /* 封装删除数据函数 */
    getdelectfood(rowfood, upfood) {
      var tempdelectbre = []
      const newcurrentDateItemList = rowfood.map((item, index) => {
        return Object.assign({}, { foodid: item.id })
      })
      console.log(newcurrentDateItemList)
      for (let i = 0; i < newcurrentDateItemList.length; i++) {
        tempdelectbre.push(newcurrentDateItemList[i].foodid)
      }
      const set1 = new Set(tempdelectbre)
      const set2 = new Set(upfood)
      const newArr1 = [...set1].filter((item) => {
        return set2.has(item)
      })
      return newArr1
    },
    /* 获取选中的值 */
    handleCheckedCitiesChange(value) {
      this.updatebrefood = value
    },
    /* 获取选中的值 */
    handleCheckedCitiesChange1(value) {
      this.updatelunfood = value
    },
    /* 获取选中的值 */
    handleCheckedCitiesChange2(value) {
      this.updatedinfood = value
    },
    /* 点击修改套餐信息 */
    UpdateFood(index, row) {
      this.dialogFormVisible = true
      console.log('修改食物信息')
      console.log(row)
      if (row.time === '星期一') {
        this.foodtime = '1'
      } else if (row.time === '星期二') {
        this.foodtime = '2'
      } else if (row.time === '星期三') {
        this.foodtime = '3'
      } else if (row.time === '星期四') {
        this.foodtime = '4'
      } else if (row.time === '星期五') {
        this.foodtime = '5'
      }
      this.form.date11 = row.breakfast
      this.form.date22 = row.lunch
      this.form.date33 = row.dinner
    },
    /* 提取数组中的对象值 */
    getobjdata(rowfood) {
      var tempupfood = []
      const newcurrentDateItemList = rowfood.map((item, index) => {
        return Object.assign({}, { id: item.foodNum })
      })
      for (let i = 0; i < newcurrentDateItemList.length; i++) {
        tempupfood.push(newcurrentDateItemList[i].id)
      }
      return tempupfood
    },
    /* 提交修改数据 */
    update() {
      var self = this
      console.log('提交数据')
      const tempdate1 = this.getobjdata(this.form.date11)
      console.log(tempdate1)
      const tempdate2 = this.getobjdata(this.form.date22)
      const tempdate3 = this.getobjdata(this.form.date33)
      console.log(this.form.date11)
      const alldata = this.form.date11.concat(
        this.form.date22,
        this.form.date33
      )
      console.log('所有需要更新的食物')
      console.log(alldata)
      var updatafood = []
      for (let i = 0; i < alldata.length; i++) {
        var obj = {}
        obj.spNum = this.spNum
        obj.week = this.foodtime
        obj.period = '周'
        obj.foodNum = alldata[i].foodNum
        obj.id = alldata[i].id
        obj.weight = alldata[i].weight.slice(0, alldata[i].weight.length - 1)
        if (tempdate1.includes(alldata[i].foodNum, 0)) {
          obj.mealtime = '早餐'
        } else if (tempdate2.includes(alldata[i].foodNum, 0)) {
          obj.mealtime = '午餐'
        } else if (tempdate3.includes(alldata[i].foodNum, 0)) {
          obj.mealtime = '晚餐'
        }
        updatafood.push(obj)
      }
      console.log('提交的更新食物')
      console.log(updatafood)
      axios
        .put('http://114.55.141.250:8181/catering/updateonedayfood', {
          foodlist: updatafood
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.meta.status === '200') {
            self.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            self.$message({
              message: '修改失败',
              type: 'warn'
            })
          }
        })
        .catch((err) => {
          console.log(err.data)
          self.$message({
            message: '修改失败',
            type: 'warn'
          })
        })
      this.dialogFormVisible = false
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
        obj.mealtime = this.formInline.mealtime
        obj.week = this.foodtime
        obj.weight = this.formInline.weight
        obj.spNum = this.spNum
        obj.period = '一周'
        mydata.push(obj)
      }
      console.log('提交的数据')
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
              console.log('食物添加成功')
              if (res.data.meta.status === '200') {
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
      // this.spNum = row.spNum;
      console.log('保存的配餐员编号' + this.spNum)
      console.log(index, row)
      if (row.time === '星期一') {
        this.foodtime = '1'
      } else if (row.time === '星期二') {
        this.foodtime = '2'
      } else if (row.time === '星期三') {
        this.foodtime = '3'
      } else if (row.time === '星期四') {
        this.foodtime = '4'
      } else if (row.time === '星期五') {
        this.foodtime = '5'
      }
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
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          // 设置导出文件名称
          'sheetjs.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  },
  mounted() {
    if (this.$route.query.identify !== 'cateringstaff') {
      this.mydisable = true
    }
    console.log('路由')
    console.log(this.$route)
    console.log(this.$route.query)
    this.spName = this.$route.query.name
    this.spNum = this.$route.query.id
    var ul =
      'http://114.55.141.250:8181/catering/getdetail/' + this.$route.query.id
    console.log(ul)
    const self = this
    axios
      .post(ul)
      .then(function (res) {
        console.log('套餐食物详情')
        console.log(res.data)
        self.spfoodData = res.data.spfoodData
        var temp = res.data.spfoodData
        for (let i = 0; i < temp.length; i++) {
          console.log(temp[i])
          self.form.date1 = temp[i].breakfast
          self.form.date2 = temp[i].lunch
          self.form.date3 = temp[i].dinner
        }
        console.log('获取的数据')
        console.log(self.form.date2)
      })
      .catch(function (err) {
        console.log('进入ree函数')
        console.log(err)
      })
  }
}
</script>
