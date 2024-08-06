const { exec } = require('child_process');

exec('npx sequelize-cli db:seed:all', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao rodar o comando do seeder: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Erro ao rodar o comando do seeder: ${stderr}`);
    return;
  }
  console.log(`Comando do seeder rodado com sucesso: ${stdout}`);
});
