import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        job: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default User;
