<template>
  <div>
    <div class="bg-white p-t-20 p-b-80 p-lv-20" flex="box:first">
      <div>
        <div class="content m-b-10 f-15">发布于：{{list.releaseTime}}</div>
        <div class="w-300 h-300 m-r-50 b-o">
          <bs-picture :url="list.imageUrl !== null ? list.imageUrl : require('../../assets/images/default_picture.jpg')" :highUrl="list.imageUrl !== null ? list.imageUrl : require('../../assets/images/default_picture.jpg')" width="100px" height="100%" :outShow="true"></bs-picture>
        </div>
      </div>
      <div>
        <h3 class="m-v-30">{{list.name}}</h3>
        <div class="content f-15 p-v-10 w-500">
          <div class="m-b-15">
            <span>价 格</span>
            <span class="price m-l-37 f-20">￥{{list.price}}</span>
          </div>
          <div class="m-b-15">
            <span>原 价</span>
            <span class="old-price m-l-37">￥{{list.originalPrice}}</span>
          </div>
          <div class="m-b-15">
            <span>新旧程度</span>
            <span class="m-l-15">{{list.degree}}</span>
          </div>
          <div class="m-b-15">
            <span>数 量</span>
            <span class="m-l-38">{{list.number}}</span>
          </div>
          <div class="m-b-15">
            <span>商品描述</span>
            <span class="m-l-15">{{list.description}}</span>
          </div>
        </div>
        <div class="p-v-20">
          <el-button class="chat" @click="contact(list.userId)" :disabled="currentUserId === list.userId">联系卖家</el-button>
          <el-button :disabled="currentUserId === list.userId" @click="!isCollected ? saveCollection() : deleteCollection()">
            <bs-icon v-if="!isCollected" name="collection1" size="15"/>
            <bs-icon v-else name="collection2" size="15"/>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      list: {},
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
    },
    goodsId () {
      return this.$route.query.goodsId
    }
  },
  created () {
    this.getGoodsInfo()
    if (this.isLogin) {
      this.isCollection()
    }
  },
  methods: {
    async contact (userId) {
      if (!this.isLogin) {
        this.$store.commit('setLoginDialog', true)
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
    },
    // 保存收藏
    async saveCollection () {
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
    },
    // 移除收藏
    async deleteCollection (id) {
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
    },
    // 获取商品信息
    async getGoodsInfo () {
      let params = {
        id: this.goodsId
      }
      const {data} = await this.$store.dispatch('getGoodsInfo', params)
      if (data && data.code === 200) {
        this.list = data.data
      }
    },
    // 查找是否与收藏
    async isCollection () {
      let params = {
        'userId': this.currentUserId,
        'goodsId': this.goodsId
      }
      const { data } = await this.$store.dispatch('isCollection', params)
      if (data.data > 0) {
        this.mywantId = data.data
        this.isCollected = true
      } else {
        this.isCollected = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  color: #999;
  .price {
    color: #E4393C;
  }
  .old-price {
    text-decoration: line-through;
    text-decoration-line: line-through;
    text-decoration-style: initial;
    text-decoration-color: initial;
}
}
.chat {
  background: #11cd6e;
  color: #fff;
}
</style>
