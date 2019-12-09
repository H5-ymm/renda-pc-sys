<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>添加部门</p>
      </section>
      <section class="member-col3 department-add-col3">
        <el-form
          :model="formMember"
          :rules="rules"
          :inline="true"
          label-position="left"
          ref="formMember"
          class="demo-form-inline"
        >
          <el-form-item label="部门名称" required prop="depart_name">
            <el-input v-model="formMember.depart_name" placeholder="请输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="部门经理" required prop="user_id">
            <el-select v-model="formMember.user_id" placeholder="请选择部门经理">
              <el-option
                :label="item.user_name"
                :value="item.uid"
                v-for="(item,index) in userList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="submitForm">确定添加</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 部门经理只能编辑状态
// 成员只能查看
// 总经理可以编辑部门 职称 状态
import { getTeamListUser } from '../../api/department'
import { validateIdCard } from '../../util/util'
export default {
  props: ['dialogTableVisible'],
  data () {
    return {
      formMember: {
        depart_name: '',
        user_id: '',
        uid: localStorage.getItem('uid'),
      },
      rules: {
        depart_name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
        ],
        user_id: [
          { required: true, message: '请选择部门经理', trigger: 'blur' }
        ]
      },
      userList: [],
      uid: localStorage.getItem('uid')
    }
  },
  created () {
    this.getList(this.uid)
  },
  methods: {
    getList (uid) {
      getTeamListUser({ uid }).then(res => {
        this.userList = res.data
      })
    },
    handleClose () {
      this.$parent.visible = false
    },
    submitForm () {
      this.$refs['formMember'].validate((valid) => {
        if (valid) {
          this.$emit('submitForm', this.formMember)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.member-dialog {
  box-shadow:0px 1px 43px 0px rgba(51,51,51,0.3);
  border-radius:5px;
  .el-dialog__body,.el-dialog__header {
    padding: 0;
  }
 .member-row {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #333333;
    padding: 0 0 10px;
    position: relative;
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .member-col2 {
      line-height: 30px;
      margin: 10px auto;
      width: 65%;
      p {
        &:nth-of-type(1) {
          width: 100px;
          text-align: right;
          color: #6A6A6A;
        }
        &:nth-of-type(2) {
          flex: 1;
          text-align: left;
          margin-left: 30px;
        }
      }  
    }
    .member-col3 {
      width: 100%;
      border-top: 1px solid #eee;
      padding-top: 10px;
      .demo-form-inline {
        width: 90%;
        margin: 10px auto;
        .el-form-item {
          margin-bottom: 10px;
        }
        .el-form-item__label {
          width: 100%;
          margin-left: 20px;
        }
        .el-input__inner{
          height:38px;
          line-height:38px;
          border-radius: 0;
        }
      }
       &.department-add-col3{
        .el-form-item__content {
          display: block;
        }
        .el-input,.el-select {
         
          width: 300px;
          margin-left: 0!important;
        }
      }
    }
  }
}
 
</style>