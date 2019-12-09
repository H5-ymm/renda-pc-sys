<template>
  <el-container>
    <el-header class="header x-flex-around home" height="50px" id="header">
      <div class="orderTaking-header">
        <div class="bg-purple">
          <span class="header-left">人事达</span>
          <span class="home-purple-left">
            <i class="el-icon-location-outline"></i>
            <a class="welcome">全国站</a>
          </span>
          <ul class="nav">
            <li
              v-for="(item, index) in menus"
              class="nav-item"
              :key="index"
              @click="switchNav(item, index)"
              :class="{'active': activeIndex==index}"
            >
              {{item.title}}
              <span class="line" v-if="activeIndex==index"></span>
            </li>
          </ul>
        </div>
        <div class="bg-purple-light bg-purple">
          <!-- <span class="home-purple-left">
            <i class="el-icon-user-solid"></i>
            <a class="welcome">登录</a>
            <a class="divider">|</a>
            <a class="welcome">注册</a>
          </span> -->
          <a class="el-icon-phone-outline"> 021-51991869</a>
        </div>
      </div>
    </el-header>
    <el-main class="home-main-content">
      <div class="home-main-box">
        <div class="home-search">
          <el-input placeholder="请输入关键字" v-model="params.kew_name">
            <el-select v-model="params.type" slot="prepend" style="width:120px" placeholder="请选择">
              <el-option label="职位搜索" value="1"></el-option>
              <el-option label="企业搜索" value="2"></el-option>
            </el-select>
          </el-input>
          <el-button type="primary" class="search-btn">搜索</el-button>
        </div>
        <el-row class="home-img-box">
          <el-col :span="16">
            <div class="grid-content bg-purple-img"></div>
          </el-col>
          <el-col :span="8">
            <div class="bg-purple-right grid-content">
              <div class="bg-purple-img-right"></div>
              <div class="bg-purple-img-right bg-purple-img-right1"></div>
            </div>
          </el-col>
        </el-row>
        <section class="home-main-section">
          <p class="home-main-title">
            <img src="../assets/img/icon.png" />
            接单职位
          </p>
          <el-row :gutter="20" class="home-main-list">
            <el-col :span="8" v-for="(item, index) in list" :key="index">
              <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                  <p class="home-main-list-title" :class="{'home-list-title-active':index==0}">全职拉新</p>
                  <el-row
                    type="flex"
                    justify="space-between"
                    class="home-list-clearfix home-list-clearfix-active"
                  >
                    <el-col :span="14">
                      <div
                        class="bg-purple"
                      >{{getmoneyType(item.money_type)}}薪: {{item.money}}/人/{{getmoneyType(item.money_type)}}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="bg-purple-light">需求人数: {{item.required_number}}人</div>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="space-between" class="home-list-clearfix">
                    <el-col :span="14">
                      <div class="bg-purple">返利:</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="bg-purple-light">返利方式: {{getRewardType(item.reward_type)}}</div>
                    </el-col>
                  </el-row>
                </div>
                {{item.com_name}}
                <el-button type="primary" size="medium" plain class="handle-btn">接单</el-button>
              </el-card>
            </el-col>
          </el-row>
          <el-button class="home-main-more">查看更多</el-button>
          <div class="home-main-more-right">
            <el-link type="primary">查看更多</el-link>
            <img src="../assets/img/more.png" alt />
          </div>
        </section>
        <section class="home-main-section">
          <p class="home-main-title">
            <img src="../assets/img/icon.png" />资讯
          </p>
          <el-row>
            <el-col :span="12" v-for="(item, index) in informationList" :key="index">
              <div class="grid-information-card">
                <img :src="item.imgUrl" class="grid-information-img" />
                <div class="grid-information">
                  <p class="grid-information-title">{{item.title}}</p>
                  <p class="grid-information-content">{{item.content}}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </section>
      </div>
    </el-main>
    <el-footer height="320px">
      <section class="home-main-section home-main-section-footer">
        <el-row :gutter="20" class="footer-main" type="flex" justify="start">
          <el-col :span="4">
            <ul class="home-footer-box">
              <li class="home-footer-title">企业服务</li>
              <li>公司搜索</li>
              <li>职位搜索</li>
              <li>新闻咨讯</li>
            </ul>
          </el-col>
          <el-col :span="10">
            <ul class="home-footer-box">
              <li class="home-footer-title">联系方式</li>
              <li>仁达网络科技(上海)有限公司</li>
              <li>公司地址：上海市浦东新区金海路2588号1幢A区310室</li>
              <li>服务热线：021-51991869（9:00-18:00)</li>
              <li>违法和不良信息举报邮箱：</li>
            </ul>
          </el-col>
          <el-col :span="8" :offset="8">
            <ul class="home-footer-box home-footer-box1">
              <li class="home-footer-title">微信公众号</li>
              <li>
                <img src="../assets/img/qrcode.png" class="home-footer-img" />
              </li>
            </ul>
          </el-col>
        </el-row>
      </section>
    </el-footer>
    <ul class="fixed">
      <li>
        <a href="#header">
          <el-tooltip class="item" effect="dark" content="一键置顶" placement="left">
            <img src="../assets/img/top.png" alt />
          </el-tooltip>
        </a>
      </li>
      <li>
        <el-tooltip class="item" effect="dark" content="联系客服" placement="left">
          <img src="../assets/img/kefu.png" alt />
        </el-tooltip>
      </li>
      <li class="help">
        <el-tooltip class="item" effect="dark" content="帮助反馈" placement="left">
          <img src="../assets/img/help.png" alt />
        </el-tooltip>
      </li>
    </ul>
  </el-container>
