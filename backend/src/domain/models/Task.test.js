// src/domain/models/Task.test.js
const Task = require('./Task');

describe('Task Domain Entity', () => {
  it('should create a valid task', () => {
    const task = new Task('Test Task', 'Description', 1);
    expect(task.title).toBe('Test Task');
    expect(task.status).toBe('pending');
  });

  it('should throw error for empty title', () => {
    expect(() => {
      new Task('', 'Description', 1);
    }).toThrow('El título es requerido');
  });

  it('should complete a pending task', () => {
    const task = new Task('Test Task', 'Description', 1);
    task.complete();
    expect(task.status).toBe('completed');
  });

  it('should not complete an overdue task', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const task = new Task('Overdue Task', 'Description', 1, yesterday);
    expect(() => {
      task.complete();
    }).toThrow('No se pueden completar tareas vencidas');
  });

  it('should set valid priority', () => {
    const task = new Task('Test Task', 'Description', 1);
    task.setPriority('high');
    expect(task.priority).toBe('high');
  });

  it('should throw error for invalid priority', () => {
    const task = new Task('Test Task', 'Description', 1);
    expect(() => {
      task.setPriority('invalid');
    }).toThrow('Prioridad inválida');
  });
});