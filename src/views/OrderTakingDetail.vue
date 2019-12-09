<template>
  <el-container class="orderTaking">
    <el-header class="header x-flex-around home" height="50px" id="header">
      <headerView></headerView>
    </el-header>
    <el-main class="orderTaking-main-content">
      <div class="orderTaking-detail"></div>
      <div class="orderTaking-main-list orderTaking-detail-content">
        <div class="bg-purple orderTaking-jobDeail">
          <div class="orderTaking-jobDeail-left">
            <p class="job-name-top bg-purple">
              {{orderTakingDetail.name}}
              <span class="job-status">招聘中</span>
            </p>
            <p>职位类别</p>
            <p>发布时间：2019-12-01 15:32</p>
          </div>
          <div class="orderTaking-jobDeail-right">
            <el-button
              type="primary"
              size="medium"
              class="orderTarking-btn"
              @click="centerDialogVisible=true"
              plain
            >申请接单</el-button>
            <div class="x-flex-around">
              <p class="x-flex-around">
                <img src="../assets/img/collect.png" alt />
                <el-link
                  :underline="false"
                  class="orderTarking-link"
                  @click="centerDialogVisible=true"
                >收藏</el-link>
              </p>
              <p class="x-flex-around">
                <img src="../assets/img/tip.png" alt />
                <el-link
                  :underline="false"
                  class="orderTarking-link"
                  @click="tipDialogVisible = true"
                >举报</el-link>
              </p>
            </div>
          </div>
        </div>
        <div class="orderTaking-main-row">
          <div class="orderTaking-main-col1">
            <div class="grid-content">
              <section class="orderTaking-card">
                <Panel title="接单详情">
                  <div slot="content" class="panel-content bg-purple-align-start">
                    <div class="orderTaking-info">
                      <p>
                        <span>需求人数：</span>
                        <span>{{orderTakingDetail.required_number}}</span>
                      </p>
                      <p>
                        <span>年龄：</span>
                        <span>{{orderTakingDetail.min_age}}-{{orderTakingDetail.max_age}}周岁</span>
                      </p>
                      <p>
                        <span>性别：</span>
                        <span>{{orderTakingDetail.sex==1?'男':'女'}}</span>
                      </p>
                      <p>
                        <span>工作地址：</span>
                        <span>{{orderTakingDetail.address}}</span>
                      </p>
                    </div>
                    <div class="orderTaking-info">
                      <p>
                        <span>月薪：</span>
                        <span>{{orderTakingDetail.money}}</span>
                      </p>
                      <p>
                        <span>缴纳五险：</span>
                        <span>{{orderTakingDetail.is_five_risks==1?'是':'否'}}</span>
                      </p>
                      <p>
                        <span>缴纳公积金：</span>
                        <span>{{orderTakingDetail.is_fund==1?'是':'否'}}</span>
                      </p>
                      <p>
                        <span>要求学历：</span>
                        <span>{{orderTakingDetail.education}}</span>
                      </p>
                    </div>
                  </div>
                </Panel>
              </section>
              <section class="orderTaking-card">
                <Panel title="职位描述">
                  <div slot="content" class="panel-content" v-html="orderTakingDetail.job_content"></div>
                </Panel>
              </section>
              <section class="orderTaking-card">
                <Panel title="返利详情">
                  <div slot="content" class="panel-content bg-purple-align-start">
                    <div class="orderTaking-info">
                      <p>
                        <span>返利方式：</span>
                        <span>{{getRewardType(orderTakingDetail.reward_type)}}</span>
                      </p>
                      <p v-if="orderTakingDetail.reward_type==1">
                        <span>结算时间：</span>
                        <span>次月第{{orderTakingDetail.settlement_time}}天</span>
                      </p>
                      <p v-if="orderTakingDetail.reward_type==2">
                        <span>持续时长：</span>
                        <span>{{orderTakingDetail.reward_money}}/人/{{getmoneyType(orderTakingDetail.money_type)}}</span>
                      </p>
                    </div>
                    <div class="orderTaking-info">
                      <p>
                        <span>返利金额：</span>
                        <span>{{orderTakingDetail.reward_money}}</span>
                      </p>
                      <p v-if="orderTakingDetail.reward_money_type==1">
                        <span>返利时长：</span>
                        <span>fff100人</span>
                      </p>
                      <p v-else>
                        <span>需入职满：</span>
                        <span>3天</span>
                      </p>
                    </div>
                  </div>
                </Panel>
              </section>
              <section class="orderTaking-card">
                <Panel title="推荐接单">
                  <section
                    slot="content"
                    class="orderTaking-main-card"
                    v-for="(item,index) in list"
                    :key="index"
                    :class="{'orderTaking-main-sectionActive':index==0}"
                  >
                    <div class="orderTaking-main-section">
                      <div class="orderTaking-main-row">
                        <ul class="orderTaking-main-item">
                          <li class="job-name">
                            <span class="company-name">{{item.name}}</span>
                          </li>
                          <li class="require-number">
                            <span>需求人数：{{item.required_number}}人</span>
                          </li>
                          <li>返利方式：{{getRewardType(item.reward_type)}}</li>
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
                        <el-button type="primary">查看详情</el-button>
                      </div>
                    </div>
                  </section>
                </Panel>
              </section>
            </div>
          </div>
          <div class="orderTaking-main-col2">
            <div class="company-detail">
              <img :src="logoUrl" alt class="company-logo" />
              <p class="company-name">{{companyInfo.com_name}}</p>
              <div class="bg-purple">
                <p class="x-flex-around">
                  <img src="../assets/img/hy.png" alt />
                  <span :underline="false" class="orderTarking-link">{{companyInfo.com_sort}}</span>
                </p>
                <p class="x-flex-around">
                  <img src="../assets/img/my.png" alt />
                  <span :underline="false" class="orderTarking-link">{{companyInfo.com_scale}}</span>
                </p>
              </div>
              <div class="bg-purple">
                <p class="x-flex-around">
                  <img src="../assets/img/address.png" alt />
                  <span :underline="false" class="orderTarking-link">{{companyInfo.address}}</span>
                </p>
              </div>
              <div class="company-profile">
                <span>公司简介</span>
                <p
                  class="company-profile-content"
                  ref="content"
                  v-html="companyInfo.content+'哈哈哈哈哈哈哈哈哈哈哈剋坎坎坷坷坎坎坷坷'"
                ></p>
                <p class="bg-purple-center" @click="showMore()">
                  <img src="../assets/img/moreDown.png" alt />
                  <span class="profile-more">查看更多</span>
                </p>
              </div>
            </div>
            <div class="bg-purple-light">
              <p class="job-title">该公司的接单职位</p>
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
    <Dialog :centerDialogVisible="centerDialogVisible"></Dialog>
    <TipDialog :tipDialogVisible="tipDialogVisible"></TipDialog>
  </el-container>
</template>
<script>
// @ is an alias to /src
import homeAside from '@/components/Aside' //侧边栏
import ModalCity from '@/components/ModalCity'
import LoginBox from '@/components/LoginBox'
import Panel from '@/components/Panel'
import Dialog from '@/components/Dialog'
import TipDialog from '@/components/TipDialog'
import AsideBox from '@/components/AsideBox'
import HeaderView from '@/components/HeaderView'
import FooterView from '@/components/FooterView'
import { getOrderDetail, getList } from '../api/orderTarking'
import { getCompanyDetail, getCompanyInfo } from '../api/company'
import { moneyTypeList } from '../base/base'
export default {
  name: 'home',
  components: {
    homeAside,
    ModalCity,
    LoginBox,
    Panel,
    Dialog,
    TipDialog,
    FooterView,
    HeaderView,
    AsideBox
  },
  data () {
    return {
      tipDialogVisible: false,
      dialogVisible: false,
      centerDialogVisible: false,
      total: 0,
      activeIndex: 0,
      keywords: '',
      menus: [
        {
          title: '首页',
          url: ''
        },
        {
          title: '接单',
          url: ''
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
      areaList: [],
      moneyTypeList,
      money_type: '',
      browsingList: [],
      orderTakingDetail: {},
      companyInfo: {},
      id: '',
      uid: '',
      isShow: false,
      textShow: true
    }
  },
  computed: {
    logoUrl () {
      return `http://tiantianxsg.com:39888/` + this.companyInfo.logo_url
    }
  },
  created () {
    this.getData(this.params)
    this.id = this.$route.query.id
    this.uid = this.$route.query.uid
    this.getOrderTakingData()
    this.getCompanyData(this.uid)
  },
  mounted () {
    window.addEventListener('scroll', this.windowScroll)
    console.log(this.$refs.content.clientHeight)
    if (this.$refs.content.clientHeight > 30) {
      this.textShow = true
      this.$refs.content.style.display = '-webkit-box'
    }
    else {
      this.textShow = false
    }
  },
  methods: {
    showMore () {
      this.$refs.content.style.display = ''
    },
    windowScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop - document.documentElement.clientHeight - 200 >= 0) {
        this.isShow = true
      }
      else {
        this.isShow = false
      }
    },
    getOrderTakingData () {
      let params = {
        id: this.id
      }
      getOrderDetail(params).then(res => {
        this.orderTakingDetail = res.data
      })
    },
    getCompanyData (uid) {
      getCompanyDetail({ uid }).then(res => {
        console.log(res)
        this.companyInfo = res.data
      })
    },
    switchNav (item, index) {
      this.activeIndex = index
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
        text = '月返'
      }
      else if (type == 2) {
        text = '日返'
      }
      else if (type == 3) {
        text = '周返'
      }
      else {
        text = '一次性返利'
      }
      return text
    }
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
.bg-purple-center {
  display: flex;
  align-items:center;
  justify-content: center;
}
.bg-purple-align-start {
  display: flex;
  align-items:flex-start;
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
.orderTaking-main-content .orderTaking-detail {
  height: 200px;
  width: 100%;
  background: url('../assets/img/detailsBg.jpg') no-repeat top center;
  background-size: contain；
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
.orderTaking-detail-content {
   margin: -140px auto 40px;
   position: relative;
   z-index: 9;
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
.orderTaking-jobDeail {
   background: #fff;
   margin: 20px 0;
   padding:0 20px;
   height: 148px;
   line-height: 36px;
}
.orderTaking-jobDeail .job-name-top {
  font-size:28px;
  font-weight:400;
}
.orderTaking-main-col1 .orderTaking-card {
  margin-top: 20px;
  background: #fff;
}
.orderTaking-jobDeail .job-name-top .job-status{
  background:#61BC74;
  color: #fff;
  font-size: 12px;
  border-radius:10px;
  width:62px;
  height:22px;
  display: inline-block;
  text-align: center;
  line-height: 22px;
  margin-left: 15px;
}
.panel-content {
  padding: 20px 28px 0;
}
.orderTaking-info {
  color: #6A6A6A;
  margin-right: 20px;
  width: 50%;
}
.orderTaking-info span{
  font-size:16px;
  color: #333;
  display: inline-block;
  margin-right: 20px;
}
.orderTaking-info span:nth-of-type(1){
  text-align: right;
  font-size:14px;
  width: 100px;
  margin-left: -30px;
}
.orderTaking-jobDeail .orderTarking-btn {
  width: 298px;
  padding: 6px 20px;
}
.orderTarking-link {
  margin-left: 5px;
}
.orderTaking-main-row .orderTaking-main-col1{
  width: 906px;
  background: #fff;
  margin-right: 14px;
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
.company-detail {
  /* width:100%; */
  background:#fff;
  min-height:321px;
  margin: 0 auto 20px;
  text-align: center;
  font-size: 14px;
  color: #6A6A6A;
  padding: 0 28px 0;
}
.company-detail .company-logo {
  width:82px;
  height:82px;
  margin: 20px auto 10px;
}
.company-detail .company-name {
  font-size:16px;
  text-align: center;
  font-weight:bold;
}
.company-detail .company-profile {
  text-align: left;
  line-height: 23px;
  margin-top: 10px;
  padding-bottom: 10px;
  /* width: 302px; */
}
.company-detail .company-profile-content {
  overflow : hidden;
  text-overflow: ellipsis;
  /* display: -webkit-box; */
  -webkit-line-clamp: 2;
  /* font-size: 14px; */
  -webkit-box-orient: vertical;
}
.company-detail .company-profile>span {
  color: #999999;
  font-size: 14px;
}
.company-detail .profile-more {
  margin: 0 5px;
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

.pagination {
  text-align: center;
  padding: 20px;
}
/* .el-tooltip__popper.is-dark {
  color: #333;
  background: #fff;
} */
</style>
