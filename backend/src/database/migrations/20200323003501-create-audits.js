module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('audits', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
      },
      operation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      table: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      register_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('audits');
  },
};
