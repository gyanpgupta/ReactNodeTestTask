module.exports = function (sequelize, DataTypes) {
  const Ticket = sequelize.define('Ticket', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    ticketOrder: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'User',
        key: 'uid'
      }
      // unique: true
    },
  },
  {
    timestamps: true,
    tableName: 'Ticket'
  })

  Ticket.associate = models => {
    Ticket.belongsTo(models.User, { foreignKey: 'userId' })
  }

  return Ticket
}

