const JWT = require('jsonwebtoken')
const Joi = require('joi')
const axios = require('axios')
const chalk = require('chalk')
// eslint-disable-next-line
const log = console.log

const config = require('../config')
const models = require('../models')
const decryptData = require('../utils/decrypt-data')

const GROUP_NAME = 'users'

module.exports = [
  {
    method: 'POST',
    path: `/${GROUP_NAME}/createJWT`,
    handler: async (request, reply) => {
      const generateJWT = (jwtInfo) => {
        const payload = {
          userId: jwtInfo.userId,
          // +new Date === new Date().getTime()
          exp: Math.floor(+new Date() / 1000) + 7 * 24 * 60 * 60
        }
        return JWT.sign(payload, config.jwtSecret)
      }
      reply(generateJWT({
        userId: 1
      }))
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '测试用户JWT签发',
      // 约定此接口不参与 JWT 的用户验证，会结合下面的 hapi-auth-jwt 来使用
      auth: false
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/wxLogin`,
    handler: async (req, reply) => {
      const appId = config.wxAppid
      const secret = config.wxSecret
      const { code, encryptedData, iv } = req.payload
      // 获取 openid 与 session_key
      let response = ''
      try {
        response = await axios({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          method: 'GET',
          params: {
            appId,
            secret,
            js_code: code,
            grant_type: 'authorization_code',
          }
        })
      } catch (err) {
        throw new Error(err)
      }
      log(chalk.bgBlue('response', JSON.stringify(response.data)))

      const { openid, session_key: sessionKey } = response.data

      // 基于 openid 查找或创建一个用户
      const user = await models.users.findOrCreate({
        where: {
          open_id: openid
        }
      })

      // decrypt 解码用户信息
      const userInfo = decryptData(encryptedData, iv, sessionKey, appId)
      log(chalk.bgMagenta(userInfo))
      // 更新 users 表中的用户资料信息
      await models.users.update({
        nick_name: userInfo.nickName,
        gender: userInfo.gender,
        avatar_url: userInfo.avatarUrl,
        open_id: openid,
        session_key: sessionKey
      }, {
        where: {
          open_id: openid
        }
      })

      // 签发 JWT
      const generateJWT = (jwtInfo) => {
        const payload = {
          userId: jwtInfo.userId,
          exp: Math.floor(+new Date() / 1000) + 7 * 24 * 60 * 60
        }
        return JWT.sign(payload, config.jwtSecret)
      }
      reply(generateJWT({
        userId: user[0].id
      }))
    },
    config: {
      // 不需要用户验证
      auth: false,
      // 注册 swagger 文档
      tags: ['api', GROUP_NAME],
      description: '微信小程序用户登录',
      validate: {
        payload: {
          code: Joi.string().required().description('微信用户登录的临时code'),
          encryptedData: Joi.string().required().description('微信用户信息encryptedData'),
          iv: Joi.string().required().description('微信用户信息iv')
        }
      }
    }
  }
]