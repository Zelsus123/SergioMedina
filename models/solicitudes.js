'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class solicitudes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  solicitudes.init({
    estudiante: DataTypes.STRING,
    curso: DataTypes.STRING,
    seccion: DataTypes.STRING,
    turno: DataTypes.STRING,
    periodo: DataTypes.STRING,
    fecha: DataTypes.DATE,
    tipo: DataTypes.STRING,
    representante: DataTypes.STRING,
    correo: DataTypes.STRING,
    nacido: DataTypes.STRING,
    edad: DataTypes.STRING,
    cedula: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'solicitudes',
  });
  return solicitudes;
};