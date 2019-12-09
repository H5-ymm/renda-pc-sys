<template>
  <el-row :gutter="20" class="team-info-row">
    <el-col :span="6" v-for="(item,key) in userLabel" :key="key">
      <el-card class="box-card" :class="key">
        <p>{{item}}</p>
        <p>{{userLabel1[key]}}</p>
        <img src="../../assets/img/cardBg1.png" alt class="cardBg" v-if="key=='name'" />
        <img src="../../assets/img/cardBg2.png" alt class="cardBg" v-if="key=='number'" />
        <img src="../../assets/img/cardBg3.png" alt class="cardBg" v-if="key=='total'&&!userType" />
        <img
          src="../../assets/img/cardBg4.png"
          alt
          class="cardBg"
          v-if="key=='jobStatus'&&!userType"
        />
        <img src="../../assets/img/cardBg5.png" alt class="cardBg" v-if="key=='total'&&userType" />
        <img
          src="../../assets/img/cardBg6.png"
          alt
          class="cardBg"
          v-if="key=='jobStatus'&&userType"
        />
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { getTeamInfo } from '../../api/team'
export default {
  props: ['userType', 'userInfo'],
  data () {
    return {
      userLabel1: {
        name: '天天向上',
        number: '444',
        total: '22',
        jobStatus: '22'
      }
    }
  },
  computed: {
    userLabel () {
      let obj = {}
      if (this.userType) {
        obj = {
          name: '团队名称',
          number: '团队成员',
          total: '简历总数',
          jobStatus: '已入职'
        }
      }
      else {
        obj = {
          name: '团队名称',
          number: '招聘部',
          total: '简历总数',
          jobStatus: '已入职'
        }
      }
      return obj
    }
  },
  created () {
    let uid = localStorage.getItem('uid')
    getTeamInfo({ uid }).then(res => {
      if (res && res.data) {
        console.log(res)
      }
    })
  },
}
</script>
<style lang="scss">
  .cardBg {
    position: absolute;
    bottom: 0;
    right: 0;
    max-width: 126px;
  }
  .box-card {
    box-shadow:2px 5px 17px 0px rgba(51,51,51,0.2);
    border-radius:5px;
    height: 126px;
    padding-left: 20px;
    padding-top: 10px;
    position: relative;
    &.el-card{
      color: #fff;
    }
    &.name {
      background:linear-gradient(150deg,#7F80FE,#729EFE);
    }
    &.number {
      background:linear-gradient(117deg,rgba(255,110,115,1),rgba(255,116,145,1));
    }
    &.total {
      background:linear-gradient(117deg,rgba(255,146,100,1),rgba(255,176,100,1));
    }
    &.jobStatus {
      background:linear-gradient(117deg,rgba(166,91,251,1),rgba(189,94,255,1));
    }
  }
</style>