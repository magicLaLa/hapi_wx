'use strict'

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
}

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'goods',
    [
      { id: 1, name: '商品1-1', shop_id: 1, thumb_url: '1.png', ...timestamps },
      { id: 2, name: '商品2-2', shop_id: 2, thumb_url: '2.png', ...timestamps },
      { id: 3, name: '商品3-3', shop_id: 3, thumb_url: '3.png', ...timestamps },
      { id: 4, name: '商品4-4', shop_id: 4, thumb_url: '4.png', ...timestamps },
      { id: 5, name: '商品5-5', shop_id: 5, thumb_url: '5.png', ...timestamps },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    // 删除 goods 表 id 为 1，2，3，4 5 的记录
    return queryInterface.bulkDelete('goods', {
      id: {
        [Op.in]: [1, 2, 3, 4, 5]
      }
    }, {});
  },
}
