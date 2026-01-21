// src/domain/repositories/TaskRepository.test.js
const TaskRepository = require('./TaskRepository');

describe('TaskRepository Interface', () => {
  it('should throw error when calling unimplemented methods', async () => {
    const repo = new TaskRepository();
    
    await expect(repo.save({})).rejects.toThrow('Method not implemented');
    await expect(repo.findByUser(1)).rejects.toThrow('Method not implemented');
    await expect(repo.findById(1)).rejects.toThrow('Method not implemented');
    await expect(repo.delete(1)).rejects.toThrow('Method not implemented');
  });
});