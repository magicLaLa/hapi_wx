'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'tips',
    {
      provinceCode: {
        // 省 code
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true // 约束
      },
      tipsPro: Sequelize.STRING,
      // 记录的创建时间
      created_at: Sequelize.DATE,
      // 记录的更新时间
      updated_at: Sequelize.DATE
    }
  ),

  down: (queryInterface) => queryInterface.dropTable('tips')
}
