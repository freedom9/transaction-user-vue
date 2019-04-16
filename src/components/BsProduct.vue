<template>
  <div id="bs-product" class="w-195 h-260 p-5 p-r o-h bg-white">
    <div @click="onDetail()" class="h-200 w-195 c-p"><img width="100%" height="100%" :src="list.imageName !== null ? list.imageName : require('../assets/images/default_picture.jpg')" alt=""></div>
    <p class="sub-detail f-12">{{list.name}}</p>
    <div>
      <span class="price">￥{{list.price}}</span>
      <span class="time">发布于{{list.day}}天前</span>
    </div>
    <div class="chat c-p p-a a-c w-p-100 h-30">
      <div class="contact w-p-70 f-l">联系卖家</div>
      <bs-icon @click="saveCollection()" name="collection" size="20"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Object
  },
  methods: {
    async saveCollection () {
      let params = {
        'userId': Number(localStorage.getItem('userId')),
        'goodsId': this.list.id
      }
      const { data } = await this.$store.dispatch('saveCollection', params)
      if (data.code === 200) {
        this.$message({
          message: '收藏成功',
          type: 'success',
          duration: 1000
        })
      } else {
        this.$message.error(data.msg)
      }
    },
    onDetail () {
      this.$router.push(
        { path: '/detail', query: { goodsId: this.list.id } })
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
