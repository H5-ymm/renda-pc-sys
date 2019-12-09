<template>
  <div class="memberForm">
    <!-- 添加标签 -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="搜索类型：">
        <el-select v-model="form.type" placeholder="请选择" class="width120">
          <el-option label="姓名" value="1"></el-option>
          <el-option label="联系电话" value="2"></el-option>
          <el-option label="直属上级" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.keyword" placeholder="请输入你要搜索的关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="select-btn">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
      }
    }
  },
  methods: {
    onSubmit () {
      this.$emit('onSubmit', this.form)
    }
  }
}
</script>

<style scoped lang="scss">
 .memberForm {
    .width120 {
      width: 120px;
    }
   .el-input {
      border-radius:3px;
      width: 200px;
   }
   .select-btn {
    border-radius:3px;
   }
 }
</style>
