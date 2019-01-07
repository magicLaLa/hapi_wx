/* global process */
const myLocalIp = require('my-local-ip')()
require('env2')('./.env')

const { env } = process

module.exports = {
  // 配置服务器启动 host 端口
  port: env.PORT,
  host: myLocalIp,
  // JWT 密钥
  jwtSecret: env.JWT_SECRET,
  wxAppid: env.WX_APPID,
  wxSecret: env.WX_SECRET,
  wxMchid: env.WX_MCHID,
  wxPayApiKey: env.WX_PAY_API_KEY
}