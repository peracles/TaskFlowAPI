// src/infrastructure/database/models/User.js
const { DataTypes } = require('sequelize');

/**
 * Definición ORM del modelo User para Sequelize
 * @param {Sequelize} sequelize - Instancia de Sequelize
 * @returns {Model} Modelo User configurado
 */
module.exports = (sequelize) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  });
};