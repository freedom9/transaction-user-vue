<template>
  <div id="bs-product" class="w-195 h-260 p-5 p-r o-h bg-white">
    <div @click="onDetail()" class="h-200 w-195 c-p"><img width="100%" height="100%" :src="list.imageUrl !== null ? list.imageUrl : require('../assets/images/default_picture.jpg')" alt=""></div>
    <p class="sub-detail f-12">{{list.name}}</p>
    <div>
      <span class="price">￥{{list.price}}</span>
      <span class="time">发布于{{list.day}}天前</span>
    </div>
    <div class="chat c-p p-a a-c w-p-100 h-30">
      <div @click="contact(list.userId)" class="contact w-p-70 f-l" >联系卖家</div>
      <bs-icon v-if="!isCollected" @click.native="saveCollection()" name="collection1" size="20" />
      <bs-icon v-else @click.native="deleteCollection()" name="collection2" size="20"/>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  props: {
    list: Object
  },
  data () {
    return {
      isCollected: false,
      mywantId: 0,
      currentUserId: Number(localStorage.getItem('userId'))
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
    }
  },
  created () {
    if (this.isLogin) {
      this.isCollection()
    }
  },
  methods: {
    async saveCollection () {
      if (this.currentUserId === this.list.userId) {
        this.$message.error('这是您自己发布的商品')
      } else {
        let params = {
          'userId': this.currentUserId,
          'goodsId': this.list.id
        }
        const { data } = await this.$store.dispatch('saveCollection', params)
        if (data.code === 200) {
          this.$message({
            message: '收藏成功',
            type: 'success',
            duration: 1000
          })
          this.isCollected = true
          this.mywantId = data.data
        } else {
          this.$message.error(data.msg)
        }
      }
    },
    // 移除收藏
    async deleteCollection (id) {
      if (this.currentUserId === this.list.userId) {
        this.$message.error('这是您自己发布的商品')
      } else {
        let params = {
          'id': this.mywantId
        }
        const { data } = await this.$store.dispatch('deleteCollection', params)
        if (data.code === 200) {
          this.$message({
            message: '取消收藏成功',
            type: 'success',
            duration: 1000
          })
          this.isCollected = false
        }
      }
    },
    // 查找是否与收藏
    async isCollection () {
      let params = {
        'userId': this.currentUserId,
        'goodsId': this.list.id
      }
      const { data } = await this.$store.dispatch('isCollection', params)
      if (data.data > 0) {
        this.mywantId = data.data
        this.isCollected = true
      } else {
        this.isCollected = false
      }
    },
    onDetail () {
      this.$router.push(
        { path: '/detail', query: { goodsId: this.list.id } })
    },
    async contact (userId) {
      if (!this.isLogin) {
        this.$store.commit('setLoginDialog', true)
      } else if (this.currentUserId === userId) {
        this.$message.error('这是您自己发布的商品')
      } else {
        let params = {
          sendUserId: this.currentUserId,
          receiveUserId: userId,
          content: ''
        }
        const { data } = await this.$store.dispatch('seedMsg', params)
        if (data.code === 200) {
          this.$router.push('/user/chat')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#bs-product {
  transition: all .5s;
  min-width: 180px;
  &:hover {
    box-shadow: 1px 1px 20px #999;
    .chat {
      transition: bottom .25s ease;
      bottom: 0;
    }
    .sub-detail {
      display: none;
    }
  }
  .price {
    color: #ff002f;
  }
  .time {
  font-size: 13px;
  color: #999;
  text-align: right;
  float: right;
  border-top: 0.5px solid #e5e5e5;
  padding-top: 5px;
  padding-bottom: 5px;
  }
  .chat {
    color: #fff;
    line-height: 30px;
    bottom: -30px;
    left: 0;
    .contact {
      background: #11cd6e;
    }
  }
}
</style>
