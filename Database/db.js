const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.js");
const db = {};
 //conexion 

db.connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
//Llamado de Modelos
db.Users = require("../models/users.js")(db.connection, DataTypes);
db.Novedades = require("../models/novedades.js")(db.connection, DataTypes);
db.Solicitudes = require("../models/solicitudes.js")(db.connection, DataTypes);

//Asociacion de modelos

module.exports = db;