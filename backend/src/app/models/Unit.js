import Sequelize, { Model } from 'sequelize';

class Unit extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        symbol: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  getTableName() {
    return 'Unit';
  }
}

export default Unit;
