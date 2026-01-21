// src/infrastructure/database/connection.test.js
const { createDatabaseConnection, __test__resetConnection } = require('./connection');

describe('Database Connection (Singleton)', () => {
  const config = {
    DB_HOST: 'localhost',
    DB_PORT: '5430',
    DB_NAME: 'taskflow_db',
    DB_USER: 'postgres',
    DB_PASSWORD: 'taskflow_pass',
    NODE_ENV: 'test',
  };

  beforeEach(() => {
    if (__test__resetConnection) __test__resetConnection();
  });

  it('should create Sequelize instance with correct configuration', () => {
    const sequelize = createDatabaseConnection(config);
    expect(sequelize).toBeDefined();
    expect(sequelize.constructor.name).toBe('Sequelize');
  });

  it('should return the same instance on subsequent calls (singleton)', () => {
    const instance1 = createDatabaseConnection(config);
    const instance2 = createDatabaseConnection(config);
    expect(instance1).toBe(instance2);
  });

  it('should throw error if missing required config', () => {
    expect(() => {
      createDatabaseConnection({});
    }).toThrow('Faltan configuraciones para la base de datos');
  });
});