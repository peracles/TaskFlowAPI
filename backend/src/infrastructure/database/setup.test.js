// src/infrastructure/database/setup.test.js
const setupDatabaseModels = require('./setup');
const { __test__resetConnection } = require('./connection');

describe('Database Setup', () => {
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

  it('should initialize all models and relationships', () => {
    const { sequelize, models } = setupDatabaseModels(config);
    
    // Verificar conexión
    expect(sequelize).toBeDefined();
    
    // Verificar modelos
    expect(models.User).toBeDefined();
    expect(models.Task).toBeDefined();
    
    // Verificar relaciones
    expect(models.User.associations.tasks).toBeDefined();
    expect(models.Task.associations.user).toBeDefined();
    
    // Verificar que los modelos usan la misma instancia de Sequelize
    expect(models.User.sequelize).toBe(sequelize);
    expect(models.Task.sequelize).toBe(sequelize);
  });

  it('should use singleton connection', () => {
    const result1 = setupDatabaseModels(config);
    const result2 = setupDatabaseModels(config);
    
    // Ambas llamadas deben usar la misma instancia de Sequelize
    expect(result1.sequelize).toBe(result2.sequelize);
  });
});