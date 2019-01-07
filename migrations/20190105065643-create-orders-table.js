'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'orders',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, // Auto-increment 会在新记录插入表中时生成一个唯一的数字
        primaryKey: true // 约束
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      payment_status: {
        type: Sequelize.ENUM('0', '1'),  // 0 未支付， 1 已支付
        defaultValue: '0'
      },
      // 记录的创建时间
      created_at: Sequelize.DATE,
      // 记录的更新时间
      updated_at: Sequelize.DATE
    }
  ),

  down: (queryInterface) => queryInterface.dropTable('orders')
}
