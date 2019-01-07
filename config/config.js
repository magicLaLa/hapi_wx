const env2 = require('env2')

// eslint-disable-next-line
if (process.env.NODE_ENV === 'production') {
  env2('./.env.prod')
} else {
  env2('./.env')
}

// eslint-disable-next-line
const { env } = process

module.exports = {
  development: {
    username: 'myLoc',
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DB_NAME,
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    dialect: 'mysql',
    define: {
      charset: 'utf8'
    },
    operatorsAliases: false // 此参数为自行追加，解决高版本 sequelize 连接警告
  },
  production: {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DB_NAME,
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    dialect: 'mysql',
    operatorsAliases: false // 此参数为自行追加，解决高版本 sequelize 连接警告
  }
}

/**
 * 由于 sequelize-cli 自动生成的配置 config/config.js 
 * 中为了兼容老版本模式，并未显式将 operatorsAliases 的
 * 映射关系给关闭，所以，会收到一条运行警告 
 * sequelize deprecated String based operators are now deprecated ...。
 * 官方明确指出 ne, not, in, notIn, gte, gt, lte, lt, 
 * like, ilike, $ilike, nlike, $notlike, notilike, .., 
 * between, !.., notbetween, nbetween, overlap, &&, @>, <@ 
 * 这些映射操作符，将在未来的版本被移除。如果希望遵循官方未来
 * 更倾向的操作符使用方式，则可以将之设为 false 。
 */