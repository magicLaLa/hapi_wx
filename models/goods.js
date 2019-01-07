/**
 * 定义商品的数据模型 goods
 */
module.exports = (sequelize, DataType) => sequelize.define(
  'goods',
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    shop_id: {
      type: DataType.INTEGER,
      allowNull: false
    },
    name: {
      type: DataType.STRING,
      allowNull: false
    },
    thumb_url: DataType.STRING
  },
  {
    tableName: 'goods'
  }
)