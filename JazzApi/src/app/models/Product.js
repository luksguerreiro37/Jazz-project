const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    console.log('Inicializando o modelo Product...');
    super.init({
      productId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hadStock: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    }, {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      timestamps: true,
      underscored: true,
    });
    console.log('Modelo Product inicializado com sucesso.');
  }
}

module.exports = (sequelize) => Product.init(sequelize);
