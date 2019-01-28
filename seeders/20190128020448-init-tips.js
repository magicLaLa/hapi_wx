'use strict'

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
}

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'tips',
    [
      { provinceCode: '0101', tipsPro: '温馨提示1', ...timestamps },
      { provinceCode: '0102', tipsPro: '温馨提示2', ...timestamps },
      { provinceCode: '0103', tipsPro: '温馨提示3', ...timestamps }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tips', null, {})
  }
}
