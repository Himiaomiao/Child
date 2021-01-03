<template>
  <div class="main">
    <!--基础用户通用表单-->
    <div class="top">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkpassword">
          <el-input
            type="password"
            v-model="ruleForm.checkpassword"
            autocomplete="off"
            show-password
          ></el-input>
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
      </el-form>
    </div>
    <!--通过绑定用户身份选项框的选项渲染不同用户对应不同的详细表单-->
    <!--教师详细信息表单-->
    <div class="center center1" v-show="ruleForm.value==='选项1'">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="ruleForm"
        :rules="rules"
        status-icon
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="tc_name">
          <el-input v-model="ruleForm.tc_name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tc_tel">
          <el-input v-model="ruleForm.tc_tel"></el-input>
        </el-form-item>
        <el-form-item label="教师职责">
          <el-select v-model="ruleForm.tc_duty" clearable placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所管理班级" prop="tc_class">
          <el-input v-model="ruleForm.tc_class"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!--监护人信息详细表单-->
    <div class="center center2" v-show="ruleForm.value==='选项2'">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="ruleForm"
        :rules="rules"
        status-icon
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="gu_name">
          <el-input v-model="ruleForm.gu_name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="gu_tel">
          <el-input v-model="ruleForm.gu_tel"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!--厨师信息详细表单-->
    <div class="center center3" v-show="ruleForm.value==='选项3'">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="ruleForm"
        :rules="rules"
        status-icon
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="co_name">
          <el-input v-model="ruleForm.co_name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="co_tel">
          <el-input v-model="ruleForm.co_tel"></el-input>
        </el-form-item>
        <el-form-item label="个人特长" prop="co_int">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.co_int"></el-input>
        </el-form-item>
        <el-form-item label="工种">
          <el-select v-model="ruleForm.co_type" clearable placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="ruleForm.co_grade" clearable placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工资" prop="co_salary">
          <el-input v-model.number="ruleForm.co_salary"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!--食材管理员详细信息表单-->
    <div class="center center4" v-show="ruleForm.value==='选项4'">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="ruleForm"
        :rules="rules"
        status-icon
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="in_name">
          <el-input v-model="ruleForm.in_name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="in_tel">
          <el-input v-model="ruleForm.in_tel"></el-input>
        </el-form-item>
        <el-form-item label="工资" prop="in_salary">
          <el-input v-model.number="ruleForm.in_salary"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!--营养配餐员信息详细表单-->
    <div class="center center5" v-show="ruleForm.value==='选项5'">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="ruleForm"
        :rules="rules"
        status-icon
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="cf_name">
          <el-input v-model="ruleForm.cf_name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="cf_tel">
          <el-input v-model="ruleForm.cf_tel"></el-input>
        </el-form-item>
        <el-form-item label="营养知识体系" prop="cf_kno">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.cf_kno"></el-input>
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="ruleForm.cf_grade" clearable placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工资" prop="cf_salary">
          <el-input v-model.number="ruleForm.cf_salary"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!--提交注册-->
    <div class="buttom">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="ruleForm"
        :rules="rules"
        status-icon
        class="demo-ruleForm"
      >
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    /* 检测用户名函数是否包含英文字母 */
    var checkAccount = (rule, value, callback) => {
      var check = /[a-zA-Z][a-zA-Z0-9_]{2,18}/

      if (!value) {
        callback(new Error('用户名不能为空'))
      } else if (!check.test(value)) {
        callback(new Error('账号为2-18个且包含字母和数字'))
      } else {
        callback()
      }
    }

    /* 检测用户输入密码是否是包含字母 */
    var validatePassword = (rule, value, callback) => {
      var checkpa = /[a-zA-Z]\w{1,17}/

      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!checkpa.test(value)) {
        callback(new Error('密码需要包括数字和字母'))
      } else {
        if (this.ruleForm.checkpassword !== '') {
          this.$refs.ruleForm.validateField('checkpassword')
        }
        callback()
      }
    }

    /* 检测确认密码函数 */
    var validatecheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 选择用户身份为必填
    /*  var validateindenty = (rule, value, callback) => {
      if (value === "请选择 ") {
        return callback(new Error("请选择用户身份"));
      } else {
        callback();
      }
    }; */
    /* 检测教师姓名是否是2-7个字的中文 */
    var validatename = (rule, value, callback) => {
      var check = /[\u4e00-\u9fa5]{2,7}/
      if (value === '') {
        callback(new Error('请输入姓名'))
      } else if (!check.test(value)) {
        callback(new Error('请输入中文名'))
      } else {
        callback()
      }
    }
    /* 检测教师手机号是否符合验证规则 */
    var validatetel = (rule, value, callback) => {
      var check = /0?(13|14|15|18|17)[0-9]{9}/
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!check.test(value)) {
        callback(new Error('手机号错误'))
      } else {
        callback()
      }
    }
    // 检测班级编号
    var validateTcClass = (rule, value, callback) => {
      var check = /\d{5,9}/
      if (value === '') {
        callback(new Error('请输班级号'))
      } else if (!check.test(value)) {
        callback(new Error('班级号错误'))
      } else {
        callback()
      }
    }
    // 检测工资
    var validatesalary = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 1000)
    }

    return {
      labelPosition: 'right',
      /* 教师职责可选数据 */
      options1: [
        {
          value: '选项1',
          label: '班主任'
        },
        {
          value: '选项2',
          label: '生活老师'
        }
      ],
      /* 配餐员等级 */
      options3: [
        {
          value: '选项1',
          label: '高级'
        },
        {
          value: '选项2',
          label: '中级'
        },
        {
          value: '选项3',
          label: '初级'
        }
      ],
      /* 厨师工种可选数据 */
      options2: [
        {
          value: '选项1',
          label: '炉头'
        },
        {
          value: '选项2',
          label: '上砧'
        },
        {
          value: '选项3',
          label: '打荷'
        },
        {
          value: '选项4',
          label: '水台'
        }
      ],

      /* 用户身份可选择的值 */
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
      /* 用户名，密码，确认密码，用户身份双向数据绑定 */
      ruleForm: {
        account: '',
        password: '',
        checkpassword: '',
        value: '',
        tc_name: '',
        tc_tel: '',
        tc_duty: '',
        tc_class: '',
        gu_name: '',
        gu_tel: '',
        co_name: '',
        co_tel: '',
        co_int: '',
        co_type: '',
        co_grade: '',
        co_salary: '',
        in_name: '',
        in_tel: '',
        in_salary: '',
        cf_name: '',
        cf_tel: '',
        cf_kno: '',
        cf_grade: '',
        cf_salary: ''
      },
      /* 插槽验证输入数据 */
      rules: {
        account: [{ required: true, validator: checkAccount, trigger: 'blur' }],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        checkpassword: [
          { required: true, validator: validatecheckPassword, trigger: 'blur' }
        ],
        value: [{ required: true, message: '请选择身份', trigger: 'change' }],
        tc_name: [{ required: true, validator: validatename, trigger: 'blur' }],
        tc_tel: [{ required: true, validator: validatetel, trigger: 'blur' }],
        tc_class: [
          { required: true, validator: validateTcClass, trigger: 'blur' }
        ],
        gu_name: [{ required: true, validator: validatename, trigger: 'blur' }],
        gu_tel: [{ required: true, validator: validatetel, trigger: 'blur' }],
        co_name: [{ required: true, validator: validatename, trigger: 'blur' }],
        co_tel: [{ required: true, validator: validatetel, trigger: 'blur' }],
        co_salary: [{ validator: validatesalary, trigger: 'blur' }],
        in_name: [{ required: true, validator: validatename, trigger: 'blur' }],
        in_tel: [{ required: true, validator: validatetel, trigger: 'blur' }],
        in_salary: [{ validator: validatesalary, trigger: 'blur' }],
        cf_name: [{ required: true, validator: validatename, trigger: 'blur' }],
        cf_tel: [{ required: true, validator: validatetel, trigger: 'blur' }],
        cf_salary: [{ validator: validatesalary, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        var self = this
        if (valid) {
          if (this.ruleForm.value === '选项1') {
            axios
              .post('http://114.55.141.250:8181/teacher/register', {
                username: this.ruleForm.account,
                paaasord: this.ruleForm.password,
                identity: 'teacher',
                name: this.ruleForm.tc_name,
                telnum: this.ruleForm.tc_tel,
                duty: this.ruleForm.tc_duty,
                classnum: this.ruleForm.tc_class
              })
              .then(function (res) {
                console.log('教师注册成功')
                console.log(res.data)
                self.$router.push('/')
              })
              .catch(function (err) {
                console.log(err)
              })
          } else if (this.ruleForm.value === '选项2') {
            axios
              .post('http://moon-ice.com:38080/app/mock/16/guardian/register', {
                username: this.ruleForm.account,
                paaasord: this.ruleForm.password,
                identity: 'guardian',
                name: this.ruleForm.gu_name,
                telnum: this.ruleForm.gu_tel
              })
              .then(function (res) {
                console.log('学生监护人登陆成功')
                console.log(res.data)
                self.$router.push('/')
              })
              .catch(function (err) {
                console.log(err)
              })
          } else if (this.ruleForm.value === '选项3') {
            axios
              .post('http://114.55.141.250:8181/cook/register', {
                username: this.ruleForm.account,
                password: this.ruleForm.password,
                identify: 'cook',
                name: this.ruleForm.co_name,
                telnum: this.ruleForm.co_tel,
                introduction: this.ruleForm.co_int,
                typeofwork: this.ruleForm.co_type,
                grade: this.ruleForm.co_grade,
                salary: this.ruleForm.co_salary
              })
              .then(function (res) {
                console.log('厨师登陆成功')
                console.log(res.data)
                self.$router.push('/')
              })
              .catch(function (err) {
                console.log(err)
              })
          } else if (this.ruleForm.value === '选项4') {
            axios
              .post('http://moon-ice.com:38080/app/mock/16/ingadmin/register', {
                username: this.ruleForm.account,
                paaasord: this.ruleForm.password,
                identity: 'cateringstaff',
                name: this.ruleForm.in_name,
                telnum: this.ruleForm.in_tel,
                salary: this.ruleForm.in_salary
              })
              .then(function (res) {
                console.log('食材管理员登陆成功')
                console.log(res.data)
                self.$router.push('/')
              })
              .catch(function (err) {
                console.log(err)
              })
          } else if (this.ruleForm.value === '选项5') {
            axios
              .post(
                'http://moon-ice.com:38080/app/mock/16/cateringstaff/register',
                {
                  username: this.ruleForm.account,
                  paaasord: this.ruleForm.password,
                  identity: 'ingadmin',
                  name: this.ruleForm.cf_name,
                  telnum: this.ruleForm.cf_tel,
                  knowledge: this.ruleForm.cf_kno,
                  grade: this.ruleForm.cf_grade,
                  salary: this.ruleForm.cf_salary
                }
              )
              .then(function (res) {
                console.log('营养配餐员登陆成功')
                console.log(res.data)
                self.$router.push('/')
              })
              .catch(function (err) {
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
    }
  }
}
</script>
<style  scoped>
.main {
  width: 700px;
  height: 570px;
  margin: auto;
}
.top {
  width: 700px;
  height: 250px;
  margin: auto;
}
.center {
  width: 700px;
  height: 300px;
  margin: auto;
  margin-top: 10px;
}
.center3 {
  width: 700px;
  height: 400px;
}
.center5 {
  width: 700px;
  height: 320px;
}
.buttom {
  width: 700px;
  height: 70px;
  margin-top: 5px;
}
</style>
