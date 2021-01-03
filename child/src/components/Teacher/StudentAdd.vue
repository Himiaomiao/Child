  <template>
  <div class="right-main">
    <el-form
      :inline="true"
      :model="addinformation"
      class="demo-form-inline"
      ref="addinformation"
      status-icon
      :rules="rules"
    >
      <el-form-item label="班级号" prop="classNum">
        <el-input
          v-model="addinformation.classNum"
          placeholder="班级号"
          style="min-width: 250px"
        ></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="studentNum">
        <el-input
          v-model="addinformation.studentNum"
          placeholder="学号"
          style="min-width: 250px"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="studentName">
        <el-input
          v-model="addinformation.studentName"
          placeholder="姓名"
          style="min-width: 250px"
        ></el-input>
      </el-form-item>
      <el-form-item label="身高(cm)" prop="studentHeight">
        <el-input
          v-model.number="addinformation.studentHeight"
          placeholder="身高"
        ></el-input>
      </el-form-item>
      <el-form-item label="体重(kg)" prop="studentWeight">
        <el-input
          v-model="addinformation.studentWeight"
          placeholder="体重"
        ></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="birtay">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="addinformation.birtay"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="学生性别" prop="sex">
        <el-radio v-model="addinformation.sex" label="男">男</el-radio>
        <el-radio v-model="addinformation.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="监护人" prop="studentGd">
        <el-input
          v-model="addinformation.studentGd"
          placeholder="监护人姓名"
          style="min-width: 250px"
        ></el-input>
      </el-form-item>
      <el-form-item label="与监护人关系" prop="relation">
        <el-radio-group v-model="addinformation.relation">
          <el-radio label="父母">父母</el-radio>
          <el-radio label="祖孙">祖孙</el-radio>
          <el-radio label="其他">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="监护人手机号" prop="studentGdtel">
        <el-input
          v-model="addinformation.studentGdtel"
          placeholder="手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="studentDetailedaddress">
        <el-input
          v-model="addinformation.studentDetailedaddress"
          placeholder="（xx）小区"
          style="width: 250px"
        ></el-input>
      </el-form-item>
      <div>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('addinformation')"
            style="display: block"
            >添加</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="resetForm('addinformation')"
            style="display: block"
            >重置</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import dayjs from 'dayjs'
export default {
  name: 'StudentInformation',
  data() {
    var checkNum = (rule, value, callback) => {
      var check = /[0-9]{10}/
      if (!value) {
        return callback(new Error('学号不能为空'))
      } else if (!check.test(value)) {
        callback(new Error('学号为10位数字'))
      } else {
        callback()
      }
    }
    var checkName = (rule, value, callback) => {
      var check = /[\u4e00-\u9fa5]{2,7}/
      if (value === '') {
        callback(new Error('姓名不能为空'))
      } else if (!check.test(value)) {
        callback(new Error('姓名为2-7为中文字符'))
      } else {
        callback()
      }
    }
    var checkHeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身高不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 0) {
            callback(new Error('身高不能为负数'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var checkWeight = (rule, value, callback) => {
      var check = /^(0(\.\d{1}){0,1}|[1-8]\d{1,3}(\.\d{1}){0,1}|9\d{1,2}(\.\d{1}){0,1}|999(\.0){0,1}|.{0})$/
      if (!value) {
        return callback(new Error('体重不能为空'))
      }
      setTimeout(() => {
        if (!check.test(value)) {
          callback(new Error('体重数据不合理'))
        } else {
          callback()
        }
      }, 1000)
    }
    var checkGdtel = (rule, value, callback) => {
      var check = /0?(13|14|15|18|17)[0-9]{9}/
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!check.test(value)) {
        callback(new Error('手机号错误'))
      } else {
        callback()
      }
    }
    return {
      radio: '男',
      rules: {
        studentNum: [{ validator: checkNum, trigger: 'blur' }],
        studentName: [{ validator: checkName, trigger: 'blur' }],
        studentHeight: [{ validator: checkHeight, trigger: 'blur' }],
        studentWeight: [{ validator: checkWeight, trigger: 'blur' }],
        studentGd: [{ validator: checkName, trigger: 'blur' }],
        studentGdtel: [{ validator: checkGdtel, trigger: 'blur' }]
      },
      addinformation: {
        studentNum: '',
        studentName: '',
        studentHeight: '',
        studentWeight: '',
        studentGd: '',
        studentGdtel: '',
        studentDetailedaddress: '',
        sex: '',
        birtay: '',
        relation: '',
        classNum: ''
      },
      form: {}
    }
  },
  methods: {
    submitForm(formName) {
      console.log(this.addinformation)
      var time = this.addinformation.birtay
      var mytime = dayjs(time).format('YYYY-MM-DD')
      this.addinformation.birtay = mytime
      console.log(mytime)
      console.log(this.addinformation)
      var self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post('http://114.55.141.250:8181/tc/addstudent', {
              classNum: this.addinformation.classNum,
              relation: this.addinformation.relation,
              studentAddress: this.addinformation.studentAddress,
              studentBirthday: mytime,
              studentGd: this.addinformation.studentGd,
              studentGdtel: this.addinformation.studentGdtel,
              studentHeight: this.addinformation.studentHeight,
              studentName: this.addinformation.studentName,
              studentNum: this.addinformation.studentNum,
              studentSex: this.addinformation.sex,
              studentWeight: this.addinformation.studentWeight
            })
            .then(function (res) {
              console.log(res.data)
              self.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success'
              })
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  }
}
</script>
<style scoped>
.el-form--inline .el-form-item {
  margin-right: 0.5rem;
}
</style>
