<template>
  <div class="tables-box">
    <div class="table-list company-list">
      <el-form :model="formParams" class="demo-form-inline">
        <el-form-item label="搜索类型:">
          <div class="x-flex-start search-query">
            <el-select v-model="type" placeholder="请选择" class="width100">
              <el-option label="企业名称" value="com_name"></el-option>
              <el-option label="手机号" value="telphone"></el-option>
              <el-option label="用户编码" value="id"></el-option>
            </el-select>
            <el-input
              class="query-input"
              v-model="keyword"
              @change="changeInput"
              placeholder="请输入关键词"
            ></el-input>
            <el-button type="primary" @click="getList(formParams)" class="select-btn">搜索</el-button>
            <el-button type="primary" @click="show=!show" class="collapse-btn">{{show?'收起':'展开'}}</el-button>
          </div>
        </el-form-item>
        <el-collapse-transition>
          <div v-show="show">
            <el-form-item label="登录时间:">
              <el-link
                :underline="false"
                :class="{'active': formParams.login_data==item.value}"
                @click="selectQuery('login_data',item)"
                v-for="(item,index) in timeList"
                :key="index"
              >{{item.label}}</el-link>
            </el-form-item>
            <el-form-item label="注册时间:">
              <el-link
                :underline="false"
                :class="{'active': formParams.reg_date==item.value}"
                @click="selectQuery('reg_date',item)"
                v-for="(item,index) in timeList"
                :key="index"
              >{{item.label}}</el-link>
            </el-form-item>
            <el-form-item label="状态筛选:">
              <el-link
                :underline="false"
                :class="{'active': formParams.status==item.value}"
                @click="selectQuery('status',item)"
                v-for="(item,index) in statusList"
                :key="index"
              >{{item.label}}</el-link>
            </el-form-item>
          </div>
        </el-collapse-transition>
        <el-form-item class="hanble-btn">
          <el-button type="primary" @click="handleTeam('check')" class="select-btn">审核</el-button>
          <el-button @click="handleTeam('')" class="select-btn">删除</el-button>
          <el-button @click="handleTeam('lock')" class="select-btn">锁定</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        ref="multipleTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="60"></el-table-column>
        <el-table-column label="用户编号" prop="id" align="center" width="80"></el-table-column>
        <el-table-column label="企业名称" prop="com_name" align="center" width="200"></el-table-column>
        <el-table-column label="登录/注册" prop="login_date" align="center" width="150"></el-table-column>
        <el-table-column label="手机号" prop="phone" align="center" width="150"></el-table-column>
        <el-table-column label="认证信息" align="center" width="150">
          <template slot-scope="props">
            <span>{{ props.row.status === 1 ? '待审核': props.row.status === 2 ? '已通过': '未通过'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100">
          <template slot-scope="props">
            <span>{{ props.row.status === 1 ? '待审核': props.row.status === 2 ? '已通过': '未通过'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="table-button-box">
              <el-button @click="handleTeam('check',scope.row)" type="text" size="small">审核</el-button>
              <el-button @click="handleEdit(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="handleLog(scope.row)" type="text" size="small">日志</el-button>
              <div>
                <el-button @click="handleDel(scope.row.uid)" type="text" size="small">删除</el-button>
                <el-button @click="handleTeam('lock',scope.row)" type="text" size="small">锁定</el-button>
                <el-button @click="handlePassword(scope.row)" type="text" size="small">密码</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="team-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formParams.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="formParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <Log :dialogTableVisible="visible" @handleClose="visible=false" :uid="uid"></Log>
    <confirmDialog
      :dialogTableVisible="dialogTableVisible"
      @submit="submit"
      :dialogType="dialogType"
      @handleClose="dialogTableVisible=false;uid='';dialogType=''"
    ></confirmDialog>
  </div>
</template>

<script>
import Log from './company/companyLog'
import confirmDialog from './common/confirmDialog'
import { getCompanyList, companyLog, resetPassword, companyLock, companyCheck } from '../api/company'
export default {
  components: {
    Log,
    confirmDialog
  },
  data () {
    return {
      show: true,
      visible: false,
      dialogTableVisible: false,
      tableData: [],
      userType: 1,
      keyword: '',
      type: '',
      formParams: {
        limit: 10,
        page: 1,
        status: 0,
        reg_date: 0,
        login_data: 0
      },
      total: 0,
      formMember: {},
      timeList: [
        { label: '全部', value: 0 },
        { label: '今天', value: 1 },
        { label: '最近三天', value: 2 },
        { label: '最近七天', value: 3 },
        { label: '最近半月', value: 4 },
        { label: '最近一个月', value: 5 }
      ],
      statusList: [
        { label: '全部', value: 0 },
        { label: '待审核', value: 1 },
        { label: '已通过', value: 2 },
        { label: '未通过', value: 3 },
      ],
      logList: [],
      teamType: [
        { label: '个人', value: 2 },
        { label: '团队', value: 1 }
      ],
      uid: '',
      dialogType: ''
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formParams)
  },
  methods: {
    changeInput (e) {
      this.formParams[this.type] = e
    },
    handleSelectionChange (val) {
      this.uid = val.map(item => item.uid).join(',')
    },
    handleSizeChange (val) {
      this.formParams.limit = val
      this.getList(this.formParams)
    },
    handleCurrentChange (val) {
      this.formParams.page = val
      this.getList(this.formParams)
    },
    selectQuery (key, item) {
      this.formParams[key] = item.value
    },
    handleTeam (type, val) {
      if (!this.uid && !val) {
        return this.$message.warning('请选择团队')
      }
      else {
        if (!type) {
          this.handleDel(this.uid)
        }
        else {
          this.uid = val.uid
          this.dialogType = type
          this.dialogTableVisible = true
        }
      }
    },
    submit (val) {
      this.dialogTableVisible = false
      let params = Object.assign(val, { ids: this.ids })
      if (this.dialogType == 'check') {
        this.submitCheck(params)
      } else {
        this.submitLock(params)
      }
    },
    getList (params) {
      getCompanyList(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      }).catch(error => {
        if (error.status) {
          this.$message.error(error.status.remind)
        }
      })
    },
    handleEdit (val) {
      this.$router.push({ path: 'companyInfo', query: { uid: val.uid } })
    },
    submitCheck (val) {
      companyCheck(val).then(res => {
        this.getList(this.formParams)
        this.uid = ''
      }).catch((error) => {
        this.$message.error(error.status.remind)
      })
    },
    submitLock (val) {
      companyLock(val).then(res => {
        this.getList(this.formParams)
        this.uid = ''
      }).catch((error) => {
        this.$message.error(error.status.remind)
      })
    },
    handleLock (val) {
      this.visibleLock = true
      this.uid = val.uid
    },
    handleDel (uid) {
      this.$confirm('你确定要删除码?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ uid }).then(res => {
          this.getList(this.formParams)
        })
      }).catch(() => {
        console.log(2)
      })
    },
    handlePassword (val) {
      this.$alert('密码将设置为123456<br>确定重置吗?', '密码重置', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let uid = val.uid
        resetPassword({ uid }).then(res => {
          this.$message.success('重置成功')
          this.getList(this.formParams)
        })
      }).catch(() => {
        console.log(2)
      })
    },
    handleLog (row) {
      this.uid = row.uid
      this.visible = true
    }
  }
}
</script>
<style lang="scss">
@import '../assets/css/table-list';
</style>