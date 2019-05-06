<template>
  <div>
    <div class="user-sider f-l m-r-20">
      <div>
        <img class="user-header" src="~@/assets/images/head1.jpg" alt="">
      </div>
      <div class="user-nav">
        <ul>
          <li :class="{actived: idx === index}" @click="idx = index;$router.push('/user/' + item.router)" v-for="(item, index) in nav" :key="index"><a href="javascript:;">{{item.label}}</a></li>
        </ul>
      </div>
    </div>
    <div class="f-l user-main">
      <router-view class="user-content"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nav: [
        { label: '我发布的', router: 'mypublish' },
        { label: '我收藏的', router: 'mywant' },
        { label: '我的聊天', router: 'chat' },
        { label: '个人信息', router: 'userInfo' }
      ],
      idx: 0
    }
  }
}
</script>

<style lang="scss">
.user-sider {
  background: #fff;
  padding: 18px;
  border: #e5e5e5 solid 1px;
  width: 15%;
  min-height: 500px;
  .user-header {
    width: 124px;
    height: 124px;
    border-radius: 66px;
    border: #11cd6e solid 4px;
    display: block;
    margin: 0 auto;
  }
  .username {
    font-weight: bold;
    display: block;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 18px;
  }
  .user-nav {
    border-top: #e5e5e5 solid 1px;
    margin-top: 15px;
    padding: 10px 0;
    ul li {
      &.actived {
        a {
          background-color: #11cd6e;
          color: #fff;
        }
      }
      &:hover {
        background: #ccc;
      }
      text-align: center;
      a {
        line-height: 40px;
        display: block;
      }
    }
  }
}
.user-main {
  width: 78%;
}
</style>
