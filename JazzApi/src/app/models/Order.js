const { Model, DataTypes } = require('sequelize');

class Order extends Model {
  static init(sequelize) {
    console.log('Inicializando o modelo Order...');
    super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      items: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O campo items não pode estar vazio.'
          }
        }
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'O valor do pedido não pode ser negativo.'
          }
        }
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
      is_open: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }, {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
    });
    console.log('Modelo Order inicializado com sucesso.');
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
    this.belongsToMany(models.Product, { through: 'OrderProducts', foreignKey: 'order_id', as: 'products' });
  }
}

module.exports = (sequelize) => Order.init(sequelize);
