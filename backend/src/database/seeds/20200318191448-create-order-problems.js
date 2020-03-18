module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'order_problems',
      [
        {
          order_id: 1,
          description:
            'O motorista foi abduzido e nos trouxe o atestado extraterrestre confirmando a doação voluntária de seus orgãos para o futuro das pesquisas alienigenas.',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          order_id: 4,
          description:
            'Um meteorito acertou o dedo do motorista, o mesmo está com inicio de depressão',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          order_id: 2,
          description:
            'Uma moto atropelou o caminhão e cortou o mesmo ao meio, não é mais possivel recuperar o produto',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          order_id: 3,
          description:
            'O novo corona virus não permitiu que o motorista chegasse no destino.',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
