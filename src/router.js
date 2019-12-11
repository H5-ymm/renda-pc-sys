import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// import store from '../store'

import Load from './views/Load.vue'  //登录页
import Register from './views/register.vue'  //登录页

import Team from './views/Team.vue'  //登录页

import OrderTaking from './views/OrderTaking.vue'   //接单
import OrderTakingDetail from './views/OrderTakingDetail.vue'  //接单详情

import TeamSetting from './components/TeamSetting.vue'

import Department from './components/Department.vue'
import personalForm from './components/teamMessage/personalForm'  // 个人
import companyForm from './components/teamMessage/companyForm'   // 企业
import Setting from './components/Setting.vue'  //新增分类
import Userlist from './components/Userlist.vue'  //全部用户
import Aboutbook from './components/aboutbook.vue'  //本站信息
import Adduser from './components/Adduser.vue'  //添加用户
import Abouts from './components/abouts'  //关于本站
import Case from './components/case.vue'  //添加项目
import CaseAll from './components/caseAll.vue'  //全部项目
import userimg from './components/userimg.vue'  //个人中心
import commonts from './components/commonts.vue'  //评论

import companyInfo from './components/company/companyInfo.vue'  //草稿箱 容器
   //某分类下的文章
import Company from './components/Company.vue' //全部标签页
import Casealllist from './components/casealls/casealllist.vue'  //全部项目
import Casetxt from './components/casealls/casetxt.vue'   //修改项目

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
      children: [
        { 
          path: '/commonts',
          name: 'commonts',
          component: commonts,
          meta: {
            requiresAuth: 2
          }
        },
        { //成员管理
          path: '/userlist',
          name: 'Userlist',
          component: Userlist,
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
        { //新增分类
          path: '/department',
          name: 'Department',
          component: Department,
          meta: {
            requiresAuth: 2
          }
        },
        { //草稿箱
          path: '/setting',
          component: Setting,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/company',  //全部标签页
          component: Company,
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
          path: 'userlist',  //用户列表
          name: 'Userlist',
          component: Userlist,
          meta: {
            requiresAuth: 1
          }
        },
        {
          path: 'aboutbook',  //本站信息
          name: 'Aboutbook',
          component: Aboutbook,
          meta: {
            requiresAuth: 1
          }
        },
        {
          path: 'abouts',   //关于本站
          name: 'Abouts',
          component: Abouts,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: 'case',   //添加项目
          name: 'Case',
          component: Case,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: 'caseall',  //所有项目
          component: CaseAll,
          meta: {
            requiresAuth: 2
          },
          children: [
            {
              path: '', //所有项目
              name: 'Casealllist',
              component: Casealllist,
              meta: {
                requiresAuth: 2
              }
            },
            {
              path: 'casetxt/:userid',  //修改项目
              name: 'casetxt',
              component: Casetxt,
              meta: {
                requiresAuth: 2
              }
            }
          ]
        },
        {
          path: 'userimg',
          name: 'userimg',
          component: userimg,
          meta: {
            requiresAuth: 2
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
      path: '/load',
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
