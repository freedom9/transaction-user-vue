import conn from './conn.js'

const request = (method, url, data, config) => {
  data = { ...data, ...config }
  return conn.request({ method, url, data }).then((data) => ({ data })).catch((error) => ({ error })) // { data: data }
}

export default {
  // 登录
  login: (params = {}, config = {}) => request('post', '/api/sys/login', params, config),
  // 注册
  register: (params = {}, config = {}) => request('post', '/api/sys/users', params, config),
  // 获取商品列表
  getGoods: (params = {}, config = {}) => request('get', '/api/goodses', params, config),
  // 获取商品类型列表
  getGoodstype: (params = {}, config = {}) => request('get', '/api/goodstype', params, config),
  // 发布二手商品
  publish: (params = {}, config = {}) => request('post', '/api/goodses', params, config),
  // 修改商品
  updateGoods: (params = {}, config = {}) => request('patch', '/api/goodses/{id}', params, config),
  // 获取商品详情
  getGoodsInfo: (params = {}, config = {}) => request('get', `/api/goodses/${params.id}`, {}, config),
  // 退出
  logout: (params = {}, config = {}) => request('post', 'api/sys/logout', params, config),
  // 上传图片
  upload: (params = {}, config = {}) => request('post', '/api/image/upload', params, config),
  // 增加收藏
  saveCollection: (params = {}, config = {}) => request('post', '/api/goodses/mywant', params, config)
}
