// src/domain/models/User.test.js
const User = require('./User');

describe('User Domain Entity', () => {
  it('should create a valid user', () => {
    const user = new User('test@example.com', 'password123', 'Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test User');
  });

  it('should throw error for invalid email', () => {
    expect(() => {
      new User('invalid-email', 'password123', 'Test User');
    }).toThrow('Email inválido');
  });

  it('should throw error for short password', () => {
    expect(() => {
      new User('test@example.com', '123', 'Test User');
    }).toThrow('Contraseña debe tener al menos 6 caracteres');
  });

  it('should allow password change', () => {
    const user = new User('test@example.com', 'oldpass', 'Test User');
    user.changePassword('newpassword123');
    expect(user.password).toBe('newpassword123');
  });
});