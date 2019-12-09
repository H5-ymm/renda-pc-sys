<template>
  <el-dialog width="380px" top="30vh" :visible="dialogTableVisible" class="member-dialog dep-dialog" :show-close="false" center>
    <div class="member-row">
      <section class="member-col1 dep-col1"></section>
      <section class="member-col3 department-add-col3">
        <p>有部门经理退出了团队， <br>需要现在去设置一个部门经理！</p>
      </section>
    </div>
    <div slot="footer" class="x-flex-center outDep-footer">
      <el-button type="primary" @click="submitForm">人员调整</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 部门经理只能编辑状态
// 成员只能查看
// 总经理可以编辑部门 职称 状态
export default {
  props: ['dialogTableVisible'],
  data () {
    return {
  
    }
  },
  methods: {
    handleClose () {
      this.$parent.visible1 = false
    },
    submitForm() {
      this.$emit('submitForm')
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
    .member-col1 {
      &.dep-col1 {
        background: #5A5A5A;
        padding: 18px 0 17px;
      }
    }
    .member-col3 {
      width: 100%;
      border-top: 1px solid #eee;
      padding-top: 10px;
       &.department-add-col3 {
        > p{
          color: #000000;
          font-size: 14px;
          margin: 20px 0 0;
        }
      }
    }
  }
  .outDep-footer{
    margin: 10px 15px;
    .el-button {
      border-radius: 0;
      padding:10px 40px;
    }
  }
}
 
</style>