const Joi = require('joi')
const models = require('../models')
const { paginationDefine } = require('../utils/router-helper')

const GROUP_NAME = 'shops'

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      /**
       * 考虑到分页的查询功能除了拉取列表外，还要获取总条目数，
       * Sequelize 为我们提供了 findAndCountAll 的 API，
       * 来为分页查询提供更高效的封装实现，返回的列表与总条数
       * 会分别存放在 rows 与 count 字段的对象中
       */
      const { rows: results, count: totalCount } = await models.shops.findAndCountAll({
        attributes: [
          'id',
          'name'
        ],
        limit: request.query.limit,
        offset: (request.query.page - 1) * request.query.limit
      })
      // 开启分页的插件，返回的数据结构里，需要带上 results 与 totalCount 两个字段
      reply({ results, totalCount })
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺列表',
      // 适用于 GET 接口的 query（URL 路径参数）
      validate: {
        query: {
          ...paginationDefine
        }
      },
      auth: false
    }
  },
  {
    method: 'GET',
    path: `/${GROUP_NAME}/{shopId}/goods`,
    handler: async (request, reply) => {
      // 增加带有 where 的条件查询
      const { rows: results, count: totalCount } = await models.goods.findAndCountAll({
        // 基于 shop_id 的条件查询
        where: {
          shop_id: request.params.shopId
        },
        attributes: [
          'id',
          'name',
          'shop_id',
          'created_at',
          'updated_at'
        ],
        limit: request.query.limit,
        offset: (request.query.page - 1) * request.query.limit
      })
      reply({ results, totalCount })
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺商品列表',
      validate: {
        params: {
          shopId: Joi.string().required().description('店铺id')
        },
        query: {
          ...paginationDefine
        }
      },
      auth: false
    }
  }
]