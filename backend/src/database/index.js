import Sequelize from 'sequelize';
import DatabaseConfig from '../config/database';

import User from '../app/models/User';
import Task from '../app/models/Task';

const models = [User, Task]; // carega os models

class Database {
  constructor() {
    this.init();
  }

  init() {
    // conecta bd com os models
    this.connection = new Sequelize(DatabaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}
export default new Database();
