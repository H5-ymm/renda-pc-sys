<template>
  <div class="team-setting-view">
    <p class="title">{{type?'团队性质':'请选择团队性质'}}</p>
    <el-row class="team-setting-box" type="flex" justify="center" :gutter="20">
      <el-col :span="6" class="x-flex-center" v-for="(item,index) in menus" :key="index">
        <div
          @click="selectType(index,item)"
          class="grid-content-person grid-content-select"
          :class="{'grid-content-active':activIndex==index}"
        >
          <img :src="item.imgUrl" alt />
          <p>{{item.title}}</p>
          <img
            src="../assets/img/team/selected.png"
            alt
            class="select-tag"
            v-if="activIndex==index"
          />
        </div>
      </el-col>
    </el-row>
    <el-button type="primary" class="next-btn" @click="next">下一步</el-button>
  </div>
</template>
<script>
import { getTeamInfo } from '../api/team'
export default {
  data () {
    return {
      activIndex: 0,
      menus: [{
        title: '个人团队',
        imgUrl: require('../assets/img/team/person.png'),
        url: 'personalForm'
      }, {
        title: '企业团队',
        imgUrl: require('../assets/img/team/team.png'),
        url: 'companyForm'
      }],
      url: 'personalForm',
      teamId: '',
      type: ''
    }
  },
  created () {
    let uid = localStorage.getItem('uid')
    getTeamInfo({ uid }).then(res => {
      if (res && res.data) {
        this.teamId = res.data.uid
        this.type = res.data.type
        this.activIndex = this.type == 2 ? 0 : 1
      }
      else {
        this.teamId = ''
        this.type = ''
        this.activIndex = 0
      }
    })
  },
  methods: {
    selectType (index, item) {
      if (!this.type) {
        this.activIndex = index
        this.url = item.url
      }
      else {
        return
      }
    },
    next () {
      this.$router.push({ path: this.url, query: { teamId: this.teamId } })
    }
  }
}
</script>
<style lang="scss">
  .team-setting-view {
    width: 100%;
    margin: 0 auto;
    text-align: center;  
    overflow: hidden;
    background: #fff;
    &.team-box{
      height: calc(100% - 70px);
    }
    .title {
      font-size:22px;
      color: #333333;
      margin-top: 5%;
      text-align: center;
    }
    .team-setting-box {
      margin: 5% auto;
    }
    .grid-content-select {
      width:236px;
      height:276px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(238,238,238,1);
      box-shadow:0px 1px 10px 0px rgba(106,106,106,0.15);
      border-radius:3px;
      text-align: center;
      line-height: 130px;
      padding-top: 40px;
      margin: 0 20px;
      position: relative;
      &.grid-content-active {
        border:2px solid rgba(54,153,255,1);
      }
      .select-tag {
        position: absolute;
        right: -2px;
        top: -2px;
      }
    }
    .next-btn {
      width:201px;
      height:38px;
      background:rgba(54,153,255,1);
      border-radius:3px;
    }
  }
</style>