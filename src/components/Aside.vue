<template>
  <div class="hello">
    <!-- 侧边导航栏，需要给 具体 导航的 父级 加 class "acts" 则可以修改高亮状态 -->
    <!-- 关于 三级路由  不匹配侧边栏的问题，需要 对 返回的路由对象 进行重新改写,见 computed=> routerli -->
    <el-row class="tac">
      <el-col :span="24">
        <div class="names">
          仁事达
          <!-- <div class="names-A">{{names}}</div>
          <div class="names-B" @click="escUser">退出</div>-->
        </div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#000"
          active-text-color="#1890FF"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          @select="selectMenus"
          router
          :default-active="routerli"
        >
          <el-submenu :index="item.title" class="acts" v-for="(item,index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-collection"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              :index="val.title"
              :class="{'is-active':title==val.title}"
              v-for="(val,ind) in item.submenu"
              :key="ind"
              :route="val.url"
            >{{val.title}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getRole } from '../api/user'
export default {
  name: 'Aside',
  props: {

  },
  data () {
    return {
      menus: [
        {
          title: '团队论坛',
          icon: 'el-icon-notebook-1',
          submenu: [
            {
              title: '论坛列表',
              url: '/teamForum'
            }
          ]
        },
        // {
        //   title: '团队管理',
        //   icon: 'el-icon-user',
        //   submenu: [
        //     {
        //       title: '成员管理',
        //       url: '/userlist'
        //     }
        //   ]
        // },
        // {
        //   title: '团队设置',
        //   icon: 'el-icon-setting',
        //   submenu: [
        //     {
        //       title: '团队信息',
        //       url: '/teamSetting'
        //     },
        //     {
        //       title: '部门管理',
        //       url: '/department'
        //     }
        //   ]
        // },
        {
          title: '网络设置',
          icon: 'el-icon-collection-tag',
          submenu: [{
            title: '基本设置',
            url: '/baseSetting'
          },
          {
            title: '其他设置',
            url: '/setting'
          }
          ]
        },
        {
          title: '管理员设置',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '管理员列表',
              url: '/manager'
            }
          ]
        },
        {
          title: '账号管理',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '企业账户',
              url: '/company'
            },
            {
              title: '团队账户',
              url: '/teamList'
            }
          ]
        },
        {
          title: '发单管理',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '发单列表',
              url: '/Userlist'
            }
          ]
        }
      ],
      title: '',
      userType: 1,
      uid: localStorage.getItem('uid')
    }
  },
  created () {
    getRole({ uid: this.uid }).then(res => {
      console.log(res)
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      //console.log(key, keyPath);
    },
    escUser () {
      window.localStorage.clear()
      window.sessionStorage.clear()
      this.$router.push('/load')
    },
    selectMenus (key, keyPath) {
      this.title = key
      let arr = [key]
      sessionStorage.setItem('menus', JSON.stringify(arr))
    }
  },
  computed: {
    routerli () {
      // 对应路由
      let pathStr = this.$route.path.split('/')
      console.log(pathStr)
      return '/' + pathStr[1]

    },
    names () {
      return this.$store.state.user.users
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hello {
  height: 100%;
  background: #000;
}
.el-menu-vertical-demo{
  border: 0px solid #ffffff;
  height: 100%;
}
.el-submenu .el-menu-item {
  min-width: 170px;
}
.el-menu-item.is-active{
  background:#1890FF!important;
  border: none!important;
  box-sizing: border-box!important;
  color: #fff!important;
}
.el-menu-item {
  background-color: rgba(0, 0, 0, 0.1) !important;
  padding-left: 50px!important;
}
.el-menu-item.is-active {
  background:#1890FF!important;
  border-right: 4px solid #06ADFB;
  box-sizing: border-box;
  color: #fff;
  padding-left: 50px!important;
}
.names{
  width: 100%;
  height: 60px;
  text-align: center;
  color: #fff;
  background:#20222A;
  height:46px;
  line-height: 46px;
}
</style>
