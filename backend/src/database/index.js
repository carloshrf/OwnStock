import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Product from '../app/models/Product';
import Classification from '../app/models/Classification';
import Provider from '../app/models/Provider';
import Unit from '../app/models/Unit';

const models = [User, Product, Classification, Unit, Provider];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
