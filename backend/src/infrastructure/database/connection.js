// src/infrastructure/database/connection.js
const { Sequelize } = require('sequelize');

/**
 * Singleton instance of Sequelize connection
 * @type {Sequelize | null}
 */
let sequelizeInstance = null;

/**
 * Crea y configura la conexión a PostgreSQL (singleton)
 * @param {Object} config - Configuración de la base de datos
 * @returns {Sequelize} Instancia de Sequelize configurada
 */
const createDatabaseConnection = (config) => {
  // Si ya existe una instancia, retornarla
  if (sequelizeInstance) {
    return sequelizeInstance;
  }

  // Validar configuración requerida
  const requiredConfig = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
  const missing = requiredConfig.filter(key => !config[key]);
  
  if (missing.length > 0) {
    throw new Error(`Faltan configuraciones para la base de datos: ${missing.join(', ')}`);
  }

  // Crear nueva instancia
  sequelizeInstance = new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD,
    {
      host: config.DB_HOST,
      port: config.DB_PORT,
      dialect: 'postgres',
      logging: config.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      dialectOptions: {
        decimalNumbers: true,
      },
    }
  );

  return sequelizeInstance;
};

// Método para testing: resetear la instancia singleton
const __test__resetConnection = () => {
  sequelizeInstance = null;
};

module.exports = {
  createDatabaseConnection,
  ...(process.env.NODE_ENV === 'test' ? { __test__resetConnection } : {}),
};