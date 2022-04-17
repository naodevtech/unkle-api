require('dotenv').config();

const config = {
  server_port: process.env.SERVER_PORT,
  database_name: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  db_port: process.env.DATABASE_PORT,
  db_username: process.env.DATABASE_USERNAME,
  db_password: process.env.DATABASE_PASSWORD,
  db_dialect: process.env.DATABASE_DIALECT,
  jwt_secret: process.env.JWT_SECRET,
  use_env_variable: process.env.USE_ENV_VARIABLE
};

module.exports = config;
