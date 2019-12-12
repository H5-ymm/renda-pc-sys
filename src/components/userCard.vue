<template>
  <div>
    <p class="company-title">账户信息</p>
    <section class="section-box">
      <el-form-item label="团队名称" prop="team_name">
        <el-input v-model="userInfo.name" class="width408" placeholder="请输入团队名称"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-button type="primary">重置密码</el-button>
        <span class="password-tip">
          <i class="el-icon-warning-outline" /> 密码重置:12345，不可逆转，谨慎操作
        </span>
      </el-form-item>
    </section>
  </div>
</template>
<script>
import { resetPassword } from '../api/company'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }
    console.log(this.userInfo)
  },
  methods: {
    handlePassword () {
      this.$alert('密码将设置为123456<br>确定重置吗?', '密码重置', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let uid = this.userInfo.id
        resetPassword({ uid }).then(res => {
          this.$message.success('重置成功')
          this.getList(this.formParams)
        })
      }).catch(() => {
        console.log(2)
      })
    },
  }
}
</script>