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
  // 退出
  logout: (params = {}, config = {}) => request('post', '/api/sys/logout', params, config),
  // 获取个人信息
  getUserInfo: (params = {}, config = {}) => request('get', `/api/sys/users/${params.id}`, {}, config),
  // 修改个人信息
  updateUser: (params = {}, config = {}) => request('patch', `/api/sys/users/${params.id}`, params, config),

  // 获取商品列表
  getGoods: (params = {}, config = {}) => request('get', '/api/goodses', params, config),
  // 获取商品类型列表
  getGoodstype: (params = {}, config = {}) => request('get', '/api/goodstype', params, config),
  // 发布二手商品
  publish: (params = {}, config = {}) => request('post', '/api/goodses', params, config),
  // 修改商品
  updateGoods: (params = {}, config = {}) => request('patch', `/api/goodses/${params.id}`, params, config),
  // 获取商品详情
  getGoodsInfo: (params = {}, config = {}) => request('get', `/api/goodses/${params.id}`, {}, config),
  // 上传图片
  upload: (params = {}, config = {}) => request('post', '/api/image/upload', params, config),
  // 商品上下架
  undercarriage: (params = {}, config = {}) => request('get', '/api/goodses/undercarriage', params, config),

  // 获取收藏列表
  getCollectionList: (params = {}, config = {}) => request('get', '/api/goodses/mywant/list', params, config),
  // 增加收藏
  saveCollection: (params = {}, config = {}) => request('post', '/api/goodses/mywant', params, config),
  // 删除收藏
  deleteCollection: (params = {}, config = {}) => request('get', '/api/goodses/mywant/delete', params, config),
  // 查询是否已收藏
  isCollection: (params = {}, config = {}) => request('get', '/api/goodses/mywant/isCollection', params, config),

  // 查询聊天用户
  selectUsersByUserId: (params = {}, config = {}) => request('get', `/api/messages/users/${params.userId}`, {}, config),
  // 根据发送人id和接收人id查询消息列表
  msgListByTwoId: (params = {}, config = {}) => request('get', '/api/messages/byTwoId', params, config),
  // 发送消息
  seedMsg: (params = {}, config = {}) => request('post', '/api/messages', params, config)

}
