import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// import store from '../store'

import Load from './views/Load.vue'  //登录页
import Register from './views/register.vue'  //登录页

import Team from './views/Team.vue'  //登录页
import Manager from './components/Manager.vue'
import OrderTaking from './views/OrderTaking.vue'   //接单
import OrderTakingDetail from './views/OrderTakingDetail.vue'  // 接单详情

import TeamSetting from './components/TeamSetting.vue'
import TeamForum from './components/TeamForum.vue' // 团队论坛

import Department from './components/Department.vue'
import personalForm from './components/teamMessage/personalForm'  // 个人
import companyForm from './components/teamMessage/companyForm'   // 企业
import TeamList from './components/TeamList.vue'

import baseSetting from './components/baseSetting.vue'
import Setting from './components/Setting.vue'  //其他设置
import Userlist from './components/Userlist.vue'  // 发单管理
import OrderTarkingCard from './components/OrderTarkingCard.vue'
import Adduser from './components/Adduser.vue'  //添加用户

import DetailCard from './components/commentCard/DetailCard.vue'
import companyInfo from './components/company/companyInfo.vue'  //草稿箱 容器
import Company from './components/Company.vue' //全部标签页


Vue.use(Router)

let routers = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Load',
      component: Load,
      redirect: 'Load',
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
      redirect: '/teamForum',
      children: [
        {
          path: '/teamForum',
          name: 'TeamForum',
          component: TeamForum,

          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/detailCard',
          name: 'DetailCard',
          component: DetailCard,
          title: '论坛详情',
          meta: {
            requiresAuth: 2
          }
        },
        { //发单管理
          path: '/userlist',
          name: 'Userlist',
          component: Userlist,
          meta: {
            requiresAuth: 2
          }
        },
        { //发单管理
          path: '/orderTarkingCard',
          name: 'OrderTarkingCard',
          component: OrderTarkingCard,
          meta: {
            requiresAuth: 2
          }
        },
        { // 团队设置
          path: '/teamSetting',
          name: 'TeamSetting',
          component: TeamSetting,
          meta: {
            requiresAuth: 2
          }
        },
        { // 团队企业设置
          path: '/personalForm',
          name: 'personalForm',
          component: personalForm,
          meta: {
            requiresAuth: 2
          }
        },
        { // 团队个人设置
          path: '/companyForm',
          name: 'companyForm',
          component: companyForm,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/companyInfo',
          name: 'companyInfo',
          component: companyInfo,
          meta: {
            requiresAuth: 2
          }
        },
        { //部门
          path: '/department',
          name: 'Department',
          component: Department,
          meta: {
            requiresAuth: 2
          }
        },
        { // 基本设置
          path: '/baseSetting',
          name: 'baseSetting',
          component: baseSetting,
          meta: {
            requiresAuth: 2
          }
        },
        { // 其他设置
          path: '/setting',
          component: Setting,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/company',  // 企业账户
          component: Company,
          meta: {
            requiresAuth: 2
          },
          children: [
          ]
        },
        {
          path: '/teamList',  // 团队账户
          component: TeamList,
          meta: {
            requiresAuth: 2
          },
          children: [
          ]
        },
        {
          path: 'adduser',  //添加用户
          name: Adduser,
          component: Adduser,
          meta: {
            requiresAuth: 1
          }
        },
        {
          path: '/manager',  //用户列表
          name: Manager,
          component: Manager,
          meta: {
            requiresAuth: 1
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/orderTaking',
      name: 'OrderTaking',
      component: OrderTaking
    },
    {
      path: '/orderTakingDetail',
      name: 'OrderTakingDetail',
      component: OrderTakingDetail
    },
    {
      path: '/Load',
      name: 'Load',
      component: Load
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
// 全部钩子
// routers.beforeEach((to,from,next)=>{
//   let path=from.path
//       if (to.path === '/load'|| to.path === '/about' || to.path==='/register') {
//             next();
//           } else {
//             let desc= store.state.user.desc;
//             if(!desc) {
//               next('/load')
//             }else{
//                 if(desc<=to.meta.requiresAuth){
//                   next()
//                 }else{
//                   next(path)
//                 }
//             }

//           }

// })
// 公出路由
export default routers
