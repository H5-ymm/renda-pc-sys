<template>
  <ul class="fixed" v-if="isShow">
    <li>
      <a href="#header">
        <el-tooltip class="item" effect="dark" content="一键置顶" placement="left">
          <img src="../assets/img/top.png" alt />
        </el-tooltip>
      </a>
    </li>
    <li>
      <el-tooltip class="item" effect="dark" content="联系客服" placement="left">
        <img src="../assets/img/kefu.png" alt />
      </el-tooltip>
    </li>
    <li class="help">
      <el-tooltip class="item" effect="dark" content="帮助反馈" placement="left">
        <img src="../assets/img/help.png" alt />
      </el-tooltip>
    </li>
  </ul>
</template>
<script>
export default {
  props:['isShow']
}
</script>
<style>
.fixed {
  position: fixed;
  right: 50px;
  bottom: 36%;
  z-index: 333;
}
.fixed li {
  width:50px;
  height:50px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(238,238,238,1);
  box-shadow:0px 2px 10px 0px rgba(70,70,70,0.1);
  border-radius:5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fixed .help {
  background: #1890FF;
}
</style>


