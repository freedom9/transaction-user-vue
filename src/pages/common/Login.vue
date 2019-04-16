<template>
  <el-dialog
    width="350px"
    title="登录"
    :close-on-click-modal="false"
    @close="onClose"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
      <el-form-item prop="username">
        <el-input v-model="dataForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-input v-model="dataForm.captcha" placeholder="验证码"></el-input>
          </el-col>
          <el-col :span="10" class="login-captcha">
            <img :src="dataForm.captchaPath" @click="getCaptcha()" alt="">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button class="w-p-100" type="primary" @click="dataFormSubmit()">登录</el-button>
      </el-form-item>

      <div class="remind" @click="register()">还没有账号？去注册</div>
    </el-form>
     <!-- 弹窗，注册 -->
    <Register v-if="registerVisible" ref="register"></Register>
  </el-dialog>
</template>

<script>
import Cookies from 'js-cookie'
import Register from './Register'
export default {
  components: {
    Register
  },
  data () {
    return {
      registerVisible: false,
      dataForm: {
        username: '',
        password: '',
        captcha: '',
        captchaPath: ''
      },
      dataRule: {
        username: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    visible () {
      return this.$store.state.loginDialog
    }
  },
  created () {
    this.getCaptcha()
  },
  methods: {
    onClose () {
      this.$store.commit('setLoginDialog', false)
    },
    init () {
      this.$store.commit('setLoginDialog', true)
    },
    // 表单提交
    async dataFormSubmit () {
      let params = {
        'username': this.dataForm.username,
        'password': this.dataForm.password,
        'captcha': this.dataForm.captcha
      }
      const { data } = await this.$store.dispatch('login', params)
      console.log(data)
      if (data.code === 200) {
        Cookies.set('token', data.token)
        localStorage.setItem('userId', data.userId)
        this.$message.success(data.msg)
        // 关闭弹窗
        this.$store.commit('setLoginDialog', false)
        this.$store.commit('setIsLogin', true)
        this.$emit('loginSuc')
      } else {
        this.getCaptcha()
        this.$message.error(data.msg)
      }
    },
    // 获取验证码
    getCaptcha () {
      this.dataForm.captchaPath = `http://39.108.6.26:8088/transaction/defaultKaptcha?date=` + new Date() * 1
    },
    register () {
      this.registerVisible = true
      this.$nextTick(() => {
        this.$refs.register.init()
      })
    }
  }
}
</script>

<style lang="scss">
  .remind {
  font-size: 15px;
  float: right;
  color:#b22222;
  }
</style>
