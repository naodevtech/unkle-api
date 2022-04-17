const config = require('../environment');

module.exports = {
  development: {
    database: config.database_name,
    host: config.host,
    port: config.db_port,
    username: config.db_username,
    password: config.db_password,
    dialect: config.db_dialect
  },
  preprod: {
    database: config.database_name,
    username: config.db_username,
    password: config.db_password,
    host: config.host,
    port: config.db_port,
    dialect: config.db_dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
