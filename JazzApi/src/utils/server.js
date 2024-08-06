const express = require('express');
const cors = require('cors');
const compression = require('compression');
const routes = require('../app/routes/routes');
const { sequelize } = require('../database/index');

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(routes);

async function startServer() {
  try {
    console.log('Sincronizando modelos com o banco de dados...');
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados com sucesso.');
  } catch (error) {
    console.error(`Erro ao sincronizar modelos: ${error.message}`);
  }
  
  const PORT = process.env.SERVER_PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

startServer();
