const { Model, DataTypes } = require('sequelize');

class CanceledOrder extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'client_id',
        },
      },
      created_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      sequelize,
      modelName: 'CanceledOrder',
      tableName: 'canceled_orders',
    });
  }
}

module.exports = (sequelize) => CanceledOrder.init(sequelize);
