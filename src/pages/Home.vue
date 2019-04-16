<template>
  <div>
    <div flex="box:first">
      <div class="menu p-r" :class="{'fixed': isFixed}">
        <div class="menu-item p-l-10 b-b w-200 bg-white" v-for="(i, index) in goodsTypeList" :key="index">
          <div @click="select(i.id)" class="menu-item-head" flex="main:justify cross:center">
            <span>{{i.name}}</span>
          </div>
        </div>
      </div>
      <div v-if="goodsList.length>0" class="list1 m-l-10 p-5" :class="{'fixed': isFixed}">
        <bs-product :list="item" class="m-lv-5 m-b-10 b-o" v-for="(item, index) in goodsList" :key="index"></bs-product>
      </div>
      <div v-else class="a-c f-18">暂无数据</div>
    </div>
    <el-pagination class="m-l-230" v-if="totalPage>pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="totalPage"
      :background="true">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
        typeId: ''
      },
      isFixed: false,
      goodsTypeList: [],
      goodsList: [],
      pageIndex: 1,
      pageSize: 20,
      totalPage: 0
    }
  },
  created () {
    this.getGoodstypeList()
    this.getGoodsList()
  },
  methods: {
    // 获取商品类型列表
    async getGoodstypeList () {
      const { data } = await this.$store.dispatch('getGoodstype')
      if (data.code === 200) {
        this.goodsTypeList = data.data
        this.goodsTypeList.unshift({ id: null, name: '全部分类' })
      } else {
        this.goodsTypeList = []
      }
    },
    // 获取商品列表
    async getGoodsList () {
      let params = {
        'current': this.pageIndex,
        'pageSize': this.pageSize,
        // 未下架
        'undercarriage': 0,
        'typeId': this.dataForm.typeId,
        // 审核通过
        'auditStatus': 1
      }
      const { data } = await this.$store.dispatch('getGoodses', params)
      if (data.total > 0) {
        data.records.forEach(element => {
          let current = new Date().getTime()
          let pretime = new Date(element.releaseTime).getTime()
          element.day = Math.ceil((current - pretime) / (24 * 60 * 60 * 1000))
        })
        this.goodsList = data.records
        this.totalPage = data.total
      } else {
        this.goodsList = []
        this.totalPage = 0
      }
    },
    // 搜索
    select (val) {
      this.dataForm.typeId = val
      this.getGoodsList()
    },
    // 每页数
    handleSizeChange (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getGoodsList()
    },
    // 当前页
    handleCurrentChange (val) {
      this.pageIndex = val
      this.getGoodsList()
    },
    navFixed () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop >= 100
    }
  },
  mounted () {
    window.addEventListener('scroll', this.navFixed)
  }
}
</script>

<style lang="scss">
.menu {
  border-radius: 5px;
  &.fixed {
    position: fixed;
    top: 100px;
    left: 120px;
  }
  .menu-item {
    &:hover {
      color: #11cd6e;
    }
    .menu-item-head {
      height: 50px;
    }
    .menu-item-body {
      width: 800px;
      height: 400px;
      border-left: 1px solid #999;
      box-shadow: 4px 0px 10px #999;
      background: #fff;
      opacity: 0.8;
      z-index: 999;
      display: none;
      top: 0;
      left: 200px;
    }
  }
}
.el-carousel {
  width: 900px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.list1 {
  display: flex;
  flex-wrap: wrap;
  &.fixed {
    margin-left: 220px;
  }
}
</style>
