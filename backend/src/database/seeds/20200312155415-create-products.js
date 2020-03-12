module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'Skoll',
          description: 'Puro Malte 2l',
          quantity: 2,
          classification_id: 4,
          unit_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Arroz',
          description: 'Branco',
          quantity: 14,
          classification_id: 3,
          unit_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Papel Higienico',
          description: 'Perfumado',
          quantity: 5,
          classification_id: 6,
          unit_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Parafuso',
          description: 'Sextavado',
          quantity: 3,
          classification_id: 7,
          unit_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('People', null, {});
  },
};
