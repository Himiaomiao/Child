<template>
  <div class="right1">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      :inline="true"
    >
      <el-form-item label="班级编号" prop="classnum">
        <el-input v-model="ruleForm.classnum" clearable></el-input>
      </el-form-item>
      <el-form-item label="班级人数" prop="classpeople">
        <el-input v-model.number="ruleForm.classpeople" clearable></el-input>
      </el-form-item>
      <el-form-item label="班级教师">
        <el-input v-model="ruleForm.tc_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="教师手机号" prop="tc_tel">
        <el-input v-model="ruleForm.tc_tel" clearable></el-input>
      </el-form-item>
      <el-form-item label="教师职责">
        <el-select v-model="ruleForm.tc_duty" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label="班级描述">
          <el-input
            v-model="ruleForm.classdescript"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5}"
            style="width:400px"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" :plain="true" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ClassInformation',
  data() {
    // 检测班级人数
    var check = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        return callback(new Error('班级人数不能为空'))
      } else {
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            callback()
          }
        }, 1000)
      }
    }
    // 检测手机号
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
    return {
      options: [
        {
          value: '选项1',
          label: '生活老师'
        },
        {
          value: '选项2',
          label: '班主任'
        }
      ],
      ruleForm: {
        classnum: '',
        classpeople: '',
        classdescript: '12344',
        tc_name: '',
        tc_tel: '',
        tc_duty: '班主任'
      },
      rules: {
        classnum: [{ validator: validateTcClass, trigger: 'blur' }],
        tc_tel: [{ validator: validatetel, trigger: 'blur' }],
        classpeople: [{ validator: check, trigger: 'blur' }]
      }
    }
  },
  methods: {
    /* 提交增加班级信息 */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm.tc_tel)
          this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 重置增加班级信息  */
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    /* 从后端接口获取班级数据 */
    getdata: function () {
      /* 保存this信息 */
      var self = this
      axios
        .get('http://localhost:3000/data')
        .then(function (res) {
          /* 获取数据赋值给tableData渲染 */
          self.tableData = res.data.class
          //  console.log(res.data.class);
          self.restaurants = res.data.class
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  /* 计算属性 */
  computed: {
    /* 获取登陆用户信息 */
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  /* moubted当页面组件以及ele组件渲染完毕时执行，实现获取获取后端数据 */
  mounted() {
    this.getdata()
    const temp = this.$store.state.userInfo
    this.ruleForm.tc_name = temp.data.name
    this.ruleForm.tc_tel = temp.data.telnum
  }
}
</script>
<style scoped>
.right1 {
  width: 100%;
  min-height: 100%;
}
</style>