</template>
<script>
// @ is an alias to /src
import homeAside from '@/components/Aside' //侧边栏
import { homeList } from '../api/home'
export default {
  name: 'home',
  data () {
    return {
      activeIndex: 0,
      keywords: '',
      menus: [
        {
          title: '首页',
          url: 'home'
        },
        {
          title: '接单',
          url: 'orderTaking'
        },
        {
          title: '拼团',
          url: ''
        },
        {
          title: '资讯',
          url: ''
        }
      ],
      params: {
        type: '',
        kew_name: '',
        limit: 20,
        page: 1
      },
      informationList: [{
        imgUrl: require('../assets/img/img1.png'),
        title: '当代职场人：7成人入职不满3年就跳槽',
        content: '近日，前程无忧最新发布的“2019年第四季度求职者跳槽意愿度调查”结果显示：2019年第四季度有明确跳槽意愿的受访者占35.2%，和上个季度比没有太大变化。进入2019年的尾声，大部分职场人本着“拿完年'
      },
      {
        imgUrl: require('../assets/img/img2.png'),
        title: '大多数90后离职和薪资有关，面试能说吗？',
        content: '你是不是也听到过这样的言论，比如“90后太难管了，说两句就要离职”、“现在的90后离职率比80后高多了”……所以，这些宁愿折损“名声”也要离职的90后到底都经历了什么？'
      }],
      list: []
    }
  },
  components: {
    homeAside
  },
  computed: {

  },
  methods: {
    switchNav (item, index) {
      this.activeIndex = index
      this.$router.push(item.url)
    },
    getList (params) {
      homeList(params).then(res => {
        console.log(res)
        this.list = res.data.data.data
        console.log(this.list)
      })
    },
    getmoneyType (type) {
      return type === 1 ? '日' : type === 2 ? '月' : '时'
    },
    getRewardType (type) {
      let text = ''
      if (type == 1) {
        text = '按月结算'
      }
      else if (type == 2) {
        text = '按日结算'
      }
      else if (type == 3) {
        text = '按周结算'
      }
      else {
        text = '一次性返利'
      }
      return text
    }
  },
  created () {
    this.getList(this.params)
    //验证Token
    //         let token=null
    //         if(window.localStorage.getItem('token')){
    //           token=window.localStorage.getItem('token')
    //         }else if(window.sessionStorage.getItem('token')){
    //           token=window.sessionStorage.getItem('token')
    //         }else{
    //           token=null
    //         }
    //      // console.log(token)

    // if(token){
    //      this.$http({
    //           url:'rulesToken',
    //           methos: 'POST',
    //           headers:{
    //             'Authorization':token
    //           }
    //         }).then(res=>{

    //           if(res.data.code==0){

    //               this.$store.commit('adduser',res.data.msg)
    //           }else{
    //              //console.log(res.data.msg)
    //           }
    //         }).catch(error=>{
    //           console.log('error')
    //         })
    // }

  }
}
</script>

<style>
.orderTaking-header {
  color: #fff;
}
.home{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 0 50px;
  background:#fff;
}
.home .header-left{
  display: inline-block;
}
.home .bg-purple .welcome {
  font-size:14px;
  margin-left:8px;
}
.home .bg-purple {
  display: flex;
  align-items:center;
  justify-content: flex-start;
}
.home-aside{
  height: 100vh;
  /* overflow: hidden; */
  overflow-y: scroll;
  overflow-x: hidden;
}
.nav {
  display: inline-block;
}
.nav .nav-item {
   position: relative;
   display: inline-block;
   padding: 15px 10px;
   font-weight:normal;
}
.nav .nav-item.active {
  color:#1890FF;
}
.home .home-purple-left {
  color: #fff;
  font-weight:normal;
}
.nav .line {
  width:30px;
  height:3px;
  background:#1890FF;
  position:absolute;
  left:10px;
  bottom: 0;
}
.divider {
  color:rgba(255,255,255,0.2);
  margin-left:8px;
}
.home-main-content{
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  background:rgba(248,248,248,1);
}
.home-main-box {
  width: 1200px;
  margin: 0 auto;
}
.home-main-content .home-search {
  display:flex;
}
.home-main-content .el-input__prefix {
  padding:5px 10px;
  left:10px;
  top:5px;
  color:#6A6A6A;
}
.home-main-content .el-input {
  box-shadow:0px 1px 6px 0px rgba(88,88,90,0.1);
}
.home-main-content .el-input__inner {
  padding:14px 10px;
  border-radius: 0;
  display:inline-block;
}
.home-main-content .el-input--prefix .el-input__inner {
  padding: 20px 110px;
}
.home-main-content  .search-btn {
  border-radius:0px 5px 5px 0px;
  padding: 0 40px;
}
.home-main-more {
  width:391px;
  height:38px;
  border:1px solid rgba(24,144,255,1);
  border-radius:5px;
  margin: 0 auto 10px;
  color: #1890FF;
  margin-left: 35%;
}
.home-main-more-right {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.home-main-more-right img {
  width: 10px;
  height: 10px;
}
.home-box{
  background: #ffffff;
  height: calc(100% - 20px);
  padding: 10px;
}
.home-img-box {
  height:290px;
}
.home-img-box .grid-content {
  height:290px;
  margin:22px 0;
  width:100%;
}
.home-img-box .bg-purple-img-right {
  height:144px;
  width:100%;
  background:  url('../assets/img/right.png') no-repeat left center;
  background-size: cover;
  margin-bottom:2px;
}
.home-img-box .bg-purple-img-right1 {
  background:  url('../assets/img/right1.png') no-repeat left center;
  background-size: cover;
}
.home-img-box .bg-purple-img {
  height:290px;
  width:100%;
  background:  url('../assets/img/img.jpg') no-repeat left center;
  background-size: cover;
}
.home-img-box .bg-purple-right {
  margin:22px 0 22px 2px;
}
.home-main-title {
  padding-bottom: 10px;
  font-size: 16px;
  /* margin-bottom: 20px; */
  border-bottom: 1px solid #EEEEEE;
}
.home-main-title img {
  max-width:23px;
  padding-right:5px;
}
.home-main-list {
  padding:20px 0;
  /* margin-bottom:20px; */
  font-size:16px;
}
.home-main-list  .home-main-list-title {
  padding-bottom:5px;
}
.home-main-list  .home-list-title-active {
  color:#FE2A00;
}
.home-main-list .el-card__header {
  padding:15px;
}
.home-main-list .el-card__body {
  padding:10px;
  font-size:14px;
}
.home-main-list .handle-btn {
  float: right; 
  padding: 3px 8px; 
}
.box-card {
  height:160px;
}
.home-list-clearfix {
  line-height:30px;
  font-size:14px;
}
.home-list-clearfix-active{
  color:#1890FF;
}
.grid-information-card {
  background: #fff;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  height:175px;
  font-size:16px;
  padding:0 12px;
}
.grid-information-card .grid-information-title {
  font-size:16px;
  line-height:30px;
}
.grid-information-card .grid-information-img {
  width:230px;
  height:145px;
}
.grid-information-card .grid-information {
  width:360px;
  height:100%;
  margin-top:30px;
  padding-left:15px;
}
.grid-information-card .grid-information-content {
  font-size:14px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  color:#6A6A6A;
}
.home-main-section-footer {
   width: 80%;
   margin:40px auto;
   font-size:16px;
}
.home-footer-box {
  color:#6A6A6A;
  line-height:36px;
}
.home-footer-box1 {
  text-align: right;
}
.home-footer-box li{
  font-size:14px;
}
.home-footer-box .home-footer-title {
  font-size:16px;
  font-weight:bold;
}
.home-footer-box1 .home-footer-title{
  margin-right:30px;
}
.home-footer-img {
  width:142px;
}
.fixed {
  position: fixed;
  right: 50px;
  bottom: 36%;
}
.fixed li {
  width:50px;
  height:50px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(238,238,238,1);
  box-shadow:0px 2px 10px 0px rgba(70,70,70,0.1);
  border-radius:5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fixed .help {
  background: #1890FF;
}
/* .el-tooltip__popper.is-dark {
  color: #333;
  background: #fff;
} */
</style>
