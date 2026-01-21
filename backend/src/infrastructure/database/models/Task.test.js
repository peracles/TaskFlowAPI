// src/infrastructure/database/models/Task.test.js
const { DataTypes } = require('sequelize');
const TaskFactory = require('./Task');

describe('Task ORM Model', () => {
  it('should define Task model with correct attributes', () => {
    const mockSequelize = {
      define: jest.fn().mockReturnValue({}),
    };
    
    TaskFactory(mockSequelize);
    
    expect(mockSequelize.define).toHaveBeenCalledWith(
      'Task',
      expect.objectContaining({
        title: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
        }),
        status: expect.objectContaining({
          type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
          defaultValue: 'pending',
        }),
        userId: expect.objectContaining({
          type: DataTypes.INTEGER,
          allowNull: false,
        }),
      }),
      expect.objectContaining({
        tableName: 'tasks',
        underscored: true,
      })
    );
  });
});