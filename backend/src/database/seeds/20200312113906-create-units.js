module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'units',
      [
        {
          name: 'Unidade',
          symbol: 'UN',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Centena',
          symbol: 'CENT',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Fardo',
          symbol: 'FARDO',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Quilogra',
          symbol: 'KG',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Litro',
          symbol: 'L',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Lata',
          symbol: 'LATA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Rolo',
          symbol: 'RL',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Tonelada',
          symbol: 'TON',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Peca',
          symbol: 'PC',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
