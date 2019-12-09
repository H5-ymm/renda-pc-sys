<template>
  <el-container class="orderTaking" id="header">
    <el-header class="header x-flex-around home" height="50px" >
      <headerView></headerView>
    </el-header>
    <el-main class="orderTaking-main-content">
      <div class="orderTaking-search">
        <div class="home-search orderTaking-main-box">
          <el-input placeholder="请输入职位名称或公司名，例如：普工" v-model="params.kew_name">
            <el-select v-model="params.type" slot="prepend" style="width:120px" placeholder="请选择">
              <el-option label="职位搜索" value="1"></el-option>
              <el-option label="企业搜索" value="2"></el-option>
            </el-select>
          </el-input>
          <el-button type="primary" class="search-btn">搜索</el-button>
        </div>
        <div class="orderTaking-search-list">
          <div class="orderTaking-search-query">
            <span class="orderTaking-search-label">地点</span>
            <ul class="orderTaking-search-value">
              <li
                v-for="(item, index) in cityList"
                :key="index"
                :class="{'active': index==0}"
              >{{item.name}}</li>
            </ul>
            <el-button type="text" class="orderTaking-more" @click="dialogVisible=true">更多</el-button>
          </div>
          <div class="orderTaking-search-query">
            <span class="orderTaking-search-label">不限</span>
            <ul class="orderTaking-search-value">
              <li
                v-for="(item, index) in areaList"
                :key="index"
                :class="{'active': index==0}"
              >{{item.name}}</li>
            </ul>
          </div>
          <div class="orderTaking-search-select">
            <div class="orderTaking-search-value">
              <el-select v-model="params.money_type" placeholder="薪资方式">
                <el-option
                  v-for="(item,index) in moneyTypeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="params.reward_type" placeholder="返利方式">
                <el-option
                  v-for="(item,index) in rewardList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="params.require_number" placeholder="需求人数">
                <el-option
                  v-for="(item,index) in requirePersonList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="params.is_five_risks" placeholder="缴纳五金">
                <el-option
                  v-for="(item,index) in paymentTaxType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
               <el-select v-model="params.is_fund" placeholder="缴纳公积金">
                <el-option
                  v-for="(item,index) in paymentTaxType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <span class="clear">清空筛选条件</span>
          </div>
        </div>
      </div>
      <div class="home-main-box orderTaking-main-list">
        <div class="orderTaking-main-row">
          <div class="orderTaking-main-col1">
            <div class="grid-content orderTaking-grid-content">
              <section
                v-for="(item,index) in list"
                :key="index"
                :class="{'orderTaking-main-sectionActive':index==0}"
              >
                <div class="orderTaking-main-section">
                  <div class="orderTaking-main-row">
                    <ul class="orderTaking-main-item">
                      <li
                        class="job-name"
                        @click="$router.push({path:'orderTakingDetail',query:{id:item.id,uid:item.uid}})"
                      >
                        <span class="company-name">{{item.name}}</span>
                      </li>
                      <li class="require-number">
                        <span>需求人数：{{item.required_number}}人</span>
                      </li>
                      <li>返利方式：长期返利</li>
                    </ul>
                    <ul class="orderTaking-main-item">
                      <li>{{getmoneyType(item.money_type)}}薪: {{item.money}}/人/{{getmoneyType(item.money_type)}}</li>
                      <li>需求人数：20人</li>
                      <li
                        v-if="item.reward_money_type==3"
                      >持续时间：{{item.reward_money_type==1?'长期返利':'持续返利'}}</li>
                      <li
                        v-if="item.reward_money_type!=3&&item.reward_continuous"
                      >持续时间：{{item.reward_continuous}}{{getmoneyType(item.money_type)}}</li>
                    </ul>
                  </div>
                  <div class="orderTaking-main-col">
                    <ul class="orderTaking-main-item">
                      <li class="company-name bg-purple-start">
                        <span>{{item.com_name}}</span>
                        <img
                          src="../assets/img/noIcon.png"
                          class="orderTaking-icon"
                          alt
                          v-if="item.status==2"
                        />
                        <img src="../assets/img/noIcon.png" alt v-else />
                        <span class="ctime">{{ $moment(item.ctime).format('HH:mm')}}发布</span>
                      </li>
                      <li>
                        <el-tag size="small" v-if="item.is_fund">五险</el-tag>
                        <el-tag size="small" v-if="item.is_fund==1">公积金</el-tag>
                        <el-tag size="small" v-if="item.is_fund==2">试用期过后</el-tag>
                      </li>
                      <li>地点：{{item.address}}</li>
                    </ul>
                  </div>
                  <div>
                    <el-button type="primary">立即接单</el-button>
                  </div>
                </div>
              </section>
            </div>
            <el-pagination
              background
              class="pagination"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="total"
            ></el-pagination>
          </div>
          <div class="orderTaking-main-col2">
            <div class="bg-purple-light">
              <p class="job-title">看过的接单职位</p>
              <div>
                <ul
                  class="orderTaking-main-item orderTaking-main-history"
                  v-for="(item,index) in browsingList"
                  :key="index"
                >
                  <li class="bg-purple">
                    <span class="company-name">{{item.name}}</span>
                    <span class="require-number">{{item.required_number}}人</span>
                  </li>
                  <li class="bg-purple">
                    <span class="require-number">{{getmoneyType(item.money_type)}}薪:</span>
                    <span>{{item.money}}/人/{{getmoneyType(item.money_type)}}</span>
                  </li>
                  <li class="bg-purple">{{item.com_name}}</li>
                </ul>
              </div>
            </div>
            <div class="orderTaking-login">
              <LoginBox></LoginBox>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <FooterView></FooterView>
    <AsideBox :isShow="isShow"></AsideBox>
    <ModalCity :dialogVisible="dialogVisible" @getCityCode="getCityCode" @handleClose="handleClose"></ModalCity>
  </el-container>
</template>
<script>
// @ is an alias to /src
import homeAside from '@/components/Aside' //侧边栏
import ModalCity from '@/components/ModalCity'
import LoginBox from '@/components/LoginBox'
import HeaderView  from '@/components/HeaderView'
import FooterView  from '@/components/FooterView'
import AsideBox  from '@/components/AsideBox'

import { getList } from '../api/orderTarking'
import { getProvincesList, getCitysList, getAreasList } from '../api/login'
import { cityList, moneyTypeList,rewardList,requirePersonList, paymentTaxType} from '../base/base'
export default {
  name: 'OrderTaking',
  components: {
    homeAside,
    ModalCity,
    LoginBox,
    AsideBox,
    HeaderView,
    FooterView
  },
  data () {
    return {
      isShow:false,
      dialogVisible: false,
      total: 0,
      activeIndex: 1,
      keywords: '',
      rewardList,
      requirePersonList,
      paymentTaxType,
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
      list: [],
      cityList,
      areaList: [],
      moneyTypeList,
      code: '310100',
      money_type: '',
      browsingList: []
    }
  },
  computed: {

  },
  mounted(){
    window.addEventListener('scroll', this.windowScroll)
  },
  methods: {
    windowScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop 
      console.log(scrollTop - document.documentElement.clientHeight)
      if (scrollTop - document.documentElement.clientHeight + 100 >=0) {
        this.isShow = true
      }
      else {
        this.isShow = false
      }
    },
    switchNav (item, index) {
      this.activeIndex = index
      this.$router.push(item.url)
    },
    handleClose () {
      this.dialogVisible = false
    },
    getCityCode (value) {
      this.params.three_cityid = value[0]
      this.dialogVisible = false
    },
    getData (params) {
      getList(params).then(res => {
        console.log(res.data.count)
        this.list = res.data.data.data
        console.log(this.list)
        this.browsingList = res.data.data.data
        this.total = res.data.count
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
    },
    getRegion (value) {
      getProvincesList().then(res => {

      })
    },
    getAreaList (code) {
      getAreasList({ code }).then(res => {
        this.areaList = res.data
      })
    },
    currentChange (page) {
      this.params.page = page
      this.getData(this.params)
    }
  },
  created () {
    this.getData(this.params)
    this.getAreaList(this.code)
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
.home{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 0 50px;
}
.orderTaking {
  background: #EEEEEE;
}
.orderTaking-header {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.home .header-left{
  display: inline-block;
}
.home .bg-purple .welcome {
  font-size:14px;
  margin-left:8px;
}
.bg-purple {
  display: flex;
  align-items:center;
  justify-content: space-between;
}
.bg-purple-start {
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
.orderTaking-main-content{
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding:0;
}
.orderTaking-main-content .orderTaking-grid-content {
  background: #fff;
  height: 576px;
}
.orderTaking-main-box {
  margin: 0 auto;
  width: 56%;
}
.orderTaking-search-list {
  margin: 20px auto;
  width: 1200px;
}
.orderTaking-search-list .orderTaking-search-query {
  display:flex;
  justify-content: flex-start;
  align-items: center;
  font-size:14px;
  margin-bottom: 10px;
  border-bottom : 1px solid #EEEEEE;
  padding-bottom:10px;
}
.orderTaking-search-query .orderTaking-search-label {
  display: inline-block;
  width: 50px;
  color:#333333;
}
.orderTaking-main-content .orderTaking-search-select .el-input {
  box-shadow: none;
  margin-top: -10px;
}
.orderTaking-main-content .orderTaking-search-select .el-input__inner {
  border: none;
  color: #FE2A00;
  padding: 6px 0;
}
.orderTaking-search-select .el-input__inner::-webkit-input-placeholder {
  color: #333;
}
.orderTaking-more {
  margin-left: 20px;
}
.orderTaking-search-query .orderTaking-search-value {
  overflow: hidden;
  width: 92%;
  height:20px;
}
.orderTaking-search-query .orderTaking-search-value li {
  padding: 0 8px;
  display: inline-block;
  color: #6A6A6A;
}
.orderTaking-search-query .orderTaking-search-value .active {
  background:rgba(220,238,254,1);
  border-radius:5px;
  color: #1890FF;
}
.orderTaking-search-select {
  display: flex;
  justify-content: space-between;
  height: 20px;
}
.orderTaking-search-select .clear {
  text-align: right;
  color: #6A6A6A;
  width: 200px;
  font-size: 12px;
  padding-top: 4px;
}
.orderTaking-search-select .el-select {
  width: 120px;
  margin-right: 30px;
}
.orderTaking-main-list {
  width: 1200px;
  margin: 30px auto;
}
.orderTaking-main-list .orderTaking-main-section {
  border-bottom: 1px solid #EEEEEE;
  height: 112px;
  margin: 0 20px;
}
.orderTaking-main-list .orderTaking-main-sectionActive {
  background:#F6F9FE;
}
.orderTaking-main-item {
  margin-right: 10px;
}
.orderTaking-main-item .el-tag {
  margin-right: 4px;
}
.orderTaking-main-item li {
  font-size:12px;
  color: #6A6A6A;
  height: 30px;
  flex: 1;
  text-align: left;
}
.orderTaking-main-item .bg-purple-start .orderTaking-icon {
  width: 33px;
  height: 11px;
  margin: 0 5px;
}
.orderTaking-main-item .job-name {
  font-size:16px;
  color: #1890FF;
} 
.orderTaking-main-item .company-name {
  font-size:14px;
  color: #1890FF;
}
.orderTaking-main-item .company-name .ctime {
  font-size: 12px;
  color: #6A6A6A;
}
.orderTaking-main-item  .require-number {
  color: #FE2A00;
}
.orderTaking-main-list .orderTaking-main-row {
  display: flex;
  justify-content: space-between;
  align-items:flex-start;
  line-height: 30px;
}
.orderTaking-main-row .orderTaking-main-col1{
  width: 906px;
  background: #fff;
  margin-right: 14px;
  /* padding: 0 20px; */
  border: 1px solid #F6F9FE;
}
.orderTaking-main-col {
  display: flex;
  justify-content: flex-start;
  width: 270px;
}
.orderTaking-main-row .orderTaking-main-col2{
  width: 284px;
}
.orderTaking-main-col2 .grid-content{
  border-radius: 0;
}
.orderTaking-main-row .bg-purple-light {
  background: #fff;
}
.orderTaking-login {
  height: 375px;
  margin-top: 20px;
}
.orderTaking-main-history {
  padding:5px 20px;
  border-bottom: 1px solid #eee;
}
.orderTaking-main-col2 .job-title {
  border-bottom: 1px solid #eee;
  font-size: 18px;
  text-align: center;
  color: #1890FF;
  padding: 10px 0;
}
.orderTaking-main-content .home-search {
  display:flex;
}
.orderTaking-main-content .orderTaking-search {
  width:100%;
  background:#fff;
  height:167px;
  padding: 30px 0;
  box-shadow:0px 1px 13px 0px rgba(4,4,4,0.15);
}
.orderTaking-main-content .el-input__prefix {
  padding:5px 10px;
  left:10px;
  top:5px;
  color:#6A6A6A;
}
.orderTaking-main-content .el-input {
  box-shadow:0px 1px 6px 0px rgba(88,88,90,0.1);
}
.orderTaking-main-content .el-input__inner {
  padding:14px 10px;
  border-radius: 0;
  display:inline-block;
}
.orderTaking-main-content .el-input--prefix .el-input__inner {
  padding: 20px 110px;
}
.orderTaking-main-content  .search-btn {
  border-radius:0px 5px 5px 0px;
  padding: 0 40px;
  height:39px;
}
.orderTaking-main-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background: #fff;
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
.footer {
  background: #fff;
}
.home-main-section-footer {
   width: 1200px;
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
.pagination {
  text-align: center;
  padding: 20px;
}
/* .el-tooltip__popper.is-dark {
  color: #333;
  background: #fff;
} */
</style>
