/**
 * API列表，建议最多两层嵌套
 *
 * url值的格式为 String/Object
 * String: url的值
 * Object：{ // axios config options
 *  url: '',
 *  method: '',// get/post/put/delete, 为URL的请求方法，不写默认为post
 *  baseUrl: ''
 * }
 */
export default {
  // 系统当前登录的用户信息相关接口
  user: {
    getDetail: {
      url: '/modules/user/getDetail',
      method: 'get',
    },
  },

  // 总览页面相关接口
  general: {
    getDetail: {
      url: '/modules/general/detail',
      method: 'get',
    },
  },

  // 这里只是列表demo页面用来mock的数据接口配置，
  // 对于新增的列表类型页面，建议新增一个层级的接口配置
  table: {
    getTableList: {
      url: '/modules/table/list',
      method: 'get',
    },
    addItem: '/modules/boolean/true',
    deleteItem: '/modules/boolean/true',
    updateItem: '/modules/boolean/true',
  }
};
