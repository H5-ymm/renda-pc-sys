<template>
  <div class="login-view">
    <el-form ref="TabForm" :model="formTab" label-width="20" :rules="formTabs" class="form-box">
      <div class="x-flex-between login-view-btn">
        <el-button type="text" :class="loginWay==1?'':'active'" @click="switchLogin(1)">账号登录</el-button>
        <el-button type="text" :class="loginWay==2?'':'active'" @click="switchLogin(2)">短信登录</el-button>
      </div>
      <el-form-item prop="name" label="手机号">
        <span class="error errorInfo el-icon-warning">账号或者密码错误</span>
        <el-input placeholder="请输入11位手机号" v-model="formTab.name">
          <template slot="prepend">
            <span>+86</span>
            <i class="el-icon-arrow-down"></i> |
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="passwords" label="密码" v-if="loginWay==1">
        <el-input v-model="formTab.password" placeholder="请输入密码" show-word-limit></el-input>
      </el-form-item>
      <el-form-item prop="passwords" label="发送验证码" v-if="loginWay==2">
        <span class="error el-icon-warning">验证码错误或者已过期</span>
        <el-input v-model="formTab.code" placeholder="请输入密码" class="inputCode" show-word-limit></el-input>
        <el-button
          type="primary"
          class="code-btn"
          plain
          :class="{disabled: !this.canClick}"
          @click="sendCode"
        >{{content}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <span class="code-btn password">忘记密码</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('TabForm')" class="login">注册</el-button>
      </el-form-item>
      <p class="text">
        还没有账户，
        <a href="/load">免费注册</a>
        <img src="../assets/img/loginRight.png" alt class="loginRight" />
      </p>
    </el-form>
  </div>
</template>
<script>
import { goLogin, getCode } from '../api/login'
export default {
  data () {
    let validatereg = function (rule, value, callback) {   //验证用户名是否合法
      let reg = /^1[3456789]\d{9}$/;
      console.log(value)
      if (!(reg.test(value))) {
        callback(new Error('手机号格式不正确'));
      } else {
        callback();
      }
    };
    let validatePassReg = function (rule, value, callback) {   //验证密码是否合法
      let reg = /^[a-zA-Z][a-zA-Z0-9]{6,30}$/;
      if (reg.test(value) == true) {
        callback();
      } else {
        callback(new Error('密码不合法(请输入数字或字母)'));
      }
    };
    return {
      formTab: {
        name: '',
        password: '',
        type: '1'
      },
      checked: false,
      formTabTsxt: {
        name: 'test',
        passwords: 'test1234',
        checked: false
      },
      formTabs: {  //验证规则
        name: [
          { message: '请输入手机号', trigger: 'blur' },
          { validator: validatereg, trigger: 'blur' }
        ],
        passwords: [
          { message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' },
          { validator: validatePassReg, trigger: 'blur' }
        ]
      },
      loginWay: 1,
      content: '发送验证码',  // 按钮里显示的内容
      totalTime: 60,
      timer: null,
      canClick: true
    }
  },
  methods: {
    sendCode () {
      if (!this.formTab.name) {
        return this.$message.warning('手机号不能为空')
      }
      this.countDown()
      getCode({ mobile: this.formTab.name }).then(res => {
        console.log(res)
      })
    },
    countDown () {
      if (!this.canClick) return  //改动的是这两行代码
      this.canClick = false
      this.content = this.totalTime + 's后重发'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重发'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 10
          this.canClick = true  //这里重新开启
        }
      }, 1000)
    },
    switchLogin (index) {
      this.loginWay = index
      this.formTab.type = index
      this.formTab.name = ''
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.formTab)
          goLogin(this.formTab).then(res => {
            console.log(res)
          }).catch(error => {
            console.log(error)
            return this.$message.error(error.status.remind)
          })
        } else {
          return false
        }
      })
    },
    onLoading () {
      let token = null
      if (window.localStorage.getItem('token')) {
        token = window.localStorage.getItem('token')
      } else if (window.sessionStorage.getItem('token')) {
        token = window.sessionStorage.getItem('token')
      } else {
        token = null
      }
      if (token) {
        this.$http({
          url: 'rulesToken',
          methos: 'GET',
          headers: {
            'Authorization': token
          }
        }).then(res => {

          if (res.data.code == 0) {
            this.$message({
              showClose: true,
              message: '登陆成功',
              type: 'success'
            });
            this.$store.commit('adduser', res.data.msg)
            this.$router.push('/')

          } else {
            this.$message({
              showClose: true,
              message: '登陆失败',
              type: 'success'
            });
            window.localStorage.clear()
            window.sessionStorage.clear()
          }
        }).catch(error => {
          //   this.$message.error('Token过期，请重新登陆');
          /// this.$router.push('/load')
          window.localStorage.clear()
          window.sessionStorage.clear()
        })
      }
    },
    onForget: function () {
      this.$router.push('/load')
    }

  },
  components: {

  },
  created: function () {  //验证Token   
    this.onLoading()
  }
}
</script>

<style >
.form-box {
  width:90%;
  margin:0 auto;
  overflow: hidden;
}
.login-view {
  width:100%;
  height: 100%;
  background:rgba(255,255,255,1);
}
.x-flex-between {
  display: flex;
  justify-content:space-between;
  align-items: center;
}
.login-view-btn {
  margin:20px 0;
  color:rgba(153,153,153,1);
}
.login-view-btn  .button{
   margin-right:10px;
}
.login-view-btn .active {
  color:#6A6A6A;
}
.login-view .el-form-item {
  margin-bottom: 0;
}
.login-view .el-input__inner {
  border-radius:3px;
  background:#eee;
  border:none;
}
.login-view .el-input-group__prepend {
  border:none;
  background:#eee;
  padding: 0 0 0 20px ;
}
.login-view .error {
  position:absolute;
  top:16%;
  right:0;
  color:#FE2A00;
  font-size:12px;
}
.login-view .errorInfo {
  right:0;
  width:100%;
  height:20px;
  top:-16px;
  text-align:center;
  line-height:20px;
  background:rgba(254,42,0,0.1);
  border-radius:3px;
 }
.login-view .el-input-group__prepend span {
  opacity:1;
  display:inline-block;
}
.login-view .inputCode {
  width: 70%!important;
  margin-right:10px;
  display:block;
}
.login-view .code-btn {
  width: 130px!important;
  position:absolute;
  bottom:0;
  right:0;
  border-radius:0;
}
.login-view .disabled {
  background:rgba(204,204,204,1);
  border:none;
}
.login-view .password {
  text-align:right;
  color:#6A6A6A;
  font-size:14px;
}
.login-view .el-button--primary{
  width: 100%;
}
.texts{
  text-align: center;
}
.passwords{
  text-align: right;
}
/* .submit-btn{
  margin-top: -10px;
} */
.login{
  background:linear-gradient(180deg,rgba(24,144,255,1),rgba(89,175,255,1));
  border-radius:20px;
  border:none;
}
.login-view .text {
  text-align:right;
  font-size:14px;
  margin-right:30px;
  color:#333333;
  margin-top: 20px;
}
.text  a {
  color:#1890FF;
}
.loginRight {
  margin-top: 8px;
  margin-left: 5px;
}
</style>
