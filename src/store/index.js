import Vue from 'vue'
import Vuex from 'vuex'
import api from '../global/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginDialog: false,
    isLogin: false
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
    login (context, params) {
      return api.login(params)
    },
    register (context, params) {
      return api.register(params)
    },
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
    logout (context, params) {
      return api.logout(params)
    },
    getGoodsInfo (context, params) {
      return api.getGoodsInfo(params)
    },
    upload (context, params) {
      return api.upload(params)
    },
    saveCollection (context, params) {
      return api.saveCollection(params)
    }
  }
})
