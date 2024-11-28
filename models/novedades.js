'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class novedades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  novedades.init({
    titulo: DataTypes.STRING,
    fecha: DataTypes.DATE,
    contenido: DataTypes.TEXT,
    imagen: DataTypes.STRING,
    autor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'novedades',
  });
  return novedades;
};