// src/infrastructure/repositories/SequelizeTaskRepository.unit.test.js
const SequelizeTaskRepository = require('./SequelizeTaskRepository');
const DomainTask = require('../../domain/models/Task');

jest.mock('../database/setup', () => {
  return jest.fn().mockReturnValue({
    models: {
      Task: {
        create: jest.fn(),
        findByPk: jest.fn(),
        findAll: jest.fn(),
        destroy: jest.fn(),
      },
    },
  });
});

describe('SequelizeTaskRepository (Unit)', () => {
  const mockConfig = {};
  let repository;
  let mockTaskModel;

  beforeEach(() => {
    repository = new SequelizeTaskRepository(mockConfig);
    mockTaskModel = require('../database/setup').mock.results[0].value.models.Task;
  });

  it('should save a new task', async () => {
    const domainTask = new DomainTask('Test Task', 'Description', 1);
    const mockRecord = {
      id: 1,
      title: 'Test Task',
      description: 'Description',
      userId: 1,
      dueDate: null,
      status: 'pending',
      priority: 'medium',
    };
    
    mockTaskModel.create.mockResolvedValue(mockRecord);
    
    const result = await repository.save(domainTask);
    
    expect(result).toBeInstanceOf(DomainTask);
    expect(result.title).toBe('Test Task');
    expect(result.userId).toBe(1);
    expect(mockTaskModel.create).toHaveBeenCalledWith({
      id: undefined || null,
      title: 'Test Task',
      description: 'Description',
      userId: 1,
      dueDate: null,
      status: 'pending',
      priority: 'medium',
    });
  });

  it('should find tasks by user ID', async () => {
    const mockRecords = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Desc 1',
        userId: 1,
        dueDate: null,
        status: 'pending',
        priority: 'medium',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Desc 2',
        userId: 1,
        dueDate: null,
        status: 'completed',
        priority: 'high',
      }
    ];
    
    mockTaskModel.findAll.mockResolvedValue(mockRecords);
    
    const result = await repository.findByUser(1);
    
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(DomainTask);
    expect(result[0].title).toBe('Task 1');
    expect(result[1].title).toBe('Task 2');
    expect(mockTaskModel.findAll).toHaveBeenCalledWith({
      where: { userId: 1 }
    });
  });

  it('should find tasks by user with filters', async () => {
    mockTaskModel.findAll.mockResolvedValue([]);
    
    await repository.findByUser(1, { status: 'pending', priority: 'high' });
    
    expect(mockTaskModel.findAll).toHaveBeenCalledWith({
      where: { 
        userId: 1,
        status: 'pending',
        priority: 'high'
      }
    });
  });

  it('should find task by ID', async () => {
    const mockRecord = {
      id: 1,
      title: 'Found Task',
      description: 'Found Desc',
      userId: 1,
      dueDate: null,
      status: 'pending',
      priority: 'medium',
    };
    
    mockTaskModel.findByPk.mockResolvedValue(mockRecord);
    
    const result = await repository.findById(1);
    
    expect(result).toBeInstanceOf(DomainTask);
    expect(result.id).toBe(1);
    expect(result.title).toBe('Found Task');
  });

  it('should return null when task not found', async () => {
    mockTaskModel.findByPk.mockResolvedValue(null);
    
    const result = await repository.findById(999);
    
    expect(result).toBeNull();
  });

  it('should delete a task', async () => {
    mockTaskModel.destroy.mockResolvedValue(1);
    
    const result = await repository.delete(1);
    
    expect(result).toBe(true);
    expect(mockTaskModel.destroy).toHaveBeenCalledWith({
      where: { id: 1 }
    });
  });

  it('should return false when task not deleted', async () => {
    mockTaskModel.destroy.mockResolvedValue(0);
    
    const result = await repository.delete(999);
    
    expect(result).toBe(false);
  });
});