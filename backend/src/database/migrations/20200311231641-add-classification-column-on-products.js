module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'classification_id', {
      type: Sequelize.INTEGER,
      references: { model: 'classifications', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('products', 'classification_id');
  },
};
