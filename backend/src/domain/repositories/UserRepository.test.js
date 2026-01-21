// src/domain/repositories/UserRepository.test.js
const UserRepository = require('./UserRepository');

describe('UserRepository Interface', () => {
  it('should throw error when calling unimplemented methods', async () => {
    const repo = new UserRepository();
    
    await expect(repo.save({})).rejects.toThrow('Method not implemented');
    await expect(repo.findByEmail('test@example.com')).rejects.toThrow('Method not implemented');
    await expect(repo.findById(1)).rejects.toThrow('Method not implemented');
  });
});