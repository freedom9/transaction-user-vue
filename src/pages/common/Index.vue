<template>
  <div>
    <header-bar></header-bar>
    <router-view class="content-view"></router-view>
  </div>
</template>

<script>
import HeaderBar from './Header.vue'

export default {
  components: {
    HeaderBar
  }
}
</script>
