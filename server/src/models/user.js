module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    uid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    pass: {
      type: DataTypes.STRING
    },
    mail: {
      type: DataTypes.STRING
    },
    idTypeUser: {
      type:  DataTypes.BIGINT,
      references: {
        model: 'UserType',
        key: 'id'
      },
      //unique: true
    },
  },
  {
    timestamps: true,
    tableName: 'User'
  });

  User.associate = models => {
    User.belongsTo(models.UserType, { foreignKey: 'idTypeUser' })
  }

  return User
}

