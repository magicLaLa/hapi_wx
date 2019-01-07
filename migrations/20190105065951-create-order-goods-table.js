'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'order_goods',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, // Auto-increment 会在新记录插入表中时生成一个唯一的数字
        primaryKey: true // 约束
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      goods_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      single_price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      // 记录的创建时间
      created_at: Sequelize.DATE,
      // 记录的更新时间
      updated_at: Sequelize.DATE
    }
  ),

  down: (queryInterface) => queryInterface.dropTable('order_goods')
}
