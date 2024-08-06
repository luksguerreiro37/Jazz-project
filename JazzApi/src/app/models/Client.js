const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class Client extends Model {
  static init(sequelize) {
    console.log('Inicializando o modelo Client...');
    super.init({
      client_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'clients',
      modelName: 'Client',
      timestamps: true,
      hooks: {
        beforeCreate: (client, options) => {
          if (client.password) {
            client.password = bcrypt.hashSync(client.password, 10);
          }
        },
        beforeUpdate: (client, options) => {
          if (client.password && client.changed('password')) {
            client.password = bcrypt.hashSync(client.password, 10);
          }
        },
      },
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    });
    console.log('Modelo Client inicializado com sucesso.');
  }

  static associate(models) {
    this.hasMany(models.Order, { foreignKey: 'client_id', as: 'orders' });
  }
}

module.exports = (sequelize) => Client.init(sequelize);
