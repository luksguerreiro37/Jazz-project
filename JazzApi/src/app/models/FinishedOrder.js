const { Model, DataTypes } = require('sequelize');

class FinishedOrder extends Model {
  static init(sequelize) {
    console.log('modelo FinishedOrder...');
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
      },
      created_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'FinishedOrder',
      tableName: 'finished_orders',
      timestamps: true,
    });
    console.log('modelo FinishedOrder Inicializando com sucesso');
  }

  static associate(models) {
    console.log('Associando o modelo FinishedOrder...');
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
    console.log('Modelo FinishedOrder associado com sucesso.');
  }
}

module.exports = (sequelize) => FinishedOrder.init(sequelize);
