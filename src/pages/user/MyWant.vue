<template>
  <div class="mywant p-20">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <div class="list-header"><span>时间：{{item.collectionTime}}</span></div>
        <div class="list-main p-10">
          <img class="f-l" :src="item.imageUrl !== null ? item.imageUrl : require('../../assets/images/default_picture.jpg')" :highUrl="item.imageUrl !== null ? item.imageUrl : require('../../assets/images/default_picture.jpg')" alt="">
          <div class="good-info f-l m-l-20">
            <div>{{item.name}}</div>
            <div class="price m-v-10">￥{{item.price}}</div>
          </div>
          <div class="operation f-r a-c">
            <div class="m-b-10"><el-button @click="onDetail(item.goodsId)" size="mini">查看详情</el-button></div>
            <div><el-button @click="deleteCollection(item.id)" size="mini">移除收藏</el-button></div>
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
    this.getCollectionList()
  },
  methods: {
    // 获取我的收藏
    async getCollectionList () {
      let params = {
        'userId': Number(localStorage.getItem('userId'))
      }
      const { data } = await this.$store.dispatch('getCollectionList', params)
      if (data.code === 200) {
        this.list = data.data
      } else {
        this.list = []
      }
    },
    // 移除收藏
    deleteCollection (id) {
      this.$confirm(`确定要移除收藏?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let params = {
          'id': id
        }
        const { data } = await this.$store.dispatch('deleteCollection', params)
        if (data.code === 200) {
          this.$message({
            message: '移除成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.getCollectionList()
            }
          })
        } else {
          this.$message({
            message: '移除失败',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    onDetail (goodsId) {
      this.$router.push(
        { path: '/detail', query: { goodsId: goodsId } }
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
