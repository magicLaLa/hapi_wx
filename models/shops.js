/**
 * 定义店铺的数据模型 shops
 */
module.exports = (sequelize, DataType) => sequelize.define(
  'shops',
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false
    },
    thumb_url: DataType.STRING
  },
  {
    tableName: 'shops'
  }
)