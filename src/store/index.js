import Vue from 'vue'
import Vuex from 'vuex'
import api from '../global/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginDialog: false,
    isLogin: false,
    stomp: null
  },
  mutations: {
    setLoginDialog (state, params) {
      state.loginDialog = params
    },
    setIsLogin (state, params) {
      state.isLogin = params
    }
  },
  actions: {
    // 用户相关操作
    login (context, params) {
      return api.login(params)
    },
    register (context, params) {
      return api.register(params)
    },
    logout (context, params) {
      return api.logout(params)
    },
    getUserInfo (context, params) {
      return api.getUserInfo(params)
    },
    updateUser (context, params) {
      return api.updateUser(params)
    },

    // 商品相关操作
    getGoodses (context, params) {
      return api.getGoods(params)
    },
    getGoodstype (context, params) {
      return api.getGoodstype(params)
    },
    publish (context, params) {
      return api.publish(params)
    },
    updateGoods (context, params) {
      return api.updateGoods(params)
    },
    getGoodsInfo (context, params) {
      return api.getGoodsInfo(params)
    },
    upload (context, params) {
      return api.upload(params)
    },
    undercarriage (context, params) {
      return api.undercarriage(params)
    },

    // 收藏相关操作
    getCollectionList (context, params) {
      return api.getCollectionList(params)
    },
    saveCollection (context, params) {
      return api.saveCollection(params)
    },
    deleteCollection (context, params) {
      return api.deleteCollection(params)
    },
    isCollection (context, params) {
      return api.isCollection(params)
    },

    // 消息相关操作
    selectUsersByUserId (context, params) {
      return api.selectUsersByUserId(params)
    },
    msgListByTwoId (context, params) {
      return api.msgListByTwoId(params)
    },
    seedMsg (context, params) {
      return api.seedMsg(params)
    }
  }
})
