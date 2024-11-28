'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
    }
  }

  Users.init({
    nombre: DataTypes.STRING,
    ci: DataTypes.STRING,
    cargo: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    contras: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });

  // Hook que se ejecuta después de sincronizar el modelo
  Users.addHook('afterSync', async (options) => {
    const defaultUser = {
      nombre: 'Administrador',
      ci: '00000',
      cargo: 'administrador',
      correo: 'admin@admin.com',
      telefono: '000000',
      contras: '$2b$10$76pYUxV6fr4jFwNznhZzxeYVO0J0bpbrLZkinfYyT1bl8KwMjqLGW'
    };

    // Verifica si el usuario ya existe
    const userExists = await Users.findOne({ where: { correo: defaultUser.correo } });
    if (!userExists) {
      await Users.create(defaultUser);
    }
  });

  return Users;
};