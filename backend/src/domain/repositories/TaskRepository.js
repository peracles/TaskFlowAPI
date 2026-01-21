// src/domain/repositories/TaskRepository.js
/**
 * Interface para el repositorio de tareas
 * Define las operaciones que el dominio necesita
 */
class TaskRepository {
  /**
   * Guarda una tarea en la base de datos
   * @param {Task} task - Entidad de tarea del dominio
   * @returns {Promise<Task>} Tarea guardada
   */
  async save(task) {
    throw new Error('Method not implemented');
  }

  /**
   * Encuentra tareas por usuario
   * @param {number} userId - ID del usuario
   * @param {Object} [options] - Opciones de filtrado
   * @param {string} [options.status] - Filtrar por estado
   * @param {string} [options.priority] - Filtrar por prioridad
   * @returns {Promise<Task[]>} Lista de tareas
   */
  async findByUser(userId, options = {}) {
    throw new Error('Method not implemented');
  }

  /**
   * Encuentra una tarea por ID
   * @param {number} id - ID de la tarea
   * @returns {Promise<Task|null>} Tarea encontrada o null
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Elimina una tarea
   * @param {number} id - ID de la tarea
   * @returns {Promise<boolean>} True si se eliminó
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = TaskRepository;