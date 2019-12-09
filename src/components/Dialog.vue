<template>
  <el-dialog
    title=""
    :visible.sync="centerDialogVisible"
    width="340px"
    center class="dialog">
    <div class="dialog-centent">
      <img src="../assets/img/success.png" alt="">
      <p class="dialog-title">申请成功</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false" type="primary" plain>关闭</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">查看申请</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    props: ['centerDialogVisible','imgBg', 'title', 'okText', 'closeText'],
    data() {
      return {
        
      };
    }
  };
</script>
<style>
.dialog {
  box-shadow:0px 6px 14px 1px rgba(134,133,133,0.3);
  border-radius:5px;
}
.dialog-centent {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.dialog-centent .dialog-title {
  font-size: 18px;
  color:#333;
  font-weight: bold;
  padding-top: 25px;
}
.dialog .el-dialog__body {
  padding: 25px
}
.dialog-footer {
  padding: 0 20px 20px;
}
.dialog-footer .el-button {
  width: 100px;
  padding: 8px 20px;
  margin: 0 15px;
}
</style>
