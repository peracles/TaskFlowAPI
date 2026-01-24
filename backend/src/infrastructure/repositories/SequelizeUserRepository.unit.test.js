const SequelizeUserRepository = require('./SequelizeUserRepository');
const DomainUser = require('../../domain/models/User');

jest.mock('../database/setup', () => {
  return jest.fn().mockReturnValue({
    models: {
      User: {
        create: jest.fn(),
        findByPk: jest.fn(),
        findOne: jest.fn(),
      },
    },
  });
});

describe('SequelizeUserRepository (Unit)', () => {
  const mockConfig = { /* ... */ };
  let repository;
  let mockUserModel;

  beforeEach(() => {
    repository = new SequelizeUserRepository(mockConfig);
    mockUserModel = require('../database/setup').mock.results[0].value.models.User;
  });

  it('should save a new user', async () => {
    const domainUser = new DomainUser('test@example.com', 'password123', 'Test User');
    const mockRecord = {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };
    
    mockUserModel.create.mockResolvedValue(mockRecord);
    
    const result = await repository.save(domainUser);
    
    expect(result).toBeInstanceOf(DomainUser);
    expect(result.email).toBe('test@example.com');
    expect(mockUserModel.create).toHaveBeenCalledWith({
      id: undefined || null,
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });
  });
});