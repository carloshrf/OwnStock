module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'unit_id', {
      type: Sequelize.INTEGER,
      references: { model: 'units', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('products', 'unit_id');
  },
};
