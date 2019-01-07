'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'users',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, // Auto-increment 会在新记录插入表中时生成一个唯一的数字
        primaryKey: true // 约束
      },
      // 用户的昵称
      nick_name: Sequelize.STRING,
      // 用户头像
      avatar_url: Sequelize.STRING,
      // 用户的性别
      gender: Sequelize.INTEGER,
      // 用户 open_id
      open_id: Sequelize.STRING,
      // 用户 session_key
      session_key: Sequelize.STRING,
      // 记录的创建时间
      created_at: Sequelize.DATE,
      // 记录的更新时间
      updated_at: Sequelize.DATE
    }
  ),

  down: (queryInterface) => queryInterface.dropTable('users')
}
