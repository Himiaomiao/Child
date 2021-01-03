import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
// import Home from '../components/Main/Home.vue'
import Login from '../components/Login.vue'
import Person from '../views/Person.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requireAuth: true, title: '首页' },
    children: [
      {
        /* 主页 */
        path: '/',
        name: 'Homemain',
        component: () => import('../components/Main/Homemain'),
        meta: { requireAuth: true, title: '首页' }
      },
      {
        /* 个人信息 */
        path: '/home/person',
        name: 'Person',
        component: () => import('../components/Main/Person'),
        meta: { requireAuth: true, title: '个人信息' }

      },
      /* 教师角色下班级信息 */
      {
        path: '/home/TC/studentclass',
        name: 'TcClass',
        component: () => import('../components/Teacher/TcClass'),
        meta: { requireAuth: true, title: '班级信息', role: 'teacher' }
      },
      /* 教师角色下班级学生信息 */
      {
        path: '/home/TC/studentinformation',
        name: 'Tcstudent',
        component: () => import('../components/Teacher/Tcstudent.vue'),
        meta: { requireAuth: true, title: '班级学生', role: 'teacher' }
      },
      /* 教师角色下增加学生 */
      {
        path: '/home/TC/addstudent',
        name: 'StudentAdd',
        component: () => import('../components/Teacher/StudentAdd.vue'),
        meta: { requireAuth: true, title: '增加学生', role: 'teacher' }
      },
      /* 教师角色下营养套餐库 */
      {
        path: '/home/TC/package',
        name: 'PackageInformation',
        component: () => import('../components/Package/PackageInformation.vue'),
        meta: { requireAuth: true, title: '营养套餐库', role: 'teacher' }
      },
      /* 教师角色下评价套餐 */
      {
        path: '/home/TC/evaluatepack',
        name: 'PackageEvaluat',
        component: () => import('../components/Package/PackageEvaluat.vue'),
        meta: { requireAuth: true, title: '评价套餐', role: 'teacher' }
      },
      /* 教师角色下食材信息 */
      {
        path: '/home/TC/ing',
        name: 'IngredientsInformation',
        component: () => import('../components/Ingerdient/IngredientsInformation.vue'),
        meta: { requireAuth: true, title: '食材信息', role: 'teacher' }
      },
      /* 教师角色下食物库 */
      {
        path: '/home/TC/food',
        name: 'FoodInformation',
        component: () => import('../components/Food/FoodInformation.vue'),
        meta: { requireAuth: true, title: '食物信息', role: 'teacher' }
      },
      /* 教师角色下评价食物 */
      {
        path: '/home/TC/evaluatefood',
        name: 'FoodEvaluat',
        component: () => import('../components/Food/FoodEvaluat.vue'),
        meta: { requireAuth: true, title: '评价食物', role: 'teacher' }
      },
      /* 教师角色下食物统计 */
      {
        path: '/home/TC/accountfood',
        name: 'FoodAccount',
        component: () => import('../components/Food/FoodAccount.vue'),
        meta: { requireAuth: true, title: '食物统计', role: 'teacher' }
      },
      /* 教师角色下营养素 */
      {
        path: '/home/TC/yingyang',
        name: 'Nutrient',
        component: () => import('../components/Nutrient.vue'),
        meta: { requireAuth: true, title: '营养素信息', role: 'teacher' }
      },
      {
        path: '/home/TC/schooltab',
        name: 'FoodTab',
        component: () => import('../components/Teacher/FoodTab'),
        meta: { requireAuth: true, title: '学校食物禁忌', role: 'teacher' }
      },
      {
        path: '/home/TC/stutab',
        name: 'StuTab',
        component: () => import('../components/Teacher/StuTab'),
        meta: { requireAuth: true, title: '学生食物禁忌', role: 'teacher' }
      },
      /* 监护人角色路由 */
      /* 监护人角色下班级信息 */
      {
        path: '/home/gu/class',
        name: 'ClassInformation',
        component: () => import('../components/Class/ClassInformation.vue'),
        meta: { requireAuth: true, title: '班级信息', role: 'guardian' }
      },
      /* 监护人角色下的学生信息 */
      {
        path: '/home/gu/student',
        name: 'Gustudent',
        component: () => import('../components/Gu/Gustudent.vue'),
        meta: { requireAuth: true, title: '学生信息', role: 'guardian' }
      },
      /* 监护人角色下的食材信息 */
      {
        path: '/home/gu/ing',
        name: 'IngredientsInformation',
        component: () => import('../components/Ingerdient/IngredientsInformation.vue'),
        meta: { requireAuth: true, title: '食材信息', role: 'guardian' }
      },
      /* 监护人角色下的食材汇总信息 */
      {
        path: '/home/gu/accounting',
        name: 'IngredientsAccount',
        component: () => import('../components/Ingerdient/IngredientsAccount.vue'),
        meta: { requireAuth: true, title: '食材汇总', role: 'guardian' }
      },
      /* 监护人角色下的食物信息 */
      {
        path: '/home/gu/food',
        name: 'FoodInformation',
        component: () => import('../components/Food/FoodInformation.vue'),
        meta: { requireAuth: true, title: '食物信息', role: 'guardian' }
      },
      /* 监护人角色下的食物评价信息 */
      {
        path: '/home/gu/evaluatefood',
        name: 'FoodEvaluat',
        component: () => import('../components/Food/FoodEvaluat.vue'),
        meta: { requireAuth: true, title: '食物汇总', role: 'guardian' }
      },
      /* 监护人角色下的套餐信息 */
      {
        path: '/home/gu/package',
        name: 'PackageInformation',
        component: () => import('../components/Package/PackageInformation.vue'),
        meta: { requireAuth: true, title: '套餐信息', role: 'guardian' }
      },
      /* 监护人下的评价套餐 */
      {
        path: '/home/gu/evaluatepag',
        name: 'PackageEvaluat',
        component: () => import('../components/Package/PackageEvaluat.vue'),
        meta: { requireAuth: true, title: '评价套餐', role: 'guardian' }
      },
      {
        /* 儿童食物推荐 */
        path: '/home/gu/childfood',
        name: 'ChildFood',
        component: () => import('../components/Gu/ChildFood.vue'),
        meta: { requireAuth: true, title: '儿童食谱推荐', role: 'guardian' }
      },
      {
        /* 儿童食物禁忌 */
        path: '/home/gu/childbit',
        name: 'Childbit',
        component: () => import('../components/Gu/Childbit.vue'),
        meta: { requireAuth: true, title: '儿童食物禁忌', role: 'guardian' }
      },
      /* 厨师角色路由 */
      /* 厨师下的学生汇总信息 */
      {
        path: '/home/cook/accountstudent',
        name: 'StudentAccount',
        component: () => import('../components/Student/StudentAccount.vue'),
        meta: { requireAuth: true, title: '学生信息汇总', role: 'cook' }
      },
      /* 厨师角色下食物信息 */
      {
        path: '/home/cook/food',
        name: 'FoodInformation',
        component: () => import('../components/Food/FoodInformation.vue'),
        meta: { requireAuth: true, title: '食物信息', role: 'cook' }
      },
      /* 厨师角色下增加食物 */
      {
        path: '/home/cook/addfood',
        name: 'FoodAdd',
        component: () => import('../components/Food/FoodAdd.vue'),
        meta: { requireAuth: true, title: '增加食物', role: 'cook' }
      },
      /* 厨师角色下食物信息统计 */
      {
        path: '/home/cook/accoutfood',
        name: 'FoodAdd',
        component: () => import('../components/Food/FoodAccount.vue'),
        meta: { requireAuth: true, title: '食物信息统计', role: 'cook' }
      },

      /* 厨师角色下食物反馈信息 */
      {
        path: '/home/cook/backfood',
        name: 'FoodBack',
        component: () => import('../components/Food/FoodBack.vue'),
        meta: { requireAuth: true, title: '食物反馈', role: 'cook' }
      },
      /* 厨师角色下食材库 */
      {
        path: '/home/cook/ing',
        name: 'IngredientsInformation',
        component: () => import('../components/Ingerdient/IngredientsInformation.vue'),
        meta: { requireAuth: true, title: '食材库', role: 'cook' }
      },
      /* 厨师角色下食材汇总信息 */
      {
        path: '/home/cook/accing',
        name: 'IngredientsAccount',
        component: () => import('../components/Ingerdient/IngredientsAccount.vue'),
        meta: { requireAuth: true, title: '食材汇总信息', role: 'cook' }
      },
      /* 厨师角色下食材评价信息 */
      {
        path: '/home/cook/evaluateing',
        name: 'IngredientsEvaluat',
        component: () => import('../components/Ingerdient/IngredientsEvaluat.vue'),
        meta: { requireAuth: true, title: '食材评价', role: 'cook' }
      },
      /* 厨师角色下套餐信息 */
      {
        path: '/home/cook/pag',
        name: 'PackageInformation',
        component: () => import('../components/Package/PackageInformation.vue'),
        meta: { requireAuth: true, title: '套餐信息', role: 'cook' }
      },
      /* 厨师角色下套餐汇总信息 */
      {
        path: '/home/cook/accountpag',
        name: 'PackageAccount',
        component: () => import('../components/Package/PackageAccount.vue'),
        meta: { requireAuth: true, title: '套餐汇总', role: 'cook' }
      },
      /* 厨师角色下评价套餐信息 */
      {
        path: '/home/cook/evaluatepag',
        name: 'PackageEvaluat',
        component: () => import('../components/Package/PackageEvaluat.vue'),
        meta: { requireAuth: true, title: '评价套餐', role: 'cook' }
      },
      /* 厨师角色下营养素信息 */
      {
        path: '/home/cook/yingyang',
        name: 'Nutrient',
        component: () => import('../components/Nutrient.vue'),
        meta: { requireAuth: true, title: '营养素信息', role: 'cook' }
      },
      {
        path: '/home/cook/schoolbit',
        name: 'Schooltab',
        component: () => import('../components/Schooltab.vue'),
        meta: { requireAuth: true, title: '营养素信息', role: 'cook' }

      },
      /* 食材管理员角色下学生数据统计 */
      {
        path: '/home/ing/accountstudent',
        name: 'StudentAccount',
        component: () => import('../components/Student/StudentAccount.vue'),
        meta: { requireAuth: true, title: '学生数据汇总', role: 'ingadmin' }
      },
      /* 食材管理员角色下食材管理 */
      {
        path: '/home/ing/ing',
        name: 'IngredientsInformation',
        component: () => import('../components/Ingerdient/IngredientsInformation.vue'),
        meta: { requireAuth: true, title: '食材汇总', role: 'ingadmin' }
      },
      /* 食材管理员角色下增加食材 */
      {
        path: '/home/ing/adding',
        name: 'IngredientsAdd',
        component: () => import('../components/Ingerdient/IngredientsAdd.vue'),
        meta: { requireAuth: true, title: '增加食材', role: 'ingadmin' }
      },
      /* 食材管理员角色下食材信息统计 */
      {
        path: '/home/ing/accouting',
        name: 'IngredientsAccount',
        component: () => import('../components/Ingerdient/IngredientsAccount.vue'),
        meta: { requireAuth: true, title: '食材信息统计', role: 'ingadmin' }
      },
      /* 食材管理员角色下食材信息反馈 */
      {
        path: '/home/ing/backing',
        name: 'IngredientsBack',
        component: () => import('../components/Ingerdient/IngredientsBack.vue'),
        meta: { requireAuth: true, title: '食材信息反馈', role: 'ingadmin' }
      },
      /* 食材管理员角色下食物信息 */
      {
        path: '/home/ing/food',
        name: 'FoodInformation',
        component: () => import('../components/Food/FoodInformation.vue'),
        meta: { requireAuth: true, title: '食物信息', role: 'ingadmin' }
      },
      /* 食材管理员角色下食物信息汇总 */
      {
        path: '/home/ing/accfood',
        name: 'FoodAccount',
        component: () => import('../components/Food/FoodAccount.vue'),
        meta: { requireAuth: true, title: '食物信息统计', role: 'ingadmin' }
      },
      /* 食材管理员角色下食物信息评价 */
      {
        path: '/home/ing/evaluatefood',
        name: 'FoodEvaluat',
        component: () => import('../components/Food/FoodEvaluat.vue'),
        meta: { requireAuth: true, title: '食物评价信息', role: 'ingadmin' }
      },
      /* 食材管理员套餐列表 */
      {
        path: '/home/ing/pag',
        name: 'PackageInformation',
        component: () => import('../components/Package/PackageInformation.vue'),
        meta: { requireAuth: true, title: '食材列表', role: 'ingadmin' }
      },
      /* 食材管理员套餐汇总 */
      {
        path: '/home/ing/accountpag',
        name: 'PackageAccount',
        component: () => import('../components/Package/PackageAccount.vue'),
        meta: { requireAuth: true, title: '套餐汇总', role: 'ingadmin' }
      },

      /* 食材管理员套餐评价 */
      {
        path: '/home/ing/evaluatepag',
        name: 'PackageEvaluat',
        component: () => import('../components/Package/PackageEvaluat.vue'),
        meta: { requireAuth: true, title: '套餐评价', role: 'ingadmin' }
      },
      /* 食材管理员角色下营养素信息 */
      {
        path: '/home/ing/yingyang',
        name: 'Nutrient',
        component: () => import('../components/Nutrient.vue'),
        meta: { requireAuth: true, title: '营养素信息', role: 'ingadmin' }
      },
      {
        path: '/home/ing/schoolbit',
        name: 'ingbit',
        component: () => import('../components/ingbit.vue'),
        meta: { requireAuth: true, title: '学校禁忌', role: 'ingadmin' }
      },
      /* 营养配餐员角色下推荐学校套餐 */
      {
        path: '/home/caf/schoolpackage',
        name: 'SchoolPackage',
        component: () => import('../components/SchoolPackage.vue'),
        meta: { requireAuth: true, title: '学校套餐', role: 'cateringstaff' }
      },
      {
        path: '/home/caf/schoolbat',
        name: 'Schooltab',
        component: () => import('../components/Schooltab.vue'),
        meta: { requireAuth: true, title: '学校食物禁忌', role: 'cateringstaff' }
      },
      /* 营养配餐员角色下学生列表信息 */
      {
        path: '/home/caf/student',
        name: 'StudentInformation',
        component: () => import('../components/Student/StudentInformation.vue'),
        meta: { requireAuth: true, title: '学生列表', role: 'cateringstaff' }
      },
      /* 营养配餐员角色下学生信息汇总 */
      {
        path: '/home/caf/studentaccount',
        name: 'StudentAccount',
        component: () => import('../components/Student/StudentAccount.vue'),
        meta: { requireAuth: true, title: '学生信息汇总', role: 'cateringstaff' }
      },
      /* 营养配餐员角色下食物信息 */
      {
        path: '/home/caf/food',
        name: 'FoodInformation',
        component: () => import('../components/Food/FoodInformation.vue'),
        meta: { requireAuth: true, title: '食物信息', role: 'cateringstaff' }
      },
      /* 营养配餐员角色下食物汇总信息 */
      {
        path: '/home/caf/accfood',
        name: 'FoodAccount',
        component: () => import('../components/Food/FoodAccount.vue'),
        meta: { requireAuth: true, title: '食物汇总信息', role: 'cateringstaff' }
      },
      /* 营养配餐员角色下食物评价 */
      {
        path: '/home/caf/evaluatefood',
        name: 'FoodEvaluat',
        component: () => import('../components/Food/FoodEvaluat.vue'),
        meta: { requireAuth: true, title: '食物评价', role: 'cateringstaff' }
      },
      /* 营养配餐员下的食材信息 */
      {
        path: '/home/caf/ing',
        name: 'IngredientsInformation',
        component: () => import('../components/Ingerdient/IngredientsInformation.vue'),
        meta: { requireAuth: true, title: '食材信息', role: 'cateringstaff' }
      },
      /* 营养配餐员下的食材汇总 */
      {
        path: '/home/caf/accing',
        name: 'IngredientsAccount',
        component: () => import('../components/Ingerdient/IngredientsAccount.vue'),
        meta: { requireAuth: true, title: '食材汇总', role: 'cateringstaff' }
      },
      /* 营养配餐员下的食材评价 */
      {
        path: '/home/caf/evaluateing',
        name: 'IngredientsEvaluat',
        component: () => import('../components/Ingerdient/IngredientsEvaluat.vue'),
        meta: { requireAuth: true, title: '食材评价', role: 'cateringstaff' }
      },
      /* 营养配餐员下的套餐列表 */
      {
        path: '/home/caf/pag',
        name: 'PackageInformation',
        component: () => import('../components/Package/PackageInformation.vue'),
        meta: { requireAuth: true, title: '套餐列表', role: 'cateringstaff' }
      },
      /* 营养配餐员下的套餐汇总 */
      {
        path: '/home/caf/accountpag',
        name: 'PackageAccount',
        component: () => import('../components/Package/PackageAccount.vue'),
        meta: { requireAuth: true, title: '套餐汇总', role: 'cateringstaff' }
      },
      /* 营养配餐员下的增加套餐 */
      {
        path: '/home/caf/addpag',
        name: 'PackageAdd',
        component: () => import('../components/Package/PackageAdd.vue'),
        meta: { requireAuth: true, title: '增加套餐', role: 'cateringstaff' }
      },
      /* 营养配餐员下的增加营养配餐 */
      {
        path: '/home/caf/addmakepag',
        name: 'PackageMake',
        component: () => import('../components/Package/PackageMake.vue'),
        meta: { requireAuth: true, title: '配餐评价信息', role: 'cateringstaff' }
      },
      /* 营养配餐员下的套餐评价 */
      {
        path: '/home/caf/backpag',
        name: 'PackageEvaluat',
        component: () => import('../components/Package/PackageEvaluat.vue'),
        meta: { requireAuth: true, title: '套餐评价', role: 'cateringstaff' }
      },
      /* 营养配餐员角色下营养素信息 */
      {
        path: '/home/caf/yingyang',
        name: 'Nutrient',
        component: () => import('../components/Nutrient.vue'),
        meta: { requireAuth: true, title: '营养素信息', role: 'cateringstaff' }
      },
      {
        path: '/home/404',
        name: '404',
        component: () => import('../components/NoFound.vue'),
        meta: { title: '404' }
      }
    ]
  },
  {
    path: '/person',
    name: 'Person',
    component: Person,
    meta: { requireAuth: true }

  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/upPakge',
    name: 'AddPackage',
    component: () => import('../components/Package/AddPackage.vue')
  },
  {
    path: '/test',
    component: () => import('@/views/test'),
    hidden: true,
    requireAuth: false
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(router)
  console.log('111111111111111111111')
  // 读取页面保存的信息
  const flag = window.sessionStorage.getItem('user')
  console.log(JSON.parse(flag))
  if (to.meta.requireAuth === true) { // 判断是否需要路由守卫才能跳转页面
    console.log('进入登陆守卫')
    if (!flag) { // 登陆失败或者没有登陆时保持在登陆界面
      next({
        path: '/'
      })
    } else { // 登陆成功则跳转下一个页面
      /* 教师角色用户 */
      if (to.meta.role === 'teacher') {
        console.log('role为teacher')
        if (JSON.parse(flag).data.identify !== 'teacher') { // 不是教师角色的页面跳转到404
          next({
            path: '/home/404'
          })
        } else { // 是教师角色的跳转到下一页
          return next()
        }
      } else if (to.meta.role === 'guardian') {
        console.log('role为guardian')
        if (JSON.parse(flag).data.identify !== 'guardian') { // 不是监护人角色的页面跳转到404
          next({
            path: '/home/404'
          })
        } else { // 监护人角色跳转到下一页
          return next()
        }
      } else if (to.meta.role === 'cook') {
        console.log('role为cook')
        if (JSON.parse(flag).data.identify !== 'cook') { // 不是出厨师角色的页面跳转到404
          next({
            path: '/home/404'
          })
        } else { // 厨师角色跳转到下一页
          return next()
        }
      } else if (to.meta.role === 'ingadmin') {
        console.log('role为ingadmin')
        if (JSON.parse(flag).data.identify !== 'ingadmin') { // 不是食材管理员跳转到404
          next({
            path: '/home/404'
          })
        } else {
          return next()// 食材管理员跳转到下一页
        }
      } else if (to.meta.role === 'cateringstaff') {
        console.log('role为cateringstaff')
        if (JSON.parse(flag).data.identify !== 'cateringstaff') { // 不是配餐员跳转到404
          next({
            path: '/home/404'
          })
        } else {
          return next()// 配餐员跳转到下一页
        }
      } else {
        return next()// 不需要进行身份判断的直接跳转
      }
    }
  } else { // 不需要路由守卫则直接跳转
    return next()
  }
})

/* 防止重复点击按钮 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
