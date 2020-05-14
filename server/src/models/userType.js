module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserType', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
  },
  {
    timestamps: true,
    tableName: 'UserType'
  })
}
