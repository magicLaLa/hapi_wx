# Hapi

## Hapi 使用和开发

### Hapi 框架模块接口文档

* [Hapi](https://hapijs.com/api)

### Supervisor / nodemon / PM2

* 有不少 Node.js 小工具能帮助我们监视代码的改动然后自动重启 Node.js 服务，好用的工具有 `Supervisor / nodemon / PM2`。

```bash
# 系统全局安装 supervisor
$ npm i -g supervisor
```

### 目录结构

```bash
├── config                       # 项目配置目录
|   ├── index.js                 # 配置项目中的配置信息
├── models                       # 数据库 model
├── node_modules                 # node.js 的依赖目录
├── plugins                      # 插件目录
├── routes                       # 路由目录
│   ├── hello-world.js           # 测试接口 hello-world
├── utils                        # 工具类相关目录
├── app.js                       # 项目入口文件
├── package.json                 # JS 项目工程依赖库
├── README.md                    # 项目工程如何被使用的说明手册
```

### 环境配置

* 例子：

```bash
# .env.example

# 服务的启动名字和端口，但也可以缺省不填值，默认值的填写只是一定程度减少起始数据配置工作
HOST = 127.0.0.1
PORT = 3000
```

### 读取 .env 中的配置值

* Node.js 可以通过 env2 的插件，来读取 .env 配置文件，加载后的环境配置参数，可以通过例如 process.env.PORT 来读取端口信息。

```bash
npm i env2 -D
```

### 使用 Swagger 插件配置接口文档

#### 安装基础依赖与基础插件配置

```bash
# 安装适配 hapi v16 的 swagger 插件
npm i hapi-swagger@7
npm i inert@4
npm i vision@4
npm i package
```

```bash
├── plugins                       # hapi 插件配置
|   ├── hapi-swagger.js           # swagger 插件
```

* 通过 __自己的服务地址+/documentation__ 来查看 Swagger 文档。*http://192.168.31.10:8181/documentation*

### 使用 Joi 校验数据结构

```bash
# 安装适配 hapi v16 的 joi 插件
npm i joi@13
```

### MySQL修改默认编码

* `show variables like '%char%';` 查看默认编码

```bash
mysql> show variables like '%char%';
+--------------------------+---------------------------------------------------------+
| Variable_name            | Value                                                   |
+--------------------------+---------------------------------------------------------+
| character_set_client     | gbk                                                     |
| character_set_connection | gbk                                                     |
| character_set_database   | utf8                                                    |
| character_set_filesystem | binary                                                  |
| character_set_results    | gbk                                                     |
| character_set_server     | utf8                                                    |
| character_set_system     | utf8                                                    |
| character_sets_dir       | C:\Program Files\MySQL\MySQL Server 5.7\share\charsets\ |
+--------------------------+---------------------------------------------------------+
8 rows in set, 1 warning (0.00 sec)
```

* 修改mysql编码，（version：5.7.24）Window10下 `my.ini`文件路径在 `C:\ProgramData\MySQL\MySQL Server 5.7\`

* 在my.ini添加如下：

```ini
[mysqld]
character-set-server=utf8
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```

### MySQL 与 Sequelize

* 数据库为 MySQL 5.6。[Sequelize](https://sequelize.readthedocs.io/en/v3/) 则是 Node.js 生态中一款知名的基于 promise 数据库 ORM 插件，提供了大量常用数据库增删改查的函数式 API，以帮助我们在实际开发中，大量减少书写冗长的基础数据库查询语句。
* Sequelize 支持的数据库有：`PostgreSQL，MySQL，MariaDB，SQLite 和 MSSQL。`在使用不同的数据库时候，需要我们开发者额外安装不同的对应数据库连接驱动，d当前使用的 MySQL，则依赖于插件 MySQL2 。

```bash
# MySQL 连接
[root@vultr ~]# mysql -u root -p
Enter password: *******

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 3
Server version: 5.7.22 MySQL Community Server (GPL)

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

# 查看数据库编码格式
mysql> show variables like '%char%';
+--------------------------+---------------------------------------------------------+
| Variable_name            | Value                                                   |
+--------------------------+---------------------------------------------------------+
| character_set_client     | utf8                                                    |
| character_set_connection | utf8                                                    |
| character_set_database   | latin1                                                  |
| character_set_filesystem | binary                                                  |
| character_set_results    | utf8                                                    |
| character_set_server     | latin1                                                  |
| character_set_system     | utf8                                                    |
| character_sets_dir       | C:\Program Files\MySQL\MySQL Server 5.7\share\charsets\ |
+--------------------------+---------------------------------------------------------+
8 rows in set, 1 warning (0.00 sec)

# 创建用户
# 说明：
# username：你将创建的用户名
# host：指定该用户在哪个主机上可以登陆，如果是本地用户可用localhost，如果想让该用户可以从任意远程主机登陆，可以使用通配符%
# password：该用户的登陆密码，密码可以为空，如果为空则该用户可以不需要密码登陆服务器
mysql> CREATE USER 'username'@'host' IDENTIFIED BY 'password';

# 授权
# 说明:
# privileges：用户的操作权限，如SELECT，INSERT，UPDATE等，如果要授予所的权限则使用ALL
# databasename：数据库名
# tablename：表名，如果要授予该用户对所有数据库和表的相应操作权限则可用*表示，如*.*
# 例子：
# GRANT SELECT, INSERT ON test.user TO 'pig'@'%';
# GRANT ALL ON *.* TO 'pig'@'%';
mysql> GRANT privileges ON databasename.tablename TO 'username'@'host';
# 注意:用以上命令授权的用户不能给其它用户授权，如果想让该用户可以授权，用以下命令:
mysql> GRANT privileges ON databasename.tablename TO 'username'@'host' WITH GRANT OPTION;

# 设置与更改用户密码
mysql> SET PASSWORD FOR 'username'@'host' = PASSWORD('newpassword');
# 如果是当前登陆用户用:
mysql> SET PASSWORD = PASSWORD("newpassword");

# 撤销用户权限
# 说明：说明:privilege, databasename, tablename：同授权部分
# 注意：
# 假如你在给用户'pig'@'%'授权的时候是这样的（或类似的）：GRANT SELECT ON test.user TO 'pig'@'%'，则在使用REVOKE SELECT ON *.* FROM 'pig'@'%';命令并不能撤销该用户对test数据库中user表的SELECT 操作。相反，如果授权使用的是GRANT SELECT ON *.* TO 'pig'@'%';则REVOKE SELECT ON test.user FROM 'pig'@'%';命令也不能撤销该用户对test数据库中user表的Select权限。
# 具体信息可以用命令SHOW GRANTS FOR 'pig'@'%'; 查看
mysql> REVOKE privilege ON databasename.tablename FROM 'username'@'host';

# 删除用户
mysql> DROP USER 'username'@'host';
```

#### Sequelize-cli

* Sequelize 插件的主要应用场景是实际应用开发过程中的代码逻辑层。与其相伴的还有一套 cli 工具，Sequelize-cli，提供了一系列好用的终端指令，来帮助我们完成一些常用的琐碎任务。

* 安装依赖

```bash
npm i sequelize-cli -D
npm i sequelize
npm i mysql2
```

* sequelize init (通过 sequelize-cli 初始化 sequelize，我们将得到一个好用的初始化结构：)

```bash
# windows下
node_modules\.bin\sequelize init
```

```
├── config                       # 项目配置目录
|   ├── config.[json|js]              # 数据库连接的配置
├── models                       # 数据库 model
|   ├── index.js                 # 数据库连接的样板代码
├── migrations                   # 数据迁移的目录
├── seeders                      # 数据填充的目录
```

* sequelize db:create

执行下面的命令，可以默认使用 development 下的配置，来创建项目数据库。增加例如 --env production，则使用 config/config.js 中的 production 项配置，来完成数据库的创建。

```bash
node_modules\.bin\sequelize db:create

# 通过 --env 参数，指定为生产环境创建项目数据库
# node_modules\.bin\sequelize db:create --env production
```

### migrate 数据迁移

* sequelize migration:create *使用 sequelize migration:create 来创建一个迁移文件 create-shops-table。*

```bash
node_modules\.bin\sequelize migration:create --name create-shops-table
```

* sequelize db:migrate *帮助将 migrations 目录下的迁移行为定义，按时间戳的顺序，逐个地执行迁移描述，最终完成数据库表结构的自动化创建。并且，在数据库中会默认创建一个名为 SequelizeMeta 的表，用于记录在当前数据库上所运行的迁移历史版本。*

```bash
node_modules\.bin\sequelize db:migrate
```

```bash
mysql> show tables;
+---------------------+
| Tables_in_practtest |
+---------------------+
| goods               |
| sequelizemeta       |
| shops               |
+---------------------+
3 rows in set (0.00 sec)
```

* sequelize db:migrate:undo *sequelize db:migrate:undo 则可以帮助我们按照 down 方法中所定义的规则，回退一个数据库表结构迁移的状态。`node_modules\.bin\sequelize db:migrate:undo`*

* 向表中追加字段 *创建一个名叫 add-columns-to-shops-table 的迁移迁移文件：`node_modules\.bin\sequelize migration:create --name add-columns-to-shops-table`*

```js
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('shops', 'address', { type: Sequelize.STRING }),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('shops', 'address'),
  ]),
};
```

```bash
# 之前的表结构
mysql> desc shops;
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | int(11)      | NO   | PRI | NULL    | auto_increment |
| name       | varchar(255) | NO   |     | NULL    |                |
| thumb_url  | varchar(255) | YES  |     | NULL    |                |
| created_at | datetime     | YES  |     | NULL    |                |
| updated_at | datetime     | YES  |     | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)
```

```bash
# 再次运行完 node_modules\.bin\sequelize db:migrate 后的表结构
mysql> desc shops;
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | int(11)      | NO   | PRI | NULL    | auto_increment |
| name       | varchar(255) | NO   |     | NULL    |                |
| thumb_url  | varchar(255) | YES  |     | NULL    |                |
| created_at | datetime     | YES  |     | NULL    |                |
| updated_at | datetime     | YES  |     | NULL    |                |
| address    | varchar(255) | YES  |     | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
6 rows in set (0.00 sec)
```

### seeders 种子数据填充

* sequelize seed:create *`node_modules\.bin\sequelize seed:create --name init-shops`*

* sequelize db:seed:all *与 db:migrate 相似，执行 sequelize db:seed:all ，将向数据库填充 seeders 目录中所有 up 方法所定义的数据。`node_modules\.bin\sequelize db:seed:all`*__注意: seeders 的执行，不会将状态存储在 SequelizeMeta 表中。__(当然，我们也可以通过 `--seed` 来制定特定的 `seed` 配置来做填充：
`node_modules\.bin\sequelize db:seed --seed 20190103082032-init-goods.js`)

```bash
# 添加后的数据表
mysql> select * from shops;
+----+-------+-----------+---------------------+---------------------+---------+
| id | name  | thumb_url | created_at          | updated_at          | address |
+----+-------+-----------+---------------------+---------------------+---------+
|  1 | 店铺1 | 1.png     | 2018-12-30 12:10:22 | 2018-12-30 12:10:22 | NULL    |
|  2 | 店铺2 | 2.png     | 2018-12-30 12:10:22 | 2018-12-30 12:10:22 | NULL    |
|  3 | 店铺3 | 3.png     | 2018-12-30 12:10:22 | 2018-12-30 12:10:22 | NULL    |
|  4 | 店铺4 | 4.png     | 2018-12-30 12:10:22 | 2018-12-30 12:10:22 | NULL    |
|  5 | 店铺5 | 5.png     | 2018-12-30 12:10:22 | 2018-12-30 12:10:22 | NULL    |
+----+-------+-----------+---------------------+---------------------+---------+
5 rows in set (0.00 sec)
```

* sequelize db:seed:undo *Seeders 所填充的数据，也与迁移的 db:migrate:undo 相仿，只是不会进入 SequelizeMeta 记录。两个可用的命令如下，很简单，不再赘述：*

```bash

# 撤销所有的种子
node_modules\.bin\sequelize db:seed:undo:all
# 数据表
mysql> select * from shops;
+----+-------+-----------+---------------------+---------------------+---------+
| id | name  | thumb_url | created_at          | updated_at          | address |
+----+-------+-----------+---------------------+---------------------+---------+
|  5 | 店铺5 | 5.png     | 2018-12-30 12:10:22 | 2018-12-30 12:10:22 | NULL    |
+----+-------+-----------+---------------------+---------------------+---------+
1 row in set (0.00 sec)

# 撤销指定的种子
node_modules\.bin\sequelize db:seed:undo --seed XXXXXXXXXXXXXX-demo-user.js
```

### Sequelize 连接 MySQL 数据库

* Sequelize 连接数据库的核心代码主要就是通过 new Sequelize（database, username, password, options） 来实现，其中 options 中的配置选项，除了最基础的 host 与 port、数据库类型外，还可以设置连接池的连接参数 pool，数据模型命名规范 underscored 等等。具体可以查阅官方手册 [基础使用](http://docs.sequelizejs.com/manual/installation/usage.html)。__希望遵循 MySQL 数据库表字段的下划线命名规范，所以，需要全局开启一个 `underscore: true` 的定义，来使系统中默认的 createdAt 与 updatedAt 能以下划线的方式，与表结构保持一致。__

#### 定义数据库业务相关的 model

* 结合业务所需，可以在存放 models 目录下继续创建一系列的 model 来与数据库表结构做对应：

```
├── models                       # 数据库 model
│   ├── index.js                 # model 入口与连接
│   ├── goods.js                 # 商品表
│   ├── shops.js                 # 店铺表
```

#### 实现接口

* 很多时候，我们并不希望 findAll 来将数据表中的所有数据全都暴露出来，比如在查询用户列表时，用户的密码的值，便是特别敏感的数据。 我们可以在 findAll 中加入一个 `attributes` 的约束，可以是一个要查询的属性（字段）列表，或者是一个 key 为 `include` 或 `exclude` 对象的键，比如对于用户表，`findAll({ attributes: { exclude: ['password'] } })`，就可以排除密码字段的查询露出。

```js
const Joi = require('joi')
const models = require('../models')

const GROUP_NAME = 'shops'

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      // 查找数据
      const result = await models.shops.findAll({
        // 只返回 id 和 name
        attributes: ['id', 'name']
      })
      reply(result)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺列表',
      // 适用于 GET 接口的 query（URL 路径参数）
      validate: {
        query: {
          limit: Joi.number().integer().min(1).default(10).description('每页条数'),
          // error(new Error('页码数不能为0！'))  显示的错误信息为中文（message）
          page: Joi.number().integer().min(1).default(1).description('页码数').error(new Error('页码数不能为0！'))
        }
      }
    }
  },
  ...
]
```

* 列表分页 `options` 的具体配置参数细节说明，参见 [hapi-pagination](https://github.com/fknop/hapi-pagination/tree/v1.6.5)。

```bash
# 安装适配 hapi v16 的 hapi-pagination
$ npm i hapi-pagination@1
```

### 基于 JWT 的身份验证

* JWT 全称 JSON Web Token，是为了方便在各系统之间安全地传送 JSON 对象格式的信息，而采用的一个开发标准，基于 RFC 7519 定义。服务器在接收到 JWT 之后，可以验证它的合法性，用户登录与否的身份验证便是 JWT 的使用场景之一。
* JWT 具有「紧凑」与「自包含」的两大特点: 紧凑（compact）、自包含（self-contained）
* JWT 的构成---JSON Web Token 由 header、payload、signature 三部分组成，使用点号 . 分隔，下面是一段典型的 JWT 串:

```bash
# header
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
# payload
eyJ1c2VySWQiOjEsImV4cCI6MTUzNTMyMjc0NSwiaWF0IjoxNTM0NzE3OTQ1fQ.
# signature
6tOdn2R82bxJbXjAnwU5g4g9EKqGNe-qo4qCo6UZnQ
```

* header -- JWT 第一部分 header 指定了该 JWT 使用的签名算法：

```json
{ "alg": "HS256", "typ":"JWT" }
```

* payload -- JWT 的第二部分 `payload` 包含了该 JWT 的签发内容信息。以如上述 JWT 串为例，被解码之后，可以得到如下信息，包涵有用户 `ID`，`JWT` 过期时间 `exp`，`JWT` 签发时间 `iat`。

```json
{
  "userId": 1,
  "exp": 1535322745,
  "iat": 1534717945
}
```

其中 JWT 的规范有一套预设的标准注册声明，非必要项，在业务场景需要的时候加入：

>* `iss(issuer)`：JWT 的签发者
>* `sub(subject)`：JWT 所面向的用户
>* `aud(audience)`：接收 JWT 的一方
>* `exp(expiresIn)`：JWT 的过期时间，这个时间必须大于签发时间
>* `nbf(notBefore)`：定义在什么时间之前，该 JWT 都是不可用的
>* `iat(issuedAt)`：JWT 的签发时间
>* `jti(jwtid)`：JWT 的唯一身份标识，主要用来作为一次性 token，从而避免重放攻击

其他的信息数据，可以在 payload 中额外追加，避免与预设保留字冲突就好。  
_注意_ ：对于已签发的 JWT, 尽管信息是可以受到下文 signature 的签名防篡改保护，但 payload 部分的内容，依旧任何人都可以 decode 解码阅读。故而不要在 payload 中存放诸如密码密秘类的安全敏感数据。

* signature -- JWT 的第三部分 signature 用来验证签发数据的合法性，是否存在第三方篡改伪造行为。由 header + payload + 签发 secret 组合而成。有心的读者可以发现，其中的参数条件 header 和 payload 皆为 base64 的编码内容，base64 是一种可双向的编码算法，所以不具备数据安全性。唯有 secret 的参数条件，在 JWT 最终的生成串中并不公开，所以在服务端保管好 secret 的签发字符串的私密性尤为重要，随意地将其提交进 git 的代码版本库，是一种极度不严谨行为。 以 HS256 算法为例，signature 的签发算法如下：

```js
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

