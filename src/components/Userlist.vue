<template>
  <div class="tables-box">
    <memberCard :userType="userType"></memberCard>
    <div class="table-list">
      <memberQuery @onSubmit="onSubmit"></memberQuery>
      <memberTable
        :total="total"
        :tableData="tableData"
        @handleEdit="handleEdit"
        @addMember="addMember"
        @handleDel="handleDel"
        @handleSelectionChange="handleSelectionChange"
      ></memberTable>
      <el-pagination
        class="team-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formMember.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="formMember.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <memberAdd :dialogTableVisible="visible" @submitForm="submitForm"></memberAdd>
    <memberInfo
      :dialogTableVisible="dialogTableVisible"
      @submitMember="submitMember"
      :userId="userId"
    ></memberInfo>
  </div>
</template>

<script>
import Breadcrumb from './breadcrumb/Breadcrumb'
import memberCard from './membership/memberCard'
import memberQuery from './membership/memberQuery'
import memberTable from './membership/memberTable'
import memberInfo from './membership/memberInfo'
import memberAdd from './membership/memberAdd'
import { getTeamList, loginOutTeam, addTeamUser, updateTeamUser } from '../api/team'
import memberInfoVue from './membership/memberInfo.vue';
export default {
  components: {
    Breadcrumb,
    memberCard,
    memberQuery,
    memberTable,
    memberInfo,
    memberAdd
  },
  data () {
    return {
      breadcrumb: ['设置', '管理控制', '全部管理员'],
      dialogTableVisible: false,
      visible: false,
      tableData: [],
      currentPage: 1,
      userType: 1,
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      len: 0,
      userId: ''
    }
  },
  created () {
    // 初始化查询标签数据
    // this.reverseUser()
    this.getList(this.formMember)
  },
  methods: {
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    getList (params) {
      getTeamList(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      })
    },
    handleEdit (val) {
      this.dialogTableVisible = true
      this.userId = val
      console.log(this.userId)
    },
    handleDel (uid) {
      loginOutTeam({ uid }).then(res => {
        this.$message.success('退出成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    submitMember (val) {
      updateTeamUser(val).then(res => {
        this.dialogTableVisible = false
        this.getList(this.params)
      })
    },
    handleSelectionChange (val) {
      this.len = val
    },
    addMember () {
      this.visible = true
    },
    onSubmit (value) {
      let params = Object.assign(this.formMember, value)
      this.getList(params)
    },
    submitForm (val) {
      this.visible = false
      addTeamUser(val).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    }
  }
}
</script>

<style lang="scss">
.table-list {
  background: #fff;
  border-radius:5px;
  // height: calc(100% - 100px);
  padding: 15px;
  .team-pagination {
    margin-top: 20px;
  }
  .member-table {
    .action-btn {
      color: #333333;
      margin-bottom: 15px;
      .el-button {
        border-radius: 0;
        height: 38px;
      }
      .select-text {
        font-size: 14px;
        margin: 0 5px;
        color: #6A6A6A;
      }
    }
  }
}
.tables-box{
  width: 100%;
  overflow: hidden;
  margin-bottom: 60px;
}
.team-info-row {
  margin: 20px 0;
}
.box-card p {
  font-size:16px;
}
.box-card p:nth-of-type(2) {
  font-size:34px;
  margin-top: 10px;
}
</style>
