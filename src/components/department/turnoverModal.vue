<template>
  <el-dialog
    width="75%"
    :visible="dialogTableVisible"
    class="member-dialog table-dialog"
    :show-close="false"
  >
    <div class="member-row turnover-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>人员调整</p>
      </section>
      <div class="member-table turnover-box">
        <div class="memberForm">
          <el-form :inline="true" :model="formMember" class="demo-form-inline">
            <el-form-item label="姓名/联系电话：">
              <el-input v-model="formMember.where" placeholder="请输入你要搜索的关键字" class="width300"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="querySearch" class="select-btn">搜索</el-button>
            </el-form-item>
            <div class="action-btn x-flex-between">
              <div>
                <el-form-item>
                  <el-select
                    v-model="formMember.departId"
                    placeholder="所属部门"
                    @change="selectDep"
                    class="width100"
                  >
                    <el-option
                      :label="item.depart_name"
                      :value="item.id"
                      v-for="(item,index) in depList"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="formMember.gradeId" placeholder="等级" class="width100">
                    <el-option
                      :label="item.grade_name"
                      :value="item.id"
                      v-for="(item,index) in jobList"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <span class="select-text">
                  已选择
                  <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
                </span>
                <el-button type="text">清空</el-button>
              </div>
            </div>
          </el-form>
        </div>
        <div class="table">
          <el-table
            border
            :data="tableData"
            ref="multipleTable"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="序号" type="selection" align="center" width="60"></el-table-column>
            <el-table-column label="姓名" align="center" prop="user_name" width="150"></el-table-column>
            <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
            <el-table-column label="最近登录时间" align="center" width="150">
              <template slot-scope="props">
                <span>{{ props.row.loginTime ? $moment(props.row.loginTime).format('YYYY-MM-DD HH:mm'): '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="直属上级" prop="superiorName" align="center" width="150"></el-table-column>
            <el-table-column label="所属部门" align="center" width="150">
              <template slot-scope="props">
                <span v-if="!isEdit">{{ props.row.depart_name}}</span>
                <el-select
                  v-else
                  v-model="depart_id"
                  :placeholder="props.row.depart_name"
                  @change="selectDep"
                  class="width100 table-edit"
                >
                  <el-option
                    :label="item.depart_name"
                    :value="item.id"
                    v-for="(item,index) in depList"
                    :key="index"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="等级" align="center" width="150">
              <template slot-scope="props">
                <span v-if="!isEdit">{{ props.row.grade_name}}</span>
                <el-select
                  v-else
                  v-model="grade_id"
                  :placeholder="props.row.grade_name"
                  @change="selectDep"
                  class="width100 table-edit"
                >
                  <el-option
                    :label="item.grade_name"
                    :value="item.id"
                    v-for="(item,index) in jobList"
                    :key="index"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.row,scope.$index)"
                  v-if="!isEdit"
                  type="text"
                  size="small"
                >调整人员</el-button>
                <div v-if="isEdit&&activeIndex==scope.$index">
                  <el-button @click="handleSubmit" type="text" size="small">确认</el-button>
                  <el-button type="text" size="small">取消</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
    </div>
  </el-dialog>
</template>
<script>
import { adjustmentList, departmentRoleList } from '../../api/department'
import { editTeamUserRole } from '../../api/team'
export default {
  props: ['dialogTableVisible', 'departId'],
  data () {
    return {
      teamId: '',
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      tableData: [],
      multipleSelection: [],
      total: 0,
      isEdit: false,
      depList: [],
      jobList: [],
      activeIndex: -1,
      isEdit: false,
      depInfo: {},
      depart_id: '',
      grade_id: ''
    }
  },
  created () {
    this.getJobList()
  },
  watch: {
    departId (val) {
      if (val) {
        this.formMember.departId = Number(val)
        this.getList(this.formMember)
      }
    }
  },
  methods: {
    getJobList () {
      let uid = localStorage.getItem('uid')
      departmentRoleList({ uid }).then(res => {
        console.log(res)
        this.depList = res.data
      })
    },
    selectDep (val) {
      this.jobList = this.getArr(this.depList, val)
    },
    getArr (arr, id) {
      let newArr = []
      arr.forEach(item => {
        if (item.id == id) {
          newArr = item.child
        }
      })
      return newArr
    },
    getList (params) {
      adjustmentList(params).then(res => {
        this.tableData = res.data.data
      })
    },
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleEdit (row, index) {
      this.activeIndex = index
      this.isEdit = true
      this.depInfo = row
      console.log(this.depInfo)
      // this.teamId = row.uid
      // this.$emit('handleEdit', row.uid)
    },
    handleSubmit () {
      let params = {
        userId: this.depInfo.uid,
        gradeId: this.grade_id
      }
      editTeamUserRole(params).then(res => {
        this.isEdit = false
        this.depart_id = ''
        this.grade_id = ''
        this.activeIndex = -1
        this.getList(this.formMember)
        this.$emit('handleClose', 1)
      })
    },
    handleClose () {
      this.$emit('handleClose')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      this.$emit('handleSelectionChange', this.multipleSelection.length)
    },
    dismissTeam () {
      this.$emit('dismissTeam')
    },
    submitForm () {
    },
    querySearch () {
      this.getList(this.formMember)
    }
  }
}
</script>
<style lang="scss">
.member-dialog {
  &.table-dialog {
    .el-dialog {
      height: 600px;
      overflow: auto;
      .el-table {
        height: 300px;
      }
      .el-table--scrollable-x .el-table__body-wrapper {
        height: 80%;
      }
    }
  }
  .member-row  {
    &.turnover-row {
      text-align: left;
      .member-col1 {
        text-align: center;
      }
      .team-pagination {
        margin-top: 15px;
      }
      .memberForm {
        .el-input__inner {
          height: 38px;
          line-height: 38px;
        }
        .action-btn {
          margin-bottom:  0;
        }
        .el-form-item {
          margin-bottom: 12px;
        }
      }  
    }
  }
  .table-edit {
    .el-input__inner {
      border: none;
      outline: none;
    }
    .el-input__inner:hover {
      border: none;
      outline: none;
    }
  }
}
.member-table {
  &.turnover-box {
    font-size:14px;
    padding: 20px 15px;
    .width300 {
      width: 300px;
    }
  }
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
      .width100 {
        width: 100px;
      }
    }
    .table {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 10px 0;
    }
    .status {
      position: relative;
      margin-left: 10px;
      &::before{
        position: absolute;
        content: "";
        width:6px;
        height: 6px;
        border-radius: 50%;
        top: 7px;
        left: -20px;
        background: #FF0000;
      }
    }
}
</style>