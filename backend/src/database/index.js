import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Audit from '../app/models/Audit';
import User from '../app/models/User';
import Order from '../app/models/Order';
import Orderproblem from '../app/models/Orderproblem';
import Product from '../app/models/Product';
import Classification from '../app/models/Classification';
import Provider from '../app/models/Provider';
import Unit from '../app/models/Unit';

const models = [
  User,
  Product,
  Classification,
  Unit,
  Provider,
  Order,
  Orderproblem,
  Audit,
];

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
