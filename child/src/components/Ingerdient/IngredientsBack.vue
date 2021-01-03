<template>
  <div class="right-main">
    <div class="right-main-1">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="search"
      ></el-input>
    </div>
    <div class="add-food2" style="margin-top: 20px">
      <el-table :data="tables" border style="width: 100%">
        <el-table-column prop="ingNum" label="食材编号" width="100">
        </el-table-column>
        <el-table-column prop="ingName" label="食材名称" width="180">
        </el-table-column>
        <el-table-column prop="satisfy" label="用户评分"> </el-table-column>
        <el-table-column prop="description" label="评价详情"> </el-table-column>
        <el-table-column prop="createT" label="评价时间"> </el-table-column>
        <el-table-column prop="useIdentity" label="用户身份"> </el-table-column>
        <el-table-column prop="useNum" label="用户编号"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableData: [],
      search: ''
    }
  },
  computed: {
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
    axios
      .get('http://114.55.141.250:8181/ingredients/getappraisementlist')
      .then((res) => {
        console.log(res.data.data)
        var temp = res.data.data
        for (let i = 0; i < temp.length; i++) {
          var obj = {}
          obj.ingNum = temp[i].ingNum
          obj.ingName = temp[i].ingName
          obj.description = temp[i].description
          obj.createT = temp[i].createT
          obj.useIdentity = temp[i].useIdentity
          if (temp[i].satisfy === 0) {
            obj.satisfy = '极差'
          } else if (temp[i].satisfy === 1) {
            obj.satisfy = '失望'
          } else if (temp[i].satisfy === 2) {
            obj.satisfy = '一般'
          } else if (temp[i].satisfy === 3) {
            obj.satisfy = '满意'
          } else if (temp[i].satisfy === 4) {
            obj.satisfy = '较好'
          } else if (temp[i].satisfy === 5) {
            obj.satisfy = '惊喜'
          }
          this.tableData.push(obj)
        }
      })
      .catch((err) => {
        console.log(err.data)
      })
  }
}
</script>
<style scoped>
.right-main-1 {
  width: 100%;
  border-bottom: 1px solid #c1d3de;
  padding: 10px;
  padding-top: 20px;
}
</style>
