module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'classification_id', {
      type: Sequelize.INTEGER,
      references: { model: 'classifications', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('classification_id');
  },
};
