// src/domain/models/Task.js
/**
 * Entidad de Tarea - lógica de negocio pura
 * @property {number} id - ID único de la tarea
 * @property {string} title - Título de la tarea
 * @property {string} description - Descripción
 * @property {'pending'|'in_progress'|'completed'} status - Estado
 * @property {'low'|'medium'|'high'} priority - Prioridad
 * @property {Date} dueDate - Fecha de vencimiento
 * @property {number} userId - ID del propietario
 */
class Task {
  constructor(title, description, userId, dueDate = null, id = null) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.dueDate = dueDate;
    this.status = 'pending';
    this.priority = 'medium';
    
    this.validate();
  }

  validate() {
    if (!this.title || this.title.trim().length === 0) {
      throw new Error('El título es requerido');
    }
    if (!this.userId || typeof this.userId !== 'number') {
      throw new Error('Usuario propietario es requerido');
    }
    if (this.dueDate && isNaN(new Date(this.dueDate).getTime())) {
      throw new Error('Fecha de vencimiento inválida');
    }
  }

  /**
   * Completa la tarea
   * @throws {Error} Si la tarea ya está completada o está vencida
   */
  complete() {
    if (this.status === 'completed') {
      throw new Error('La tarea ya está completada');
    }
    
    if (this.isOverdue()) {
      throw new Error('No se pueden completar tareas vencidas');
    }
    
    this.status = 'completed';
  }

  /**
   * Verifica si la tarea está vencida
   * @returns {boolean}
   */
  isOverdue() {
    if (!this.dueDate) return false;
    const now = new Date();
    const due = new Date(this.dueDate);
    return due < now && this.status === 'pending';
  }

  /**
   * Establece la prioridad de la tarea
   * @param {'low'|'medium'|'high'} priority
   */
  setPriority(priority) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      throw new Error('Prioridad inválida');
    }
    this.priority = priority;
  }
}

module.exports = Task;