import Sequelize, { Model } from 'sequelize';

class Provider extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: Sequelize.BOOLEAN, // true for companies false for physical persons
        register_number: Sequelize.STRING,
        country: Sequelize.STRING,
        city: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        email: Sequelize.STRING,
        phone_number_1: Sequelize.STRING,
        phone_number_2: Sequelize.STRING,
        contact_name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Provider;
