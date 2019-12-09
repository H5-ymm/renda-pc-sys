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
          <!-- <el-submenu index="4" class="acts">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>评论管理</span>
            </template>
            <el-menu-item index="/addcls">文章评论</el-menu-item>
          </el-submenu>
          <el-submenu index="5" class="acts">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>项目管理</span>
            </template>
            <el-menu-item index="/caseall">全部项目</el-menu-item>
            <el-menu-item index="/case">新增项目</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </template>
            <el-submenu index="6-1" class="acts">
              <template slot="title">个人中心</template>
              <el-menu-item index="/userimg">个人资料</el-menu-item>
            </el-submenu>
            <el-submenu index="6-2" class="acts">
              <template slot="title">管理控制</template>
              <el-menu-item index="/userlist">全部管理员</el-menu-item>
              <el-menu-item index="/aboutbook">本站信息</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="7" class="acts">
            <template slot="title">
              <i class="el-icon-info"></i>
              <span>关于本站</span>
            </template>
            <el-menu-item index="/abouts">关于本站</el-menu-item>
          </el-submenu>-->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  props: {

  },
  data () {
    return {
      menus: [
        {
          title: '团队论坛',
          icon: 'el-icon-collection',
          submenu: [
            {
              title: '论坛列表',
              url: '/commonts'
            }
          ]
        },
        {
          title: '团队管理',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '成员管理',
              url: '/userlist'
            }
          ]
        },
        {
          title: '团队设置',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '团队信息',
              url: '/teamSetting'
            },
            {
              title: '部门管理',
              url: '/department'
            }
          ]
        },
        {
          title: '网络设置',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '基本设置',
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
              title: '企业账号',
              url: '/company'
            }
          ]
        }
      ],
      title: ''
    }
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
      console.log(key, keyPath)
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
.names-A{
  width: 100%;
  height: 35px;
  text-align: center;
  padding-right: 10px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 35px;
 
}
.names-B{
  width: 100%;
  height: 25px;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
  font-size: 12px;
  cursor: pointer;
  line-height: 25px;
}
</style>
