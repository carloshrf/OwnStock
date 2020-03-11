import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        category: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        unity: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Product;
