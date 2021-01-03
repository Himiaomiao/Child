<template>
  <el-container style="width: 100%; height: 100%; overflow: auto">
    <!--左边导航-->
    <el-aside :width="Asidwidth" style="height: 100% !important">
      <!--控制overflow:visible使得侧边栏可以滚动显示全部信息-->
      <el-container
        style="width: 100%; height: 100%; overflow: visible !important"
      >
        <!--滚动条-->
        <el-scrollbar style="width: 100%; min-height: 100%">
          <!--左侧导航栏头部-->
          <el-header
            v-if="isCollapse ? false : true"
            style="
              width: 100% !important;
              height: 50px !important;
              background-color: rgb(84, 71, 164);
              line-height: 50px;
            "
          >
            <p style="font-size: 15px">功能导航</p>
          </el-header>
          <!--左侧导航菜单部分-->
          <el-main style="height: 100%; overflow: visible !important">
            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              @select="handleSelect"
              background-color="#6959cd"
              text-color="#fff"
              active-text-color="#42b983"
              style="height: 100%"
              :collapse="isCollapse"
              :router="true"
            >
              <el-menu-item index="/home" route="/home">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <!--使用封装的树形控件-->
              <MenuTree :menuData="menuList"></MenuTree>
            </el-menu>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-aside>
    <el-container>
      <!--右侧头部-->
      <el-header>
        <el-row>
          <!--展开收起图标部分-->
          <el-col :span="2">
            <div style="color: #00000096; font-size: 0.25rem !important">
              <i
                :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                style="margin-right: 10px"
                @click="myshow"
              ></i>
            </div>
          </el-col>
          <!--面包屑渲染部分-->
          <el-col :span="14">
            <el-breadcrumb
              separator-class="el-icon-arrow-right"
              style="margin-top: 0.15rem; width: 100%; height: 100%"
            >
              <el-breadcrumb-item v-for="item in levelList" :key="item.path">
                <a @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <!--退出登陆等其他图标部分-->
          <el-col :span="8">
            <el-row>
              <el-col :span="20">
                <h5 class="el-icon-s-custom" style="color: #40c9c6">
                  用户角色： {{ userInfo.data.identify }}
                </h5>
              </el-col>
              <el-col :span="4">
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                    <el-avatar
                      :src="require('../assets/favicon.gif')"
                    ></el-avatar>
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-user" command="person"
                      >个人信息</el-dropdown-item
                    >
                    <el-dropdown-item
                      icon="el-icon-edit"
                      command="updataPassword"
                      >修改密码</el-dropdown-item
                    >
                    <el-dropdown-item icon="el-icon-lock" command="exit"
                      >退出</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
            <!--更改密码-->
            <el-dialog title="更改密码" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="新密码" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.password"
                    autocomplete="off"
                    show-password
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </el-col>
        </el-row>
      </el-header>
      <!--右侧中间-->
      <el-main>
        <el-container style="width: 100%; height: 100%">
          <!--中间顶部标签部分-->
          <el-header
            style="
              width: 100%;
              height: 35px !important;
              border: solid 2px #e7e9ee;
              overflow: hidden;
            "
          >
            <el-tabs
              v-model="activeIndex"
              type="border-card"
              closable
              v-if="openTab.length"
              @tab-click="tabClick"
              @tab-remove="tabRemove"
            >
              <el-tab-pane
                :key="item.name"
                v-for="item in openTab"
                :label="item.name"
                :name="item.route"
              ></el-tab-pane>
            </el-tabs>
          </el-header>
          <el-main
            style="padding-top:10px !important overflow:hidden !important"
          >
            <el-container
              style="width: 100%; height: 100%; overflow: hidden !important"
            >
              <el-scrollbar style="width: 100%; min-height: 100%">
                <!--主体模块组件渲染部分-->
                <el-main style="overflow: visible">
                  <router-view></router-view>
                </el-main>
              </el-scrollbar>
            </el-container>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
