const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('../config/database')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false,
  define: config.define,
});

const models = {};
fs.readdirSync(path.join(__dirname, '../app/models'))
  .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
  .forEach(file => {
    const modelFunction = require(path.join(__dirname, '../app/models', file));
    const model = modelFunction(sequelize, Sequelize.DataTypes);
    if (model && model.name) {
      models[model.name] = model;
    }
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, models };
