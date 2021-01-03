<template>
  <div class="Center">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column property="spNum" label="套餐编号" width="120">
      </el-table-column>
      <el-table-column property="spName" label="套餐名称" width="120">
      </el-table-column>
      <el-table-column property="satisfy" label="评分"> </el-table-column>
      <el-table-column property="description" label="评价"> </el-table-column>
      <el-table-column property="createT" label="评价时间"> </el-table-column>
      <el-table-column property="useIdentity" label="评价角色">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  },
  mounted() {
    axios
      .get('http://114.55.141.250:8181/catering/appraiselist')
      .then((res) => {
        console.log(res.data.data)
        var temp = res.data.data
        for (let i = 0; i < temp.length; i++) {
          console.log(temp[i])
          var obj = {}
          obj.spNum = temp[i].spNum
          obj.spName = temp[i].spName
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
.Center {
  margin-top: 10px;
}
</style>
