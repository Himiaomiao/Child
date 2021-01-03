<template>
  <div>
    <template v-if="userInfo.data.identify==='teacher'">
      <el-card class="box-card">
        <div class="text item">{{'用户编号 :' +userInfo.data.id }}</div>
        <div class="text item">{{'用户名 :' + userInfo.data.username }}</div>
        <div class="text item">{{'姓名 :' + userInfo.data.name }}</div>
        <div class="text item">{{'手机号 :' + userInfo.data.telnum }}</div>
        <div class="text item">{{'角色 :' + userInfo.data.identify}}</div>
        <div class="text item">{{'所管理班级 :' + userInfo.data.classnum }}</div>
        <div class="text item">{{'职责 :' + userInfo.data.duty }}</div>
      </el-card>
    </template>
    <template v-else-if="userInfo.data.identify==='guardian'">
      <el-card class="box-card">
        <div class="text item">{{'用户编号 :' +userInfo.data.id }}</div>
        <div class="text item">{{'用户名 :' + userInfo.data.username }}</div>
        <div class="text item">{{'姓名 :' + userInfo.data.name }}</div>
        <div class="text item">{{'手机号 :' + userInfo.data.telnum }}</div>
      </el-card>
    </template>
    <template v-else-if="userInfo.data.identify==='cook'">
      <el-card class="box-card">
        <div class="text item">{{'用户编号 :' +userInfo.data.id }}</div>
        <div class="text item">{{'用户名 :' + userInfo.data.username }}</div>
        <div class="text item">{{'姓名 :' + userInfo.data.name }}</div>
        <div class="text item">{{'手机号 :' + userInfo.data.telnum }}</div>
        <div class="text item">{{'工资 :' + userInfo.data.telnum }}</div>
      </el-card>
    </template>
    <template v-else-if="userInfo.data.identify==='ingadmin'">
      <el-card class="box-card">
        <div class="text item">{{'用户编号 :' +userInfo.data.id }}</div>
        <div class="text item">{{'用户名 :' + userInfo.data.username }}</div>
        <div class="text item">{{'姓名 :' + userInfo.data.name }}</div>
        <div class="text item">{{'手机号 :' + userInfo.data.telnum }}</div>
        <div class="text item">{{'工资 :' + userInfo.data.telnum }}</div>
      </el-card>
    </template>
    <template v-else>
      <el-card class="box-card">
        <div class="text item">{{'用户编号 :' +userInfo.data.id }}</div>
        <div class="text item">{{'用户名 :' + userInfo.data.username }}</div>
        <div class="text item">{{'姓名 :' + userInfo.data.name }}</div>
        <div class="text item">{{'手机号 :' + userInfo.data.telnum }}</div>
        <div class="text item">{{'工资 :' + userInfo.data.telnum }}</div>
      </el-card>
    </template>
  </div>
</template>
<script>
export default {
  name: 'Person',
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  }
}
</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  height: 100%;
}
</style>
