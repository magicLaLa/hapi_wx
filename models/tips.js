/**
 * 定义温馨提示的数据模型 tips
 */
module.exports = (sequelize, DataType) => sequelize.define(
  'tips',
  {
    provinceCode: {
      type: DataType.STRING,
      primaryKey: true,
      allowNull: false
    },
    tipsPro: DataType.STRING
  },
  {
    tableName: 'tips'
  }
)