<template>
  <div>
    <div class="bar h-65 p-lv-120" flex="cross:center main:justify">
      <h1 @click="$router.push('/')">夕拾交易平台</h1>
      <div class="f-17" v-if="!isLogin">
        <div class="lr p-lv-15 f-l" @click="login()">登录</div>
        <div class="lr p-lv-15 f-l" @click="register()">注册</div>
      </div>
      <div v-else>
        <div class="lr p-lv-15 f-l">
        <span class="el-dropdown-link">
          <img src="~@/assets/images/head1.jpg">
          <span>admin</span>
        </span>
        </div>
        <div class="lr p-lv-15 f-l" @click="logout()">退出</div>
      </div>
    </div>
    <slot v-if="this.currentRouter !== '/publish'">
      <div class="feature p-v-17 w-p-100" :class="{'fixed': isFixed}">
        <el-input class="w-250 m-l-120" placeholder="商品名" v-model="dataForm.name" clearable></el-input>
        <el-button @click="onSearch()">查询</el-button>
        <el-button @click="publish()" class="fb f-r f-16 m-r-120">
          <bs-icon class="publish" name="publish" size="16"/>
          <span>发布闲置商品</span>
        </el-button>
      </div>
    </slot>
    <!-- 弹窗，登录 -->
    <Login v-if="loginVisible" ref="login"></Login>
    <!-- 弹窗，注册 -->
    <Register v-if="registerVisible" ref="register"></Register>
  </div>
</template>

<script>
import Login from './Login'
import Register from './Register'
import Cookies from 'js-cookie'
export default {
  components: {
    Login,
    Register
  },
  data () {
    return {
      dataForm: {
        name: ''
      },
      isFixed: false,
      loginVisible: false,
      registerVisible: false
    }
  },
  computed: {
    isLogin () {
      // 有token显示登录
      if (Cookies.get('token')) {
        this.$store.commit('setIsLogin', true)
      } else {
        this.$store.commit('setIsLogin', false)
      }
      return this.$store.state.isLogin
    },
    currentRouter () {
      return this.$route.path
    }
  },
  methods: {
    onSearch () {
      this.$router.push({ path: '/search', query: { keyword: this.dataForm.name } })
    },
    publish () {
      this.$router.push('/publish')
    },
    navFixed () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop >= 100
    },
    login () {
      this.loginVisible = true
      this.$nextTick(() => {
        this.$refs.login.init()
      })
    },
    register () {
      this.registerVisible = true
      this.$nextTick(() => {
        this.$refs.register.init()
      })
    },
    logout () {
      this.$confirm(`确定退出?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await this.$store.dispatch('logout')
        if (data && data.code === 200) {
          Cookies.remove('token')
          this.$message.success(data.msg)
          this.$store.commit('setIsLogin', false)
        }
      }).catch(() => {})
    }
  },
  mounted () {
    console.log(this.getToken)
    window.addEventListener('scroll', this.navFixed)
  }
}
</script>

<style lang="scss" scoped>
  .bar {
    background: #11cd6e;
    height: 65px;
    color: #fff;
    .lr {
      line-height: 65px;
      &:hover {
        background-color: rgba(#fff, 0.1);
      }
    }
  }
  .feature {
    background: #f7f7f7;
    z-index: 20;
    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 21;
      background-image: linear-gradient(#fff, #f1f1f1);
      border-bottom: 1px solid #dadada;
    }
    .fb {
      background: #11cd6e;
      color: #fff;
    }
    .publish {
      color: #fff;
    }
  }
  .car-user {
    &.fixed {
      position: fixed;
      top: 0;
      right: 100px;
      z-index: 22;
      transform: translate3d(0, 19px, 0);
      transition: transform .3s cubic-bezier(.165, .84, .44, 1);
    }
  }
  .el-dropdown-link {
    > img {
      width: 36px;
      height: auto;
      margin-right: 5px;
      border-radius: 100%;
      vertical-align: middle;
    }
  }
</style>
