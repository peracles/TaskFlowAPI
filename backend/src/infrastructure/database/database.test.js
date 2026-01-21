const { connectDatabase } = require('./database');
const databaseModule = require('./database');

describe('Database Connection', () => {
  beforeAll(() => {
    // Aseguramos que las variables de entorno necesarias estén definidas
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5430';
    process.env.DB_NAME = 'taskflow_db';
    process.env.DB_USER = 'postgres';
    process.env.DB_PASSWORD = 'taskflow_pass';
  });

  /*afterAll(() => {
    // Limpieza (opcional)
    delete process.env.DB_HOST;
    delete process.env.DB_PORT;
    delete process.env.DB_NAME;
    delete process.env.DB_USER;
    delete process.env.DB_PASSWORD;
  });*/

  beforeEach(() => {
    if (databaseModule.__test__reset) databaseModule.__test__reset();
  });

  it('should create a Sequelize instance', () => {
    const sequelize = connectDatabase();
    expect(sequelize).toBeDefined();
    expect(sequelize.constructor.name).toBe('Sequelize');
  });

  it('should return the same instance on subsequent calls (singleton)', () => {
    const instance1 = connectDatabase();
    const instance2 = connectDatabase();
    expect(instance1).toBe(instance2);
  });

  it('should throw error if missing env vars', () => {
    const originalPassword = process.env.DB_PASSWORD;
    delete process.env.DB_PASSWORD;

    expect(() => connectDatabase()).toThrow('Faltan variables de entorno');

    // Restaurar
    process.env.DB_PASSWORD = originalPassword;
  });
});