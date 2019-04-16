<template>
  <div>
    <div flex="box:first">
      <div>
        <div class="time m-b-10 f-15">发布于：{{list.releaseTime}}</div>
        <div class="w-300 h-300 m-r-50 b-o">
          <bs-picture :url="list.imageName !== null ? list.imageName : require('../../assets/images/default_picture.jpg')" :highUrl="list.imageName !== null ? list.imageName : require('../../assets/images/default_picture.jpg')" width="100px" height="100%" :outShow="true"></bs-picture>
        </div>
      </div>
      <div>
        <h3 class="m-v-30">{{list.name}}</h3>
        <div class="content f-14 p-v-10 p-l-20 w-500">
          <div>价 格<span class="price m-l-10 f-24">￥{{list.price}}</span></div>
          <div>原 价<span>￥{{list.originalPrice}}</span></div>
          <div>新旧程度<span class="m-l-10">{{list.degree}}</span></div>
          <div>数 量<span class="m-l-10">{{list.number}}</span></div>
          <el-form-item label="商品描述" prop="description">
            <el-input type="textarea" placeholder="商品描述">s's's's's's's's's's's</el-input>
          </el-form-item>
        </div>
        <div class="p-v-30">
          <el-button class="chat" @click="addCar">联系卖家</el-button>
          <el-button @click="saveCollection()">
            <bs-icon name="collection" size="15"/>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: {}
    }
  },
  computed: {
    goodsId () {
      return this.$route.query.goodsId
    }
  },
  created () {
    this.getGoodsInfo()
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
    async getGoodsInfo () {
      let params = {
        id: this.goodsId
      }
      const {data} = await this.$store.dispatch('getGoodsInfo', params)
      if (data && data.code === 200) {
        this.list = data.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
  color: #999;
}
.content {
  color: #999;
  .price {
    color: #E4393C;
  }
}
.chat {
  background: #11cd6e;
  color: #fff;
}
</style>