import MenuTree from '../components/Main/MenuTree'
export default {
  /* 组件名称 */
  name: 'Home',
  components: {
    MenuTree
  },
  data() {
    /* 页面数据参数 */
    return {
      formLabelWidth: '120px',
      form: {
        password: ''
      },
      dialogFormVisible: false,
      levelList: null,
      editableTabsValue: '1',
      editableTabs: [
        {
          title: '首页',
          name: '1',
          content: 'Tab 1 content',
          path: '/home'
        }
      ],
      tabIndex: 2,
      menuList: [],
      showbread: 'false',
      breadcrumbName: '',
      breadcrumbName2: '',
      tags: [],
      squareUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      Asidwidth: '200px',
      fit: 'fill',
      isCollapse: false
    }
  },
  methods: {
    /* 控制面包屑渲染 */
    getBreadList() {
      const matched = this.$route.matched.filter((item) => item.name) // $route.matched 将会是一个包含从上到下的所有对象 (副本)。
      this.levelList = matched
      console.log(this.levelList)
    },
    handleLink(item) {
      const { redirect, path } = item
      console.log(item)
      if (redirect) {
        console.log('redirect的值')
        console.log(redirect)
        this.$router.push(redirect)
        return
      }
      console.log('path的值是')
      console.log(path)
      // this.$router.push(this.pathCompile(path))
      this.$router.push(path)
    },
    tabClick(tab) {
      var self = this
      console.log('tab', tab)
      console.log('active', this.activeIndex)
      self.$router.push(this.activeIndex)
    },
    // 移除tab标签
    tabRemove(targetName) {
      var self = this
      console.log('this.router信息')
      console.log('targetName的值', targetName)
      // 首页不删
      if (targetName === '/home') {
        return
      }
      this.$store.commit('delete_tabs', targetName)
      console.log('activeIndex的值')
      console.log(self.activeIndex)
      if (this.$route.path === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
          console.log(
            '=============',
            this.openTab[this.openTab.length - 1].route
          )
          self.$store.commit(
            'set_active_index',
            this.openTab[this.openTab.length - 1].route
          )
          self.$router.push({ path: this.activeIndex })
          console.log('执行if')
        } else {
          console.log('进入else')
          self.$router.push({ path: '/' })
        }
      }
    },
    handleCommand(command) {
      console.log(command)
      if (command === 'exit') {
        this.exit()
      } else if (command === 'person') {
        this.person()
      } else {
        this.updataPassword()
      }
    },
    /* 退出系统 */
    exit: function () {
      this.$store.state.openTab = []
      console.log('退出')
      /* 清楚token数据 */
      window.sessionStorage.clear()
      /* 路由退回登陆界面 */
      this.$router.push('/')
    },
    /* 控制左侧导航栏展开和关闭函数 */
    myshow: function () {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse === false) {
        this.Asidwidth = '200px'
      } else {
        this.Asidwidth = '43px'
      }
    },

    handleSelect(key, keyPath) {
      this.addTab(key)
    },
    tagOneClick() {
      this.$router.push('/home')
    },
    person() {
      this.$router.push('/home/person')
    },
    updataPassword() {
      console.log('点击更改密码')
      this.dialogFormVisible = true
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    openTab() {
      console.log(this.$store.state.openTab)
      return this.$store.state.openTab
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex
      },
      set(val) {
        this.$store.commit('set_active_index', val)
      }
    }
  },
  mounted() {
    console.log(this.$store.state.openTab)
    console.log('进入获取菜单函数')
    var self = this
    /* 获取用户身份 */
    var identify = self.$store.state.userInfo.data.identify
    var ul = ''
    if (identify === 'teacher') {
      ul = 'http://114.55.141.250:8181/menu/1/'
    } else if (identify === 'guardian') {
      ul = 'http://114.55.141.250:8181/menu/2/'
    } else if (identify === 'cook') {
      ul = 'http://114.55.141.250:8181/menu/3/'
    } else if (identify === 'ingadmin') {
      ul = 'http://114.55.141.250:8181/menu/4/'
    } else if (identify === 'cateringstaff') {
      ul = 'http://114.55.141.250:8181/menu/5/'
    }
    axios
      .post(ul)
      .then(function (res) {
        console.log('菜单信息')
        console.log(res.data)
        if (identify === 'guardian') self.menuList = res.data.Teachermenudata
        else if (identify === 'teacher') {
          self.menuList = res.data.Guardianmenu
        } else if (identify === 'ingadmin') self.menuList = res.data.Ingmenu
        else if (identify === 'cook') self.menuList = res.data.Cookmenu
        else if (identify === 'cateringstaff') self.menuList = res.data.cafmenu
      })
      .catch(function (err) {
        console.log(err)
      })

    if (window.performance.navigation.type !== 1) {
      if (this.$route.path !== '/home') {
        console.log('1')
        this.$store.commit('add_tabs', { route: '/home', name: '首页' })
        this.$store.commit('add_tabs', {
          route: this.$route.path,
          name: this.$route.meta.title
        })
        this.$store.commit('set_active_index', this.$route.path)
      } else {
        console.log('2')
        this.$store.commit('add_tabs', { route: '/home', name: '首页' })
        this.$store.commit('set_active_index', '/home')
        this.$router.push('/home')
      }
    } else {
      console.log('页面被创建')
    }
  },
  watch: {
    activeIndex() {
      console.log(this.activeIndex)
    },
    $route(to, from) {
      this.getBreadList()
      console.log('页面路由信息')
      console.log(to)
      // 判断路由是否已经打开
      // 已经打开的 ，将其置为active
      // 未打开的，将其放入队列里
      let flag = false
      for (const item of this.openTab) {
        console.log('item.name', item.name)
        console.log('t0.name', to.name)

        if (item.name === to.meta.title) {
          console.log('item等于to')
          console.log('to.path', to.path)
          this.$store.commit('set_active_index', to.path)
          flag = true
          break
        }
      }
      if (!flag) {
        console.log('to.path', to.path)
        this.$store.commit('add_tabs', { route: to.path, name: to.meta.title })
        this.$store.commit('set_active_index', to.path)
      }
    }
  },
  created() {
    this.getBreadList()
  }
}
</script>
<style scoped>
.el-header,
.el-footer {
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: aliceblue;
  height: 50px !important;
  padding: 0px !important;
}

.el-aside {
  color: #333;
  line-height: 100%;
  overflow: auto;
}

.el-main {
  color: #333;
  padding: 0px !important;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-card__body {
  padding-top: 3px !important;
}
.Asider-top {
  width: 100%;
  height: 50px;
  background-color: #473c8b;
  color: #43b983;
  padding-top: 0.1rem;
  text-align: center;
  font-size: 0.15rem;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-tag {
  float: left;
  margin-top: 0.04rem;
  margin-left: 0.1rem;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 0px !important;
}
.el-tabs--border-card {
  height: 35px !important;
}
</style>
<style >
.right-main-1 {
  min-height: 130px;
}
.el-card__body {
  padding: 0px !important;
  padding-top: 0.1rem !important;
}
.el-submenu .el-menu-item {
  padding: 0px !important;
}
.page-component__scroll {
  height: 100% !important;
}
.page-component__scroll .el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-scrollbar__view {
  height: 100% !important;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
