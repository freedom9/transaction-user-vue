<template>
  <div id="app">
    <login v-if="loginDialog"/>
    <router-view class="app-view"/>
  </div>
</template>

<script>
import Login from './pages/common/Login.vue'
export default {
  components: {
    Login
  },
  computed: {
    loginDialog () {
      return this.$store.state.loginDialog
    }
  }
}
</script>

<style>
</style>
