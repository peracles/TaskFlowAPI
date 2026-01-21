// src/infrastructure/database/models/User.test.js
const { DataTypes } = require('sequelize');
const UserFactory = require('./User');

describe('User ORM Model', () => {
  it('should define User model with correct attributes', () => {
    // Mock de sequelize
    const mockSequelize = {
      define: jest.fn().mockReturnValue({}),
    };
    
    UserFactory(mockSequelize);
    
    expect(mockSequelize.define).toHaveBeenCalledWith(
      'User',
      expect.objectContaining({
        email: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        }),
        password: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
        }),
      }),
      expect.objectContaining({
        tableName: 'users',
        underscored: true,
      })
    );
  });
});