const Joi = require('joi')
const models = require('../models')

const GROUP_NAME = 'tips'

module.exports = [
  {
    method: 'POST',
    path: `/${GROUP_NAME}/getReminder`,
    handler: async (request, reply) => {
      const tips = await models.tips.findOne({
        where: {
          provinceCode: request.payload.provinceCode
        },
        attributes: ['tipsPro']
      })
      const { tipsPro } = tips.dataValues
      reply({
        reminder: tipsPro
      })
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取温馨提示',
      validate: {
        payload: {
          provinceCode: Joi.string().required().description('省编码').error(new Error('省code不能为空!'))
        }
      },
      auth: false
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/upReminder`,
    handler: async (request, reply) => {
      // request.payload.warmReminder
      await models.tips.update({
        tipsPro: request.payload.warmReminder
      }, {
        where: {
          provinceCode: request.payload.provinceCode
        }
      },{
        fields: ['tipsPro']
      }).then(() => {
        reply('SUCCESS')
      }).catch(() => {
        reply('Error')
      })
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '更新对应省份温馨提示语',
      validate: {
        payload: {
          provinceCode: Joi.string().required().description('省编码').error(new Error('省code不能为空!')),
          warmReminder: Joi.string().required().description('省编码').error(new Error('温馨提示语不能为空!'))
        }
      },
      auth: false
    }
  }
]