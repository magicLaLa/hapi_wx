const Joi = require('joi')
/**
 * 公共的分页入参校验配置
 */
const paginationDefine = {
  limit: Joi.number().integer().min(1).default(10).description('每页条数'),
  // error(new Error('页码数不能为0！'))  显示的错误信息为中文（message）
  page: Joi.number().integer().min(1).default(1).description('页码数').error(new Error('页码数不能为0且必须为整数！')),
  pagination: Joi.boolean().default(true).description('是否开启分页，默认为true')
}
/**
 * 公共JWT验证
 * authorization
 */
const jwtHeaderDefine = {
  headers: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}

module.exports = {
  paginationDefine,
  jwtHeaderDefine
}