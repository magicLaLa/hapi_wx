'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'shops',
    {
      id: {// 店铺的 ID，自增
        type: Sequelize.INTEGER,
        autoIncrement: true, // Auto-increment 会在新记录插入表中时生成一个唯一的数字
        primaryKey: true // 约束
      },
      name: {// 店铺的名称
        type: Sequelize.STRING,
        allowNull: false
      },
      // 店铺的图片
      thumb_url: Sequelize.STRING,
      // 记录的创建时间
      created_at: Sequelize.DATE,
      // 记录的更新时间
      updated_at: Sequelize.DATE
    }
  ),

  down: (queryInterface) => queryInterface.dropTable('shops')
}
