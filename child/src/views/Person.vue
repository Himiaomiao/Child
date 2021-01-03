<template>
  <div class="home" :style="{ height: screenHeight + 'px' }">
    <div class="top" ref="top">
      <!-- <div class="top1">-->
      <div class="top-left">
        <img src="../assets/log.gif" class="img-responsive" />
      </div>
      <div class="top-center">
        <el-menu
          default-active="person"
          class="el-menu-demo"
          mode="horizontal"
          text-color="#000000"
          :router="true"
          background-color="#b3f6ff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="person">
            <i class="el-icon-user-solid" style="color:rgb(120, 184, 0);"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>

          <el-menu-item index="class">
            <i class="el-icon-school" style="color:rgb(120, 184, 0);"></i>
            <span slot="title">班级管理</span>
          </el-menu-item>
          <el-menu-item index="student">
            <i class="el-icon-s-custom" style="color:rgb(217, 190, 138)"></i>
            <span slot="title">学生管理</span>
          </el-menu-item>
          <el-menu-item index="food">
            <i class="el-icon-food" style="color:rgb(255, 215, 68)"></i>
            <span slot="title">食物管理</span>
          </el-menu-item>
          <el-menu-item index="ingredients">
            <i class="el-icon-refrigerator" style="color:rgb(255, 233, 97)"></i>
            <span slot="title">食材管理</span>
          </el-menu-item>
          <el-menu-item index="nutrition">
            <i class="el-icon-dish" style="color:rgb(202, 98, 110)"></i>
            <span slot="title">套餐管理</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="top-right">
        <div class="top-right-1">
          <div class="log1">
            <el-image
              style="width: 100%; height: 100%"
              :src="require('../assets/home.gif')"
              :fit="fit"
              @click="tohome()"
            ></el-image>
          </div>
        </div>
        <div class="top-right-2">
          <div class="log-exit">
            <el-image
              style="width: 100%; height: 100%"
              :src="require('../assets/exit.gif')"
              :fit="fit"
              @click="exit()"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
    <div class="center" :style="{ height: centerHeight + 'px' }">
      <div class="main">
        <div class="left">
          <div class="left-hender" style="color:black">
            <i
              :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
              style="margin-right:10px"
              @click="myshow"
            ></i>
            <p style="display:inline">功能导航</p>
          </div>

          <div class="left-main">
            <el-menu
              :default-active="showactive"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              @select="handlSelect"
              :collapse="isCollapse"
              background-color="#f1f8fc"
              text-color="#000000"
            >
              <el-menu-item index="person-information">
                <i class="el-icon-school" style="color:rgb(120, 184, 0);"></i>
                <span slot="title">查看个人信息</span>
              </el-menu-item>
              <el-menu-item index="update-information">
                <i class="el-icon-school" style="color:rgb(120, 184, 0);"></i>
                <span slot="title">修改信息</span>
              </el-menu-item>
              <el-menu-item index="feedback">
                <i class="el-icon-s-custom" style="color:rgb(217, 190, 138)"></i>
                <span slot="title">信息反馈</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>

        <div class="right">
          <div class="right-top">
            <el-tabs
              type="border-card"
              @tab-remove="removeTab"
              :value="showvalue"
              @tab-click="clickTab"
            >
              <el-tab-pane v-if="showdata1.person_information" name="1">
                <span slot="label">
                  <i class="el-icon-date"></i> 查看个人信息
                </span>
                <!--教师个人信息模块-->
                <div class="right1" v-show="showdata.teacher">
                  <el-card class="box-card" shadow="hover" body-style="{padding:0px}">
                    <div class="left-1">
                      <p class="p1-1">用户编号:</p>
                      <p class="p1-2">{{userInfo.data.id}}</p>
                    </div>
                    <div class="left-2">
                      <p class="p1-1">用户名:</p>
                      <p class="p1-2">{{userInfo.data.username}}</p>
                    </div>
                    <div class="left-3">
                      <p class="p1-1">姓名:</p>
                      <p class="p1-2">{{userInfo.data.name}}</p>
                    </div>
                    <div class="left-4">
                      <p class="p1-1">手机号:</p>
                      <p class="p1-2">{{userInfo.data.telnum}}</p>
                    </div>
                  </el-card>
                  <el-card class="box-card" shadow="hover" body-style="{padding:0px}">
                    <div class="left-2">
                      <p class="p1-1">职责:</p>
                      <p class="p1-2">{{userInfo.data.duty}}</p>
                    </div>
                    <div class="left-1">
                      <p class="p1-1">角色:</p>
                      <p class="p1-2">{{userInfo.data.identify}}</p>
                    </div>
                    <div class="left-4">
                      <p class="p1-1">管理班级:</p>
                      <p class="p1-2">{{userInfo.data.classnum}}</p>
                    </div>
                    <div class="left-3"></div>
                  </el-card>
                </div>
                <!--学生监护人模块-->
                <div class="righ2" v-show="showdata.guardian">
                  <el-card class="box-card" shadow="hover" body-style="{padding:0px}">
                    <div class="left-1">
                      <p class="p1-1">用户编号:</p>
                      <p class="p1-2">{{userInfo.data.id}}</p>
                    </div>
                    <div class="left-2">
                      <p class="p1-1">用户名:</p>
                      <p class="p1-2">{{userInfo.data.username}}</p>
                    </div>
                    <div class="left-3">
                      <p class="p1-1">姓名:</p>
                      <p class="p1-2">{{userInfo.data.name}}</p>
                    </div>
                    <div class="left-4">
                      <p class="p1-1">手机号:</p>
                      <p class="p1-2">{{userInfo.data.telnum}}</p>
                    </div>
                  </el-card>
                  <el-card class="box-card" shadow="hover" body-style="{padding:0px}">
                    <div class="left-2"></div>
                    <div class="left-1">
                      <p class="p1-1">角色:</p>
                      <p class="p1-2">{{userInfo.data.identify}}</p>
                    </div>
                    <div class="left-4"></div>
                    <div class="left-3"></div>
                  </el-card>
                </div>
                <!--厨师模块-->
                <div class="right1" v-show="showdata.cook">
                  <el-card class="box-card" shadow="hover" body-style="{padding:0px}">
                    <div class="left-1">
                      <p class="p1-1">用户编号:</p>
                      <p class="p1-2">{{userInfo.data.id}}</p>
                    </div>
                    <div class="left-2">
                      <p class="p1-1">用户名:</p>
                      <p class="p1-2">{{userInfo.data.username}}</p>
                    </div>
                    <div class="left-3">
                      <p class="p1-1">姓名:</p>
                      <p class="p1-2">{{userInfo.data.name}}</p>
                    </div>
                    <div class="left-4">
                      <p class="p1-1">手机号:</p>
                      <p class="p1-2">{{userInfo.data.telnum}}</p>
                    </div>
                  </el-card>
                  <el-card class="box-card" shadow="hover" body-style="{padding:0px}">
                    <div class="left-2">
                      <p class="p1-1">厨师工种:</p>
                      <p class="p1-2">{{userInfo.data.typeofwork}}</p>
                    </div>
                    <div class="left-1">
                      <p class="p1-1">厨师特长:</p>
                      <p class="p1-2">{{userInfo.data.introduction}}</p>
                    </div>
                    <div class="left-4">
                      <p class="p1-1">厨师等级:</p>
                      <p class="p1-2">{{userInfo.data.grade}}</p>
                    </div>
                    <div class="left-3"></div>
                  </el-card>
                </div>
              </el-tab-pane>
              <el-tab-pane v-if="showdata1.update_information" name="2" closable>
                <span slot="label">
                  <i class="el-icon-edit-outline"></i> 修改信息
                </span>
                <div class="right1">
                  <!--教师-->
                  <el-form
                    :inline="true"
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    v-if="userInfo.data.identify==='teacher'"
                  >
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="tel">
                      <el-input v-model="ruleForm.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="职责">
                      <el-select v-model="ruleForm.duty">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="管理班级">
                      <el-input v-model.number="ruleForm.class"></el-input>
                    </el-form-item>
                    <el-form-item style="display:block">
                      <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                  <!--监护人-->
                  <el-form
                    :inline="true"
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    v-if="userInfo.data.identify==='guardian'"
                  >
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="tel">
                      <el-input v-model.number="ruleForm.tel"></el-input>
                    </el-form-item>

                    <el-form-item style="display:block">
                      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                  <!--厨师-->
                  <el-form
                    :inline="true"
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    v-if="userInfo.data.identify==='cook'"
                  >
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="tel">
                      <el-input v-model.number="ruleForm.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="工种">
                      <el-input v-model.number="ruleForm.type"></el-input>
                    </el-form-item>
                    <el-form-item label="特长">
                      <el-input v-model.number="ruleForm.des"></el-input>
                    </el-form-item>
                    <el-form-item label="等级">
                      <el-input v-model.number="ruleForm.grade"></el-input>
                    </el-form-item>

                    <el-form-item style="display:block">
                      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                  <!--食材管理员-->
                  <el-form
                    :inline="true"
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    v-if="userInfo.data.identify==='ingadmin'"
                  >
                    <el-form-item label="用户名">
                      <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="tel">
                      <el-input v-model.number="ruleForm.tel"></el-input>
                    </el-form-item>
                    <el-form-item style="display:block">
                      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                  <!--配餐员-->
                  <el-form
                    :inline="true"
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    v-if="userInfo.data.identify==='cateringstaff'"
                  >
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="tel">
                      <el-input v-model.number="ruleForm.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="等级">
                      <el-input v-model.number="ruleForm.grade"></el-input>
                    </el-form-item>
                    <el-form-item label="知识体系">
                      <el-input v-model.number="ruleForm.knowledge"></el-input>
                    </el-form-item>

                    <el-form-item style="display:block">
                      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-tab-pane>

              <!--信息反馈模块-->
              <el-tab-pane v-if="showdata1.reback_information" name="3" closable>
                <span slot="label">
                  <i class="el-icon-chat-line-square"></i> 信息反馈
                </span>
                <div class="right1">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 10, maxRows: 20}"
                    placeholder="请输入反馈信息"
                    v-model="textarea2"
                    style="width: 80%;"
                    clearable
                  ></el-input>
                  <el-switch
                    active-text="是否实名"
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    style="display: block;margin-top:20px"
                  ></el-switch>
                  <el-button type="primary" round style="margin:auto;margin-top:20px">主要按钮</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
    <div class="foot" ref="foot"></div>
  </div>
