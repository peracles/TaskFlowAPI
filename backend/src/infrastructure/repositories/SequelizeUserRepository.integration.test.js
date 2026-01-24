// src/infrastructure/repositories/SequelizeUserRepository.integration.test.js
const SequelizeUserRepository = require('./SequelizeUserRepository');
const DomainUser = require('../../domain/models/User');

describe('SequelizeUserRepository Integration', () => {
  const testConfig = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_TEST_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    NODE_ENV: 'test',
  };

  let repository;

  beforeAll(async () => {
    repository = new SequelizeUserRepository(testConfig);
    
    // Asegurarse de que la conexión funciona
    const { sequelize } = require('../database/setup')(testConfig);
    await sequelize.authenticate();
  });

  afterEach(async () => {
    // Limpiar datos después de cada test
    const { sequelize } = require('../database/setup')(testConfig);
    await sequelize.getQueryInterface().bulkDelete('users', null, {});
  });

  afterAll(async () => {
    // Cerrar conexión
    const { sequelize } = require('../database/setup')(testConfig);
    await sequelize.close();
  });

  it('should save and retrieve a user from real database', async () => {
    // Arrange
    const user = new DomainUser('integration@test.com', 'password123', 'Integration Test');
    
    // Act
    const savedUser = await repository.save(user);
    const retrievedUser = await repository.findById(savedUser.id);
    
    // Assert
    expect(retrievedUser).toBeInstanceOf(DomainUser);
    expect(retrievedUser.email).toBe('integration@test.com');
    expect(retrievedUser.name).toBe('Integration Test');
  });

  it('should handle duplicate email constraint', async () => {
    // Arrange
    const user1 = new DomainUser('duplicate@test.com', 'pass123', 'User1');
    const user2 = new DomainUser('duplicate@test.com', 'pass456', 'User2');
    
    // Act & Assert
    await repository.save(user1);
    await expect(repository.save(user2)).rejects.toThrow('El email ya está registrado');
  });
});