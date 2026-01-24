// src/infrastructure/repositories/SequelizeTaskRepository.integration.test.js
const SequelizeTaskRepository = require('./SequelizeTaskRepository');
const DomainTask = require('../../domain/models/Task');

describe('SequelizeTaskRepository Integration', () => {
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
    repository = new SequelizeTaskRepository(testConfig);
    const { sequelize } = require('../database/setup')(testConfig);
    await sequelize.authenticate();
  });

  afterEach(async () => {
    const { sequelize } = require('../database/setup')(testConfig);
    await sequelize.getQueryInterface().bulkDelete('tasks', null, {});
    await sequelize.getQueryInterface().bulkDelete('users', null, {});
  });

  afterAll(async () => {
    const { sequelize } = require('../database/setup')(testConfig);
    await sequelize.close();
  });

  it('should save and retrieve a task from real database', async () => {
    // Arrange
    const userRepository = new (require('./SequelizeUserRepository'))(testConfig);
    const user = await userRepository.save(new (require('../../domain/models/User'))('taskuser@test.com', 'pass123', 'Task User'));
    
    const task = new DomainTask('Integration Task', 'Integration Description', user.id);
    
    // Act
    const savedTask = await repository.save(task);
    const retrievedTask = await repository.findById(savedTask.id);
    
    // Assert
    expect(retrievedTask).toBeInstanceOf(DomainTask);
    expect(retrievedTask.title).toBe('Integration Task');
    expect(retrievedTask.userId).toBe(user.id);
  });
});