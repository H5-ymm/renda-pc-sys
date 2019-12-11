<template>
  <el-dialog title="企业日志" :visible.sync="dialogTableVisible" @close="handleClose">
  <el-timeline>
    <el-timeline-item
      v-for="(item, index) in logList"
      :key="index"
      color="#1890FF"
      :timestamp="$moment(item.ctime).format('YYYY-MM-DD HH:mm')">
      {{item.content}}
    </el-timeline-item>
  </el-timeline>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleClose">关闭</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
 props:['dialogTableVisible','logList'],
 data() {
   return {
   }
 },
 methods:{
   handleClose(){
     this.$emit('handleClose')
   }
 }
}
</script>

<style>

</style>

