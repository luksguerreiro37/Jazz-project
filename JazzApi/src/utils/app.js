const express = require('express');
const cors = require('cors');
const compression = require('compression');
const routes = require('../app/routes/routes');
const { sequelize } = require('../database/index');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.initialize();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(compression());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  async initialize() {
    try {
      console.log('Sincronizando modelos com o banco de dados...');
      await sequelize.sync({ alter: true }); // Sincroniza os modelos com o banco de dados
      console.log('Modelos sincronizados com sucesso.');
      await this.runSeeder();
    } catch (error) {
      console.error(`Erro ao inicializar o app: ${error.message}`);
    }
  }

  async runSeeder() {
    try {
      console.log('Iniciando seeder...');
      const { stdout, stderr } = await execPromise('npx sequelize-cli db:seed:all');
      if (stderr) {
        console.error(`Erro ao rodar o comando do seeder: ${stderr}`);
      } else {
        console.log(`Comando do seeder rodado com sucesso: ${stdout}`);
      }
    } catch (error) {
      console.error(`Erro ao rodar o comando do seeder: ${error.message}`);
    }
  }
}

module.exports = new App().server;
