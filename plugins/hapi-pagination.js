const hapiPagination = require('hapi-pagination')

const options = {
  query: {
    page: {
      name: 'page',
      default: 1
    },
    limit: { // 页面的资源数量
      name: 'limit',
      default: 25
    },
    pagination:{ // 是否启用分页
      name: 'pagination',
      default: true
    },
    invalid: 'defaults' // This is NOT a query parameter, but it allows you to customize the behavior if the validation of limit and page fails
  },
  meta: {
    name: 'meta',
    // 返回的行数。默认名称为count
    count: {
      active: true,
      name: 'count'
    },
    // 可用的总行数。默认名称为totalCount
    totalCount: {
      active: true,
      name: 'totalCount'
    },
    // 可用页面总数。默认名称是pageCount
    pageCount: {
      active: true,
      name: 'pageCount'
    },
    // 指向所请求页面的链接。默认名称为self
    self: {
      active: true,
      name: 'self'
    },
    // 上一页的链接。默认名称是previous，默认情况下启用。如果没有可用的上一页，则返回null
    previous: {
      active: true,
      name: 'previous'
    },
    // 与之前相同，是下一页
    next: {
      active: true,
      name: 'next'
    },
    // 与之前相同，是第一页
    first: {
      active: true,
      name: 'first'
    },
    // 与之前相同，是最后一页
    last: {
      active: true,
      name: 'last'
    },
    // 请求的页码。默认名称是page，默认情况下禁用
    page: {
      active: false
      // name == default.query.page.name
    },
    // 请求的限制。默认名称是限制，默认情况下禁用
    limit: {
      active: false
      // name == default.query.limit.name
    }
  },
  results: {
    name: 'results'
  },
  reply: {
    paginate: 'paginate'
  },
  // 是否支持分页的接口 支持*和正则表达式
  routes: {
    // 包含
    include: ['/shops', '/shops/{shopId}/goods'],
    // 排除
    exclude: []
  }
}

module.exports = {
  register: hapiPagination,
  options
}