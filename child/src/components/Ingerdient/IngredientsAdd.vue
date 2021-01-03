<template>
  <div class="right-main">
    <el-form :inline="true" :model="addinformation" class="demo-form-inline">
      <el-form-item label="食材名称">
        <el-input
          v-model="addinformation.ingName"
          placeholder="食材名称"
          style="width: 250px"
        ></el-input>
      </el-form-item>
      <el-form-item label="食材种类">
        <el-select
          v-model="addinformation.ingType"
          placeholder="食材种类"
          style="width: 250px"
        >
          <el-option label="蔬菜类" value="蔬菜类"></el-option>
          <el-option label="瓜果类" value="瓜果类"></el-option>
          <el-option label="粗粮" value="瓜果类"></el-option>
          <el-option label="肉类" value="肉类"></el-option>
          <el-option label="豆制品" value="豆制品"></el-option>
        </el-select>
      </el-form-item>
      <div></div>
      <div>
        <el-form-item label="食材描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 7 }"
            placeholder="请输入内容"
            v-model="addinformation.ingDes"
            style="width: 400px"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="display: block"
          >添加</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      showactive: 'ingredients-imformation',
      showvalue: '1',
      showdata: {
        ingredients_information: true,
        add_ingredients: false,
        acount_ingredients: false,
        idea_ingredients: false
      },
      textarea2: '',
      formInline: {
        ingName: '',
        ingType: ''
      },
      addinformation: {
        ingName: '',
        ingType: '',
        ingDes: ''
      },
      input3: '',
      input4: '',
      fit: 'fill',
      isCollapse: false,
      tableData: []
    }
  },
  methods: {
    clickTab(tab) {
      // 点击tab获取tab的name赋值给showvalue,避免showvalue出现持续空值状态
      this.showvalue = tab.name
      if (tab.name === '1') {
        this.showactive = 'ingredients-imformation'
      } else if (tab.name === '2') {
        this.showactive = 'add-ingredients'
      } else if (tab.name === '3') {
        this.showactive = 'acount-ingredients'
      } else if (tab.name === '4') {
        this.showactive = 'idea-ingredients'
      }
      console.log(this.showactive)
    },
    /* 关闭右侧顶部标签函数，实现关闭选项，前一个选项以及对应的功能导航处于激活状态 */
    removeTab(targetName) {
      // 当关闭的标签为第二个标签时，第一个标签处于激活状态
      if (targetName === '2') {
        this.showdata.add_ingredients = !this.showdata.add_ingredients
        this.showvalue = '1'
        this.showactive = 'ingredients-imformation'
      } else if (targetName === '3') {
        // 当关闭的标签为第三个标签时，需要判断第二个标签的状态，如果第二个标签存在，则激活状态切换到第二个标签
        this.showdata.acount_ingredients = !this.showdata.acount_ingredients
        // 判断第二个标签是否存在
        if (this.showdata.add_ingredients === true) {
          this.showvalue = '2'
          this.showactive = 'add-ingredients'
        } else {
          this.showvalue = '1'
          this.showactive = 'ingredients-imformation'
        }
      } else if (targetName === '4') {
        // 第四个标签判断前三个标签状态
        this.showdata.idea_ingredients = !this.showdata.idea_ingredients
        if (this.showdata.acount_ingredients === true) {
          this.showvalue = '3'
          this.showactive = 'acount-ingredients'
        } else if (this.showdata.add_ingredients === true) {
          this.showvalue = '2'
          this.showactive = 'add-ingredients'
        } else {
          this.showvalue = '1'
          this.showactive = 'ingredients-imformation'
        }
      }
    },
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
    myshow: function () {
      this.isCollapse = !this.isCollapse
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    /* 页面左侧导航栏栏目被选中 */
    handlSelect(key, keyPath) {
      this.showactive = key // 赋值showactive，避免点击激活时showactive为空值
      if (key === 'ingredients-imformation') {
        this.showdata.ingredients_information = true
        this.showvalue = '1'
      } else if (key === 'add-ingredients') {
        this.showdata.add_ingredients = true
        this.showvalue = '2'
      } else if (key === 'acount-ingredients') {
        this.showdata.acount_ingredients = true
        this.showvalue = '3'
      } else if (key === 'idea-ingredients') {
        this.showdata.idea_ingredients = true
        this.showvalue = '4'
      }
    },
    getData() {
      var self = this
      axios
        .get('')
        .then(function (res) {
          self.tableData = res.data.ingredients
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style  scoped>
.el-header,
.el-footer {
  background-color: #b3f6ff;
  text-align: center;
  line-height: 60px;
  height: 60px !important;
}

.el-aside {
  width: 150px !important;
  color: #333;
  text-align: center;
  line-height: 100%;
  margin-top: 6px;
  margin-left: 6px;
  overflow: hidden;
}

.el-main {
  color: #333;
  text-align: center;

  margin-top: 6px;
  margin-right: 6px;
  padding: 0px;
  padding-left: 10px !important;
}

.el-container > .el-container {
  margin-bottom: 40px;
  /*background: #fff url("../assets/centertopbg.png") repeat-x left top;*/
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-item.is-active {
  background-color: #6ec673 !important;
  color: #fff !important;
}

.top-left {
  width: 300px;
  height: 50px;
  margin-top: 5px;
  float: left;
}
.top-center {
  width: 800px;
  height: 60px;
  margin-left: 300px;
}
.top-right {
  width: 150px;
  height: 50px;
  margin-left: 1100px;
  margin-top: -68px;
}
.top-right-1 {
  width: 50px;
  height: 70px;
  float: left;
  margin-left: 25px;
}
.top-right-2 {
  width: 50px;
  height: 70px;

  float: right;
}
.left-hender {
  width: 100%;
  height: 49px;
  padding-top: 5%;
  border-radius: 2px 2px 0 0;
  background: #b3f6ff;
}
.left-main {
  width: 100%;
  height: 100%;
  background-color: #f1f8fc;
  border: 1px solid #bdd0db;
  border-top: none;
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

.add-food1 {
  width: 100%;
  height: 150px;
  border: 1px solid #c1d3de;
  padding: 10px;
}
</style>
