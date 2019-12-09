<template>
  <div class="member-table">
    <div class="action-btn x-flex-between">
      <div>
        <el-button type="primary" icon="el-icon-plus" @click="addMember">添加</el-button>
        <el-button>删除</el-button>
        <el-button>锁定</el-button>
        <span class="select-text">
          已选择
          <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
        </span>
        <el-button type="text" @click="multipleSelection=[]">清空</el-button>
      </div>
      <div>
        <el-button @click="dismissTeam()">解散团队</el-button>
      </div>
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
        <el-table-column label="姓名" align="center" width="150">
          <template slot-scope="props">
            <el-button type="text" @click="handleEdit(props.row)">{{props.row.user_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
        <el-table-column label="所属部门" prop="depart_name" align="center" width="150"></el-table-column>
        <el-table-column label="等级" prop="grade_name" sortable align="center" width="150"></el-table-column>
        <el-table-column label="直属上级" prop="grade_name" align="center" width="150"></el-table-column>
        <el-table-column label="简历数量" prop="entry_num" align="center" width="150"></el-table-column>
        <el-table-column label="入职人数" prop="entry_num" align="center" width="150"></el-table-column>
        <el-table-column label="最近登录时间" align="center" width="260">
          <template slot-scope="props">
            <span>{{ props.row.logout_time ? $moment(props.row.logout_time).format('YYYY-MM-DD HH:mm'): '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="150">
          <template slot-scope="props">
            <span
              class="status"
              :class="{'active-status':props.row.status==1}"
            >{{props.row.status==1?"正常":'锁定'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: []
    }
  },
  props: ['tableData'],
  data () {
    return {
      memberInfo: {},
      teamId: '',
      multipleSelection: []
    }
  },
  methods: {
    addMember () {
      this.$emit('addMember')
    },
    handleEdit (row) {
      // this.memberInfo = row
      // this.teamId = row.uid
      this.$emit('handleEdit', row.uid)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      this.$emit('handleSelectionChange', this.multipleSelection.length)
    },
    handleDel (row) {
      // this.memberInfo = row
      // this.teamId = row.uid
      this.$emit('handleDel', row.uid)
    },
    dismissTeam () {
      this.$emit('dismissTeam')
    }
  }
}
</script>
<style lang="scss">
  .table {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    height: 76%;
  }
  .status {
    position: relative;
    margin-left: 10px;
    &.active-status{
      &::before{
       background: #71D875
     }
    }
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
</style>