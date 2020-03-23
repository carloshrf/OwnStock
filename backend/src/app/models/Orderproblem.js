import Sequelize, { Model } from 'sequelize';

class Order_problem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order',
    });
  }

  getTableName() {
    return 'Order Problem';
  }
}

export default Order_problem;
