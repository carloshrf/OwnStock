module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'classifications',
      [
        {
          name: 'Frios',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Carnes',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Grãos',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Bebidas',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Limpeza',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Higiene',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
