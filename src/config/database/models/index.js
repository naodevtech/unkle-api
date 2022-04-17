'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { domainToASCII } = require('url');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const config = require(__dirname + '/../database.js')[env];
var sequelizeLogger = require('sequelize-log-syntax-colors');

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.db_host], config);
} else {
  if (env === 'development' || env === 'preprod') {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      Object.assign(config, {
        logging: function (text) {
          config.logging = sequelizeLogger;
          console.log(config.logging.default(text));
        }
      })
    );
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }
}

fs.readdirSync(__dirname + '/../../../modules/').forEach((folder) => {
  if (folder !== 'index.js') {
    fs.readdirSync(__dirname + `/../../../modules/${folder}`)
      .filter((file) => {
        return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-6) === 'Dao.js'
        );
      })
      .forEach((file) => {
        const model = require(path.join(
          __dirname + `/../../../modules/${folder}`,
          file
        ))(sequelize, Sequelize.DataTypes);

        db[model.name] = model;
      });
  }
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
