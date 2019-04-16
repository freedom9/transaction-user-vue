<template>
  <div>
    <div v-if="goodsList.length>0" class="list1 m-l-10 p-5">
			<bs-product :list="item" class="m-lv-5 m-b-10 b-o" v-for="(item, index) in goodsList" :key="index"></bs-product>
		</div>
		<div v-else class="a-c f-18">暂无数据</div>
		<el-pagination class="m-l-15" v-if="totalPage>pageSize"
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
      isFixed: false,
      goodsList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    }
  },
  computed: {
    keyword () {
      return this.$route.query.keyword
    }
  },
  watch: {
    'keyword': function (cur, old) {
      this.getGoodsList()
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表
    async getGoodsList () {
      let params = {
        'current': this.pageIndex,
        'pageSize': this.pageSize,
        'name': this.keyword,
        // 未下架
        'undercarriage': 0,
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
    }
  }
}
</script>

<style lang="scss">
.list1 {
  display: flex;
  flex-wrap: wrap;
  &.fixed {
    margin-left: 220px;
  }
}
</style>