`Secret` 的秘钥签发，可以通过一些在线的 AES 加密工具来生成一串长度 32 或 64 的随机字符串。比如： [tool.oschina.net/encrypt/](http://tool.oschina.net/encrypt/) 。太长的字符串会一定程度上影响 jwt 验证的计算效率，所以找寻一个平衡点为宜。

#### 基于 JWT 的身份验证的好处

* __跨语言性__：payload 数据结构基于 JSON，可以被任何主流语言支持。
* __免疫 CSRF__：对 Cookie 的不依赖性，决定了天然免疫 CSRF 攻击。
* __可跨域性__：同样是对 Cookie 的不依赖性，决定了更好的跨域支持与独立服务化属性。
* __多端适配__：iOS， Android，微信小程序等非网页客户端，Cookie 是不被支持的，JWT 的认证机制则会简单很多。
* __去耦可扩展性__：JWT 可以在任何拥有正确 secret 私钥的 API 服务环境被身份验证和使用，便于微服务拆分。

#### 基于 JWT 身份验证的注意项

* 不要在 JWT 的 payload 中签入敏感信息
* 保护好 secret 秘钥
* 使用 HTTPS 传输 JWT
* 设置较短的 JWT 失效时间，并结合一个失效较长的 JWT RefreshToken 组合为宜。因为 JWT 无法轻易失效已签发的合法 JWT

#### 使用 jsonwebtoken 签发 JWT

* jsonwebtoken 是 Node.js 生态里用于签发与校验 JWT 的流行插件。

```bash
npm i jsonwebtoken
```

##### jwt.sign 签发

* JWT 的签发语法是 `jwt.sign(payload, secretOrPrivateKey, [options, callback])`。默认的签发算法基于 `HS256 (HMAC SHA256)`，可以在 options 参数的 `algorithm` 另行修改。JWT 签发规范中的一些标准保留字段比如 `exp`，`nbf`，`aud`，`sub`，`iss` 等都没有默认值，可以一并在 `payload`参数中按需声明使用，亦可以在第三个参数 options 中，通过 `expiresIn`，`notBefore`，`audience`，`subject`，`issuer` 来分别赋值，但是不允许在两处同时声明。
* 可以通过 [JWT](https://jwt.io/) 来 decode JWT 中的 payload 信息。

##### hapi-auth-jwt2 接口用户验证

* 安装

```bash
npm i hapi-auth-jwt2@7
```

* hapi-auth-jwt2 配置

```
├── plugins                       # hapi 插件配置
│ ├── hapi-auth-jwt2.js           # jwt 配置插件
```

### Sequelize 支持两种使用事务的方法

* 托管事务
* 非托管事务

>_在一个事务中，可能会包含开始（start）、提交（commit）、回滚（rollback）等操作，Sequelize 通过 [Transaction](http://docs.sequelizejs.com/manual/tutorial/transactions.html)类来实现事务相关功能。以满足一些对操作过程的完整性比较高的使用场景。_
>_托管事务基于 Promise 结果链进行自动提交或回滚。非托管事务则交由用户自行控制提交或回滚。_

### 微信接收的数据与返回的格式都是以 text/xml 的格式，而非 application/json ，需要引入 xml2js 的插件帮助在 JavaScript 的 Ojbect 与 XML 的 Object 数据关系之间快速转换

```bash
npm i xml2js
```

### 系统监控与记录 —— 使用 Good 插件

* Good 是一个 hapi 插件，用于监视和报告来自主机的各种 hapi 服务器事件以及 ops 信息。它侦听 hapi 服务器实例发出的事件，并将标准化事件推送到流集合中。Good 插件目前有这四个扩展功能： good-squeeze、good-console、good-file、good-http。

```bash
npm i good@7
npm i good-squeeze@5
npm i good-console@7
npm i good-file@6
npm i good-http@6
```

* good-squeeze：good-squeeze 是一个小转换流的集合。它提供了两个类，Squeeze 和 SafeJson, Squeeze 流基于良好的事件选项来过滤事件。SafeJson 流用于把对象转成 JSON 字符串，并且可以防止对象中循环引用引起的错误。
* good-console：good-console 能够将服务 good 服务事件转化为格式化字符串的转换流插件，最终通过 stdout 在控制台打印输出。
> GoodConsole([config])
> good-console 本身提供 3 个参数来简单配置控制台的打印信息：
> * format：使用 MomentJS 格式化时间， 默认值 YYMMDD/HHmmss.SSS
> * utc：boolean 输出时间是否为布尔值， 默认值 true
> * color：boolean 是否彩色输出，默认值 true

* good-file：基于 good-console 的控制台输出日志，当遇到控制台断开或是重启的时候，历史日志将无法找回，此时，在本地生成一份写文件的日志记录，会更好地便于日后的追溯。good-file 插件很好地解决了这样的需求痛点。
> GoodFile (path, options)
> * path：必填项，用来定义日志的写入目录
> * options：选填项，文件流的选项。 默认值为`{ encoding: 'utf8', flags: 'a', mode: 0o666 }`

* good-http：除此之外，在实际应用场景中，我们会遇到一些高危异常的错误情况，这类日志我们更希望能在错误发生的第一时间，就通过自动报警的方式，来通知开发人员及时介入响应。这里可以使用 good-http 插件，它可以构造一个 post 的请求接口，将定义的重要日志信息以 JSON 的数据结构方式，推送到目标端点。
> GoodHttp (endpoint, config)
> * endpoint：日志发送的目标地址
> * config：Object 类型的配置项目

* 组合使用日志插件：在实际项目使用中，可以进行组合性配置，在 reporters 字段中使用不同的 key 来区分即可

```js
reporters: {
  typeConsole: [
    // good-console 的一系列配置
  ],
  typeFile: [
    // good-file 的一系列配置
  ],
  typeHttpA: [
    // good-http 针对 A 平台的一系列配置
  ],
  typeHttpB: [
    // good-http 针对 B 平台的一系列配置
  ],
}
```

### 使用 good-http 结合 Sentry 自动收集错误日志

#### Sentry 简介

Sentry 中文翻译过来是哨兵的意思，从字面中可以知道 「站岗、放哨、巡逻、稽查的士兵」，不错，Sentry 是程序的「哨兵」 。它可以监控我们在生产环境中项目的运行状态，一旦某段代码运行报错，或者异常，会第一时间把报错的 路由，异常文件，请求方式 等一些非常详细的信息以消息或者邮件给我们，让我们第一时间知道：程序出错了，然后我们可以从 Sentry 给我们的详细的错误信息中瞬间找到我们需要处理的代码，并及时修正。

#### Sentry 服务搭建流程

利用 hapi 的 API 服务能力再搭建一个简易的内网 API 服务，该服务使用 Sentry 的 raven 插件进行错误日志的收集与汇报，日志的信息源来自应用服务的 good-http 插件

* 申请 Sentry 的 API key
* 配置 Sentry 的错误收集与报告插件 raven

```bash
npm i raven
```

```js
const Raven = require('raven')
Raven.config('https://your-sentry-api-key@sentry.io/182062').install()
```

* 提供错误日志接收服务

```js
{
  method: 'POST',
  path: '/reportErrorLog',
  handler: async (request, reply) => {
    //直接将请求参数上报到 Sentry
    Raven.captureException(request.payload)
    reply()
  },
  config: {
    tags: ['api', 'report'],
    auth: false,
  }
}
```

* 配置应用服务中 good-http 的错误日志推送到上述含有 Sentry raven 的 API 微服务

```js
server.register({
  plugin: require('good'),
  {
    ops: {
      interval: 1000
    },
    reporters: {
      typeHttp: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ error: '*' }]
        },
        {
          module: 'good-http',
          args: ['http://your-sentry-server/reportErrorLog', {}]
        }
      ]
    }
  }
})
```