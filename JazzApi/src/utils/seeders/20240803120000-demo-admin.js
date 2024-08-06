'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableExists = await queryInterface.sequelize.query(
      "SHOW TABLES LIKE 'admins'",
      { type: Sequelize.QueryTypes.SHOWTABLES }
    );

    if (tableExists.length > 0) {
      await queryInterface.bulkInsert('admins', [
        {
          adminId: uuidv4(),
          name: 'Admin',
          email: 'admin@example.com',
          password: bcrypt.hashSync('admin123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('admins', null, {});
  }
};
