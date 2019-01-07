const Hapi = require('hapi')
const chalk = require('chalk')
const hapiAuthJWT2 = require('hapi-auth-jwt2')
// eslint-disable-next-line
const log = console.log

const config = require('./config')

// 引入自定义的插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger')
const pluginHapiPagination = require('./plugins/hapi-pagination')
const pluginsHapiAuthJWT2 =  require('./plugins/hapi-auth-jwt2')
const pluginsHapiGood = require('./plugins/hapi-good')

// 接口地址
const routesHelloHapi = require('./routes/hello-hapi')
const routesShops = require('./routes/shops')
const routesOrders = require('./routes/orders')
const routesUsers = require('./routes/users')

const server = new Hapi.Server()

server.connection({
  port: config.port,
  host: config.host
})

const init = async () => {
  // 注册插件
  await server.register([
    ...pluginHapiSwagger,
    pluginHapiPagination,
    hapiAuthJWT2,
    pluginsHapiGood
  ])
  pluginsHapiAuthJWT2(server)
  server.route([
    // 创建一个简单的 hello hapi 接口
    ...routesHelloHapi,
    ...routesShops,
    ...routesOrders,
    ...routesUsers
  ])
  // 启动服务
  await server.start()
  log(chalk.yellow(`Server is running at: ${server.info.uri}`))
}

init()