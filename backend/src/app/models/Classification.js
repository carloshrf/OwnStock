import Sequelize, { Model } from 'sequelize';

class Classification extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  getTableName() {
    return 'Classification';
  }
}

export default Classification;
