import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Classification, {
      foreignKey: 'classification_id',
      as: 'classification',
    });

    this.belongsTo(models.Unit, {
      foreignKey: 'unit_id',
      as: 'unit',
    });
  }
}

export default Product;
