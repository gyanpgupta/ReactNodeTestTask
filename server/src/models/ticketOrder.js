module.exports = function(sequelize, DataTypes) {
  const TicketsOrder = sequelize.define('TicketsOrder', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'User',
        key: 'uid'
      },
      //unique: true
    },
    ticketId: {
      type:DataTypes.BIGINT,
      references: {
        model: 'Ticket',
        key: 'id'
      },
      //unique: true
    },
    showAdmin: {
      type: DataTypes.BOOLEAN, 
      defaultValue: 0
    }
  },
  {
    timestamps: true,
    tableName: 'TicketsOrder'
  });

  TicketsOrder.associate = models => {
    TicketsOrder.belongsTo(models.User, { foreignKey: 'userId' })
    TicketsOrder.belongsTo(models.Ticket, { foreignKey: 'ticketId' })
  }

  return TicketsOrder
}