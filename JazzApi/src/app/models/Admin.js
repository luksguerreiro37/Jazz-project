const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class Admin extends Model {
  static init(sequelize) {
    super.init({
      admin_id: {
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Admin',
      tableName: 'admins',
      hooks: {
        beforeCreate: (admin) => {
          if (admin.password) {
            admin.password = bcrypt.hashSync(admin.password, 10);
          }
        },
        beforeUpdate: (admin) => {
          if (admin.password && admin.changed('password')) {
            admin.password = bcrypt.hashSync(admin.password, 10);
          }
        },
      },
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    });
  }
}

module.exports = (sequelize) => Admin.init(sequelize);
