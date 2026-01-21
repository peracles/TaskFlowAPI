// src/infrastructure/database.js
const { Sequelize } = require('sequelize');

let sequelizeInstance = null;

const __test__reset = () => {
  sequelizeInstance = null;
};

/**
 * Initializes and returns a Sequelize instance connected to PostgreSQL.
 * Uses environment variables for configuration.
 * 
 * @returns {Sequelize} Configured Sequelize instance
 * @throws {Error} If database connection fails or env vars are missing
 */
const connectDatabase = () => {
  if (sequelizeInstance) {
    return sequelizeInstance;
  }

  const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
  const missing = requiredEnvVars.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno para la base de datos: ${missing.join(', ')}`);
  }

  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

  sequelizeInstance = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      decimalNumbers: true,
    },
  });

  return sequelizeInstance;
};

module.exports = { 
    connectDatabase,
    ...(process.env.NODE_ENV === 'test' ? { __test__reset } : {})
};