require('dotenv/config');

const databaseConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'pang',
  port: Number(process.env.DB_PORT || '3306'),
  dialect: 'mysql',
  define: {
    underscored: true,
    timestamps: true,
    freezeTableName: true
  },
  logQueryParameters: false,
  logging: false
};

module.exports = {
  development: {
    ...databaseConfig
  },
  test: {
    ...databaseConfig
  },
  production: {
    ...databaseConfig
  }
};
