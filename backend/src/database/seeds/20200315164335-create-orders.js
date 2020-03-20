module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'orders',
      [
        {
          type: true,
          product_id: 1,
          provider_id: 1,
          quantity: 12,
          price: 12.4,
          description: 'Entregar no endereço Rua dos paranauê N: 12 Altos',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: false,
          product_id: 2,
          provider_id: 2,
          quantity: 2,
          price: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: false,
          product_id: 3,
          provider_id: 2,
          quantity: 447,
          price: 22,
          description: 'Funcionam apenas de segunda a quarta de 10:00 às 16:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: true,
          product_id: 4,
          provider_id: 3,
          quantity: 885,
          price: 110.74,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
