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
          <el-input class="query-input" v-model="keyword" @change="changeInput" placeholder="请输入关键词"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">搜索</el-button>
          <el-button type="primary" @click="show=!show" class="collapse-btn">{{show?'收起':'展开'}}</el-button>
        </div>
        </el-form-item>
        <el-collapse-transition>
        <div v-show="show">
          <el-form-item label="登录时间:">
            <el-button type="primary" @click="getList(formParams)">全部</el-button>
            <el-link :underline="false" @click="selectLogin(item)"  v-for="(item,index) in timeList" :key="index">{{item.label}}</el-link>
          </el-form-item>
          <el-form-item label="注册时间:">
            <el-button type="primary" @click="getList(formParams)">全部</el-button>
            <el-link :underline="false" @click="selectReg(item)"  v-for="(item,index) in timeList" :key="index">{{item.label}}</el-link>
         </el-form-item>
         <el-form-item label="状态筛选:">
            <el-button type="primary" @click="getList(formParams)">全部</el-button>
            <el-link :underline="false" @click="selectStatus(item)" v-for="(item,index) in statusList" :key="index">{{item.label}}</el-link>
        </el-form-item>
       </div>
      </el-collapse-transition>
      <el-form-item class="hanble-btn">
        <el-button type="primary" @click="onSubmit" class="select-btn">审核</el-button>
        <el-button  @click="onSubmit" class="select-btn">删除</el-button>
        <el-button  @click="onSubmit" class="select-btn">锁定</el-button>
      </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="multipleTable" style="width: 100%">
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
            <el-button @click="handleCheck(scope.row)" type="text" size="small">审核</el-button>
            <el-button @click="handleEdit(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleLog(scope.row)" type="text" size="small">日志</el-button>
            <div>
              <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
              <el-button @click="handleLock(scope.row)" type="text" size="small">锁定</el-button>
              <el-button @click="handlePassword(scope.row)" type="text" size="small">密码</el-button>
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
    <Log :dialogTableVisible="visible" @submitForm="submitForm" @handleClose="visible=false" :logList="logList"></Log>
    <lockCompany :dialogTableVisible="visibleLock" @submit="submit" @handleClose="visibleLock=false"></lockCompany>
    <checkCompany :dialogTableVisible="visibleCheck" @submit="submitCheck" @handleClose="visibleCheck=false"></checkCompany>
  </div>
</template>

<script>
import Log from './company/companyLog'
import lockCompany from './company/companyLock'
import checkCompany from './company/companyCheck'
import { getCompanyList, companyLog,resetPassword, companyLock,companyCheck } from '../api/company'
import companyCheckVue from './company/companyCheck.vue';
export default {
  components: {
    Log,
    lockCompany,
    checkCompany
  },
  data () {
    return {
      show:true,
      visible: false,
      visibleLock:false,
      visibleCheck:false,
      tableData: [],
      userType: 1,
      keyword: '',
      type: '',
      formParams: {
        limit: 10,
        page: 1
      },
      total: 0,
      formMember: {},
      timeList: [
        {label:'今天',value:1},
        {label:'最近三天',value:2},
        {label:'最近七天',value:3},
        {label:'最近半月',value:4},
        {label:'最近一个月',value:5}
      ],
		 statusList: [
			{label:'待审核',value:1},
			{label:'已通过',value:2},
			{label:'未通过',value:3},
     ],
     logList:[]
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formParams)
  },
  methods: {
    changeInput(e){
      this.formParams[this.type] = e
    },
    handleSizeChange (val) {
      this.formParams.limit = val
      this.getList(this.formParams)
    },
    handleCurrentChange (val) {
      this.formParams.page = val
      this.getList(this.formParams)
    },
    selectLogin(item) {
      this.formParams.login_data = item.value
    },
    selectReg(item) {
      this.formParams.reg_date = item.value
    },
    selectStatus(item) {
      this.formParams.status = item.value
    },
    onSubmit(){
      this.getList(this.formParams)
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
      this.$router.push({path:'companyInfo',query:{uid:val.uid}})
    },
    handleCheck(val) {
      this.visibleCheck = true
      this.formMember = val
    },
    submitCheck(val){
      companyCheck(val).then(res =>{
          this.getList(this.formParams)
        }).catch((error)=>{
        this.$message.error(error.status.remind)
      })
    },
    handleLock(val) {
     this.visibleLock = true
     this.formMember = val
    },
    submit(val) {
      companyLock(val).then(res =>{
          this.getList(this.formParams)
        }).catch((error)=>{
        this.$message.error(error.status.remind)
      })
    },
    handleDel (val) {
      this.$confirm('你确定要删除码?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let uid = val.id
          deleteUser({uid}).then(res =>{
            this.getList(this.formParams)
          })
        }).catch(()=>{
          console.log(2)
        })
    },
    handlePassword(val) {
      this.$alert('密码将设置为123456<br>确定重置吗?', '密码重置', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let uid = val.id
          resetPassword({uid}).then(res =>{
            this.getList(this.formParams)
          })
        }).catch(()=>{
          console.log(2)
        })
    },
    handleLog(row) {
      companyLog({uid:row.uid}).then(res => {
        this.visible = true
        this.logList = res.data
      })
    },
    submitForm (val) {
      this.visible = false
      this.handle(val)
    },
    handle(params) {
      if (params.uid) {
        updateUser(params).then(res => {
        this.getList(this.formParams)
       }).catch(error => {
        this.$message.error(error.status.remind)
      })
      }
      else {
        addUser(params).then(res => {
          this.getList(this.formParams)
        }).catch(error => {
        this.$message.error(error.status.remind)
      })
      }
    }
  }
}
</script>

<style lang="scss">
  .tables-box{
    overflow: hidden;
    .table-list {
      background: #fff;
      border-radius:5px;
      padding: 15px;
      &.company-list{
        height: calc(100% - 80px);
      }
      .width100 {
        width: 110px;
      }
      .query-input {
        margin: 0 20px;
        width: 180px;
      }
      .collapse-btn {
        margin-left: 40px;
      }
      .hanble-btn {
        padding-top: 20px;
      }
      .el-link {
        margin-left: 20px;
      }
      .team-pagination {
        margin-top: 20px;
      }
      .tip {
        margin: 30px 0;
      }
    }
  }
</style>
