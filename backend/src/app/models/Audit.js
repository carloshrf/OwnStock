import Sequelize, { Model } from 'sequelize';

class Audit extends Model {
  static init(sequelize) {
    super.init(
      {
        operation: Sequelize.STRING,
        table: Sequelize.STRING,
        register_id: Sequelize.INTEGER,
        user_name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Audit;
