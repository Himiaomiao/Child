<template>
  <div class="main">
    <div class="yun">
      <div class="one">
        <img src="../assets/yun.png" :style="{marginLeft: left+'px'}" />
      </div>
      <div class="two">
        <img src="../assets/yun.png" :style="{marginRight: right+'px'}" />
      </div>
    </div>
    <div class="login">
      <div class="login-top">
        <img src="../assets/wenzi.png" style="margin:auto" class="img-responsive" />
      </div>
      <div class="login-center">
        <div style="margin: 20px;"></div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="用户身份" prop="value">
            <el-select v-model="ruleForm.value" clearable placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm('ruleForm')">登陆</el-button>
            <el-button @click="regint">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="buttom">
      <img src="../assets/login-buttom.gif" class="img-responsive" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      left: 1,
      right: 1,
      labelPosition: 'right',
      adress: '',
      ruleForm: {
        pass: '',
        value: '',
        account: ''
      },
      options: [
        {
          value: '选项1',
          label: '教师'
        },
        {
          value: '选项2',
          label: '学生监护人'
        },
        {
          value: '选项3',
          label: '厨师'
        },
        {
          value: '选项4',
          label: '食材管理员'
        },
        {
          value: '选项5',
          label: '营养配餐员'
        }
      ],
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        value: [{ required: true, message: '请选择身份', trigger: 'change' }],
        account: [{ required: true, validator: checkAge, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        var self = this
        if (valid) {
          console.log(this.ruleForm.value)
          // 监护人
          if (this.ruleForm.value === '选项2') {
            this.adress =
              'http://114.55.141.250:8181/guardian/login?' +
              'password=' +
              this.ruleForm.pass +
              '&' +
              'username=' +
              this.ruleForm.account
          } else if (this.ruleForm.value === '选项1') {
            // 教师
            this.adress =
              'http://114.55.141.250:8181/teacher/login?' +
              'password=' +
              this.ruleForm.pass +
              '&' +
              'username=' +
              this.ruleForm.account
          } else if (this.ruleForm.value === '选项3') {
            // 厨师
            this.adress =
              'http://114.55.141.250:8181/cook/login?' +
              'password=' +
              this.ruleForm.pass +
              '&' +
              'username=' +
              this.ruleForm.account
          } else if (this.ruleForm.value === '选项4') {
            // 食材管理员
            this.adress =
              'http://114.55.141.250:8181/ingadmin/login?' +
              'password=' +
              this.ruleForm.pass +
              '&' +
              'username=' +
              this.ruleForm.account
          } else if (this.ruleForm.value === '选项5') {
            // 营养配餐员
            this.adress =
              'http://114.55.141.250:8181/cateringstaff/login?' +
              'password=' +
              this.ruleForm.account +
              '&username=' +
              this.ruleForm.account
          }
          console.log('123' + this.adress)
          console.log('submit!')
          axios
            .post(this.adress, {
              username: this.ruleForm.account,
              password: this.ruleForm.pass
            })
            .then(function (res) {
              console.log(res.data)
              console.log('登陆成功')
              // 保存页面信息
              const objStr = JSON.stringify(res.data)
              window.sessionStorage.setItem('user', objStr)
              console.log(res.data.data.token)

              // 获取需要传给其他页面使用的数据到getUserInfo中
              self.$store.dispatch('getUserInfo', res.data)
              // 实现路由跳转
              self.$router.push('/home')
              console.log(res.data)
            })
            .catch(function (err) {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    regint: function () {
      this.$router.push('/register')
    }
  },
  mounted() {
    setInterval((res) => {
      if (this.left > document.documentElement.clientWidth) {
        this.left = -100
      } else {
        this.left++
      }
      if (this.right > document.documentElement.clientWidth) {
        this.right = 0
      } else {
        this.right++
      }
    }, 200)
  }
}
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #b3f6ff;
  margin: auto;
  position: relative;
  /*  animation: rotateInDownLeft;  referring directly to the animation's @keyframe declaration */
  /* animation-duration: 5s;*/
}
.buttom {
  width: 100%;
  height: 270px;
  position: absolute;
  margin: auto;
  margin-bottom: 0px;
  position: fixed;
  bottom: 0;
}

.yun {
  width: 1280px;
  height: 500px;
  overflow: hidden;
}
.one {
  width: 160px;
  height: 102px;
  float: left;
}
.two {
  margin-top: 80px;
  float: right;
}
.login {
  width: 700px;
  height: 400px;
  background-color: #ffffffa1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%); /* IE 9 */
  -webkit-transform: translate(-50%, -50%); /* Safari and Chrome */
  /*margin-top: -200px;
  margin-left: -350px;*/
  z-index: 10;
}
.login-top {
  width: 700px;
  height: 100px;
  /* background-color: yellowgreen;*/
}
.login-center {
  width: 400px !important;
  height: 250px !important;
  position: absolute;
  left: 50%;
  margin-left: -200px;
}
</style>