</template>

<script>
import axios from 'axios'
/* #f1f8fc */
console.log(document.documentElement.clientHeight)
export default {
  name: 'Person',
  data() {
    var validatetel = (rule, value, callback) => {
      var check = /0?(13|14|15|18|17)[0-9]{9}/
      if (!check.test(value)) {
        callback(new Error('手机号错误'))
      } else {
        callback()
      }
    }
    var checkAccount = (rule, value, callback) => {
      var check = /[a-zA-Z][a-zA-Z0-9_]{2,18}/
      if (!check.test(value)) {
        callback(new Error('账号为2-18个且包含字母和数字'))
      } else {
        callback()
      }
    }
    return {
      options: [
        {
          value: '选项1',
          label: '班主任'
        },
        {
          value: '选项2',
          label: '生活老师'
        }
      ],
      fit: 'fill',
      /* 控制侧边和顶部导航栏数据 */
      showactive: 'person-information',
      showvalue: '1',
      showdata1: {
        person_information: true,
        update_information: false,
        reback_information: false
      },
      /* 获取屏幕高度，控制页面总高度和中间高度数据 */
      screenHeight: 0,
      centerHeight: 0,

      value: true,
      textarea2: '',
      ruleForm: {
        username: '',
        name: '',
        tel: '',
        duty: '',
        class: '',
        grade: '',
        type: '',
        des: '',
        knowledge: '',
        identify: ''
      },
      rules: {
        tel: [{ validator: validatetel, trigger: 'blur' }],
        username: [{ validator: checkAccount, trigger: 'blur' }]
      },
      /* 控制侧边栏伸缩数据 */
      isCollapse: false,
      /* 判断不同身份用户个人信息是否展示数据 */
      showdata: {
        teacher: false,
        guardian: false,
        cook: true,
        ingadmin: false,
        cateringstaff: false
      }
    }
  },
  methods: {
    /* 控制顶部导航被点击函数 */
    clickTab(tab) {
      // 点击tab获取tab的name赋值给showvalue,避免showvalue出现持续空值状态
      this.showvalue = tab.name
      if (tab.name === '1') {
        this.showactive = 'person-information'
      } else if (tab.name === '2') {
        this.showactive = 'update-information'
      } else if (tab.name === '3') {
        this.showactive = 'feedback'
      }
      console.log(this.showactive)
    },
    /* 关闭右侧顶部标签函数，实现关闭选项，前一个选项以及对应的功能导航处于激活状态 */
    removeTab(targetName) {
      // 当关闭的标签为第二个标签时，第一个标签处于激活状态
      if (targetName === '2') {
        this.showdata1.update_information = !this.showdata1.update_information
        this.showvalue = '1'
        this.showactive = 'person-information'
      } else if (targetName === '3') {
        // 当关闭的标签为第三个标签时，需要判断第二个标签的状态，如果第二个标签存在，则激活状态切换到第二个标签
        this.showdata1.reback_information = !this.showdata1.reback_information
        // 判断第二个标签是否存在
        if (this.showdata1.update_information === true) {
          this.showvalue = '2'
          this.showactive = 'update-information'
        } else {
          this.showvalue = '1'
          this.showactive = 'person-information'
        }
      }
    },
    /* 控制侧边栏选中时的操作 */
    handlSelect(key, keyPath) {
      this.showactive = key // 赋值showactive，避免点击激活时showactive为空值
      if (key === 'person-information') {
        this.showdata1.person_information = true
        this.showvalue = '1'
      } else if (key === 'update-information') {
        this.showdata1.update_information = true
        this.showvalue = '2'
      } else if (key === 'feedback') {
        this.showdata1.reback_information = true
        this.showvalue = '3'
      }
    },
    /* 提交更新表单 */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* 教师身份提交 */
          if (this.ruleForm.identify === 'teacher') {
            axios
              .post('', {
                username: this.ruleForm.username,
                name: this.ruleForm.name,
                telnum: this.ruleForm.tel,
                duty: this.ruleForm.duty,
                classnum: this.ruleForm.class
              })
              .then(function (ers) {
                this.$message({
                  message: '恭喜你，信息修改成功',
                  type: 'success'
                })
              })
              .catch(function (err) {
                this.$message({
                  showClose: true,
                  message: '很抱歉，更新失败',
                  type: 'error'
                })
                console.log(err)
              })
          } else if (this.ruleForm.identify === 'guardian') {
            /* 监护人身份提交 */
            axios
              .post('', {
                username: this.ruleForm.username,
                name: this.ruleForm.name,
                telnum: this.ruleForm.tel
              })
              .then(function (ers) {
                this.$message({
                  message: '恭喜你，信息修改成功',
                  type: 'success'
                })
              })
              .catch(function (err) {
                this.$message({
                  showClose: true,
                  message: '很抱歉，更新失败',
                  type: 'error'
                })
                console.log(err)
              })
          } else if (this.ruleForm.identify === 'cook') {
            /* 厨师身份提交 */
            axios
              .post('', {
                username: this.ruleForm.username,
                name: this.ruleForm.name,
                telnum: this.ruleForm.tel,
                grade: this.ruleForm.grade,
                introduction: this.ruleForm.introduction,
                typeof: this.ruleForm.type
              })
              .then(function (ers) {
                this.$message({
                  message: '恭喜你，信息修改成功',
                  type: 'success'
                })
              })
              .catch(function (err) {
                this.$message({
                  showClose: true,
                  message: '很抱歉，更新失败',
                  type: 'error'
                })
                console.log(err)
              })
          } else if (this.ruleForm.identify === 'ingadmin') {
            /* 食材管理员身份提交 */
            axios
              .post('', {
                username: this.ruleForm.username,
                name: this.ruleForm.name,
                telnum: this.ruleForm.tel
              })
              .then(function (ers) {
                this.$message({
                  message: '恭喜你，信息修改成功',
                  type: 'success'
                })
              })
              .catch(function (err) {
                this.$message({
                  showClose: true,
                  message: '很抱歉，更新失败',
                  type: 'error'
                })
                console.log(err)
              })
          } else if (this.ruleForm.identify === 'cateringstaff') {
            /* 营养配餐员身份提交 */
            axios
              .post('', {
                username: this.ruleForm.username,
                name: this.ruleForm.name,
                telnum: this.ruleForm.tel,
                grade: this.ruleForm.grade,
                knowledge: this.ruleForm.knowledge
              })
              .then(function (ers) {
                this.$message({
                  message: '恭喜你，信息修改成功',
                  type: 'success'
                })
              })
              .catch(function (err) {
                this.$message({
                  showClose: true,
                  message: '很抱歉，更新失败',
                  type: 'error'
                })
                console.log(err)
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    exit: function () {
      console.log('退出')
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    myshow: function () {
      alert('你好')
      // this.isCollapse = !this.isCollapse;
    },
    tohome: function () {
      this.$router.push('/home')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    /* 获取用户数据 */
    getruleFrom() {
      var temp = this.$store.state.userInfo
      this.ruleForm.username = temp.data.username
      this.ruleForm.name = temp.data.name
      this.ruleForm.tel = temp.data.telnum
      this.ruleForm.duty = temp.data.duty
      this.ruleForm.class = temp.data.classnum
      this.ruleForm.grade = temp.data.grade
      this.ruleForm.type = temp.data.typeofwork
      this.ruleForm.des = temp.data.introduction
      this.ruleForm.knowledge = temp.data.knowledge
      this.ruleForm.identify = temp.data.identify
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  mounted() {
    this.getruleFrom()
    console.log('获取样式')
    console.log(document.documentElement.clientWidth)
    this.screenHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    this.centerHeight =
      this.screenHeight -
      this.$refs.top.offsetHeight -
      this.$refs.foot.offsetHeight
    console.log(document.documentElement.clientHeight)
  }
}
</script>

<style scoped>
.home {
  width: 1280px;
  background-color: #b3f6ff;
}
.el-menu-item.is-active {
  background-color: #6ec673 !important;
  color: #fff !important;
}
.top {
  width: 1280px;
  height: 75px;
  background-color: #b3f6ff;
}
.top-left {
  width: 300px;
  height: 50px;
  margin-left: 0px;
  margin-top: 10px;
  float: left;
}
.top-center {
  width: 800px;
  height: 75px;
  margin-left: 350px;
  padding-top: 5px;
}
.top-right {
  width: 150px;
  height: 50px;
  position: absolute;
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

.center {
  width: 1268px;
  margin: auto;
  background: #fff url("../assets/centertopbg.png") repeat-x left top;
  padding-top: 6px;
}
.main {
  width: 1268px;
  height: 100%;
  margin: auto;
  padding-left: 6px;
  padding-right: 6px;
  padding-bottom: 6px;
  background: url("../assets/centerbottombg.png") repeat-x left bottom;
}
.left {
  width: 200px;
  height: 100%;
  float: left;
  overflow-y: hidden;
  overflow-x: hidden;
}

.left-hender {
  width: 200px;
  height: 49px;
  padding-top: 13px;
  border-radius: 2px 2px 0 0;
  background: #b3f6ff;
}
.left-main {
  width: 200px;
  /* height: 389px;*/
  height: 100%;
  background-color: #f1f8fc;
  border: 1px solid #bdd0db;
  border-top: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 389px;
}
.right {
  width: 1030px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: 221px;
  border: 1px solid #c1d3de;
}
.right-top {
  width: 1030px;
  height: 35px;
  background: url("../assets/righttitlebig.png") repeat-x;
}
.right1 {
  width: 1030px;
  height: 420px;
}
.left-1 {
  background-color: #fdf5e6;
  height: 80px;
  width: 100%;
  position: relative;
  padding-top: 30px;
}
.left-2 {
  height: 80px;
  width: 100%;
  position: relative;
  padding-top: 30px;
}
.left-3 {
  height: 80px;
  width: 100%;
  position: relative;
  padding-top: 30px;
  background-color: #f0f9eb;
}
.left-4 {
  height: 80px;
  width: 100%;
  position: relative;
  padding-top: 30px;
}
.left-1:hover {
  background-color: #e8f2f9;
}
.left-2:hover {
  background-color: #e8f2f9;
}
.left-3:hover {
  background-color: #e8f2f9;
}
.left-4:hover {
  background-color: #e8f2f9;
}
.p1-1 {
  width: 100px;
  height: 25px;
  margin-left: 50px;
  font-size: 20px;
  color: black;
  font-family: "Courier New", Courier, monospace;
}
.p1-2 {
  width: 150px;
  height: 25px;
  position: absolute;
  margin-left: 160px;
  margin-top: -35px;
  font-size: 20px;
  color: black;
  font-family: "Courier New", Courier, monospace;
}
.right2 {
  width: 1030px;
  height: 400px;
}
.foot {
  width: 1280px;
  height: 25px;
  background-color: #b3f6ff;
}
.el-submenu__title {
  background-color: #6ec673 !important;
  color: white !important;
}
</style>

<style >
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 50%;
  height: 99%;
  float: left;
}
</style>
