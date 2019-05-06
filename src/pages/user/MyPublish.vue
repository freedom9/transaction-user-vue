<template>
  <div class="mywant p-20">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <div class="list-header">
          <span>时间：{{item.releaseTime}}</span>
          <span v-if="item.auditStatus === 0" class="price m-lv-10">审核中</span>
          <span v-else-if="item.auditStatus === 1" class="price m-lv-10">审核通过</span>
          <span v-else-if="item.auditStatus === 2" class="price m-lv-10">审核不通过</span>
        </div>
        <div class="list-main p-10">
          <img class="f-l" :src="item.imageUrl !== null ? item.imageUrl : require('../../assets/images/default_picture.jpg')" :highUrl="item.imageUrl !== null ? item.imageUrl : require('../../assets/images/default_picture.jpg')" alt="">
          <div class="good-info f-l m-l-20">
            <div>{{item.name}}</div>
            <div class="price m-v-10">￥{{item.price}}</div>
          </div>
          <div class="operation f-r a-c">
            <div class="m-b-10"><el-button @click="updateGoods(item.id)" size="mini">修改商品信息</el-button></div>
            <div>
              <el-button v-if="item.auditStatus === 1 && item.undercarriage === 0" @click="undercarriage(item.id, item.undercarriage)" size="mini">下架商品</el-button>
              <el-button v-if="item.auditStatus === 1 && (item.undercarriage === 2 || item.undercarriage === 1)" @click="undercarriage(item.id, item.undercarriage)" size="mini">上架商品</el-button>
              <el-button v-if="item.auditStatus === 2" @click="rePublish(item.id)" size="mini">重新发布</el-button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: Object
    }
  },
  created () {
    this.getMyPublish()
  },
  methods: {
    // 获取我发布的列表
    async getMyPublish () {
      let params = {
        'userId': Number(localStorage.getItem('userId')),
        'pageSize': 10000
      }
      const { data } = await this.$store.dispatch('getGoodses', params)
      if (data.total > 0) {
        this.list = data.records
      } else {
        this.list = []
      }
    },
    // 商品上下架
    undercarriage (id, undercarriage) {
      if (undercarriage === 1) {
        this.$message({
          message: '有不符合条件的信息，请修改好再重新发布',
          type: 'error',
          duration: 1000
        })
      } else {
        this.$confirm(`确定${undercarriage === 0 ? '商品下架' : '商品上架'}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let params = {
            'id': id,
            'undercarriage': undercarriage === 0 ? 2 : 0
          }
          const { data } = await this.$store.dispatch('undercarriage', params)
          if (data.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getMyPublish()
              }
            })
          } else {
            this.$message({
              message: '操作失败',
              type: 'error',
              duration: 1000
            })
          }
        })
      }
    },
    // 重新发布
    async rePublish (id) {
      let params = {
        'id': id,
        'auditStatus': 0
      }
      const { data } = await this.$store.dispatch('updateGoods', params)
      if (data.code === 201) {
        this.$message({
          message: '重新发布成功',
          type: 'success',
          duration: 1000,
          onClose: () => {
            this.getMyPublish()
          }
        })
      } else {
        this.$message({
          message: '重新发布失败',
          type: 'error',
          duration: 1000
        })
      }
    },
    updateGoods (id) {
      this.$router.push(
        { path: '/publish', query: {goodsId: id} }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.mywant {
  ul li {
    background-color: #fff;
    border: #e5e5e5 solid 1px;
    margin-bottom: 20px;
    overflow: hidden;
    .list-main {
      overflow: hidden;
      img {
        width: 100px;
        height: 100px;
        border: #e5e5e5 solid 1px;
      }
      .operation {
        width: 150px;
        border-left: #e5e5e5 solid 1px;
        height: 70px;
        padding: 15px 0;
      }
    }
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      border-bottom: #e5e5e5 solid 1px;
    }
    .price {
    color: #ff002f;
    }
  }
}
</style>
