const chalk = require('chalk')
const { jwtHeaderDefine } = require('../utils/router-helper')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      /*
        plugins/hapi-auth-jwt2.js 中的 credentials 定义
        const credentials = {
          userId,
        };
      */

      let credentials = JSON.stringify(request.auth.credentials)
      console.log(chalk.bgMagenta(`credentials${credentials}`))
      reply('Hello Hapi')
    },
    config: {
      tags: ['api', 'test'],
      description: '测试hello-hapi',
      validate: {
        ...jwtHeaderDefine
      }
    }
  }
]