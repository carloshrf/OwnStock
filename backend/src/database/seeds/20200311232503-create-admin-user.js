const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'admin',
          email: 'admin@email.com',
          job: 'CEO',
          password_hash: bcrypt.hashSync('12345678', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Carlos Henrique',
          email: 'carlos@email.com',
          job: 'CTO',
          password_hash: bcrypt.hashSync('12345678', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Diego Fernandes',
          email: 'diego@email.com',
          job: 'CFO',
          password_hash: bcrypt.hashSync('12345678', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Rogerio Filho',
          email: 'rogerio@email.com',
          job: 'Socio',
          password_hash: bcrypt.hashSync('12345678', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
