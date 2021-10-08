import { Sequelize, Options } from 'sequelize';

const databaseConfig: Options = require('../config/mysql')[process.env.NODE_ENV || 'development'];
// throws error when added to mysql config file

const { database, username, password, ...sequelizeDatabaseConfig } = databaseConfig;
const sequelize = new Sequelize(database, username, password, sequelizeDatabaseConfig);

export { sequelize };
