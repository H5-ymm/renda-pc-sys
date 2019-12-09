<template>
  <div class="team-view">
    <!-- <breadcrumb :breadcrumbs="breadcrumb"></breadcrumb> -->
    <div class="team-box x-flex-start">
      <div class="team-box-left">
        <div class="bg-purple-start">
          <el-input
            placeholder="搜索"
            class="team-input"
            v-model="params.title"
            @input="getList(params)"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-dropdown @command="handleCommand">
            <el-button class="dropdown-button">
              <i class="el-icon-more"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu">
              <el-dropdown-item class="el-icon-plus" command="0">&nbsp;新增</el-dropdown-item>
              <el-dropdown-item class="el-icon-refresh-right" command="3">&nbsp;刷新</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 列表 -->
        <person-card :list="list" @selectComment="selectComment"></person-card>
        <!-- 列表 -->
      </div>
      <div class="team-box-content team-box-right">
        <!-- <edit-card></edit-card> -->
        <detail-card
          :cardType="type"
          @refurbish="refurbish"
          @saveDiscuss="saveDiscuss"
          :commentInfo="commentInfo"
        ></detail-card>
      </div>
    </div>
  </div>
</template>

<script>
import PersonCard from './commentCard/PersonCard'
import DetailCard from './commentCard/DetailCard'
import { getDiscussList, getDiscussInfo, addDiscuss } from '../api/comment'
export default {
  components: {
    PersonCard,
    DetailCard
  },
  data () {
    return {
      tableData: [],  //初始化数据
      Number: 10,  //每页条数
      num: 1,  //页码
      numA: 10,  //页码
      AllNum: 0,  //全部条数
      type: 2,
      list: [],
      activeIndex: 0,
      commentInfo: {},
      params: {
        uid: 6,
        title: ''
      },
      commentId: ''
    }
  },
  mounted () {
    this.getList()
    localStorage.setItem('uid', 6)
    localStorage.setItem('username', '测试一号哦')
  },
  methods: {
    getList () {
      getDiscussList(this.params).then(res => {
        if (res.data.data) {
          this.list = res.data.data || []
          this.commentId = this.list[0].id
          this.getDetail(this.commentId)
        }
        else {
          this.commentInfo = null
        }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    getDetail (id) {
      getDiscussInfo({ id }).then(res => {
        this.commentInfo = res.data || {}
      })
    },
    selectComment (id) {
      this.getDetail(id)
      this.type = 2
    },
    saveDiscuss (val) {
      addDiscuss(val).then(res => {
        console.log(res)
        this.getList()
      })
    },
    refurbish () {
      this.getList()
    },
    handleCommand (command) {
      if (command == 3) {
        this.getList()
      } else {
        this.type = command
        this.commentInfo = {}
      }
    },
    handleCurrentChange (val) {
      this.num = val
      this.reverseUser()
    }
  }
}
</script>

<style>
.team-box {
  height: 100%;
  /* margin-bottom: -200px; */
}
.team-box .team-box-left {
  width:540px;
  /* margin: 10px 30px; */
}
.team-box-left .el-input__inner {
  height: 44px;
  line-height: 44px;
}
.team-box-left .el-input__icon {
  line-height: 44px;
}
.team-box-left .team-input .el-input__inner{
    /* width:441px; */
  height:44px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(238,238,238,1);
  box-shadow:0px 4px 4px 0px rgba(106,106,106,0.1);
  border-radius:5px 0px 0px 5px
}
.team-box-content {
  width: 80%;
  background: #fff;
  /* height: 818px; */
  margin-left: 44px;
  border-radius: 10px;
}
.dropdown-menu {
  width: 100px!important;
  color: #999;
  margin-right: 0!important;
}
.el-dropdown-menu {
  overflow: hidden;
}
.el-dropdown-menu__item {
  width: 70px!important;
  
}
.foots{
  margin-top: 30px;
}
.tables-box{
  height: 100%;
  width: 100%;
  margin-bottom: 50px;
}
.foots{
  margin-top: 30px;
}
.team-view {
  /* height: 100%; */
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
