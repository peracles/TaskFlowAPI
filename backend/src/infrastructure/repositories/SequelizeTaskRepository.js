const DomainTask = require('../../domain/models/Task');
const { TaskRepository: TaskRepositoryInterface } = require('../../domain/repositories');
const setupDatabaseModels = require('../database/setup');

/**
 * Implementación concreta del repositorio de tareas usando Sequelize
 */
class SequelizeTaskRepository extends TaskRepositoryInterface {
  /**
   * @param {Object} config - Configuración de base de datos
   */
  constructor(config) {
    super();
    const { models } = setupDatabaseModels(config);
    this.TaskModel = models.Task;
  }

  /**
   * Guarda una tarea en la base de datos
   * @param {DomainTask} task - Entidad de tarea del dominio
   * @returns {Promise<DomainTask>} Tarea guardada
   */
  async save(task) {
    try {
      const taskData = {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        userId: task.userId,
      };

      let taskRecord;
      if (task.id) {
        // Actualizar tarea existente
        taskRecord = await this.TaskModel.findByPk(task.id);
        if (!taskRecord) {
          throw new Error('Tarea no encontrada');
        }
        await taskRecord.update(taskData);
      } else {
        // Crear nueva tarea
        taskRecord = await this.TaskModel.create(taskData);
      }

      return new DomainTask(
        taskRecord.title,
        taskRecord.description,
        taskRecord.userId,
        taskRecord.dueDate,
        taskRecord.id
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Encuentra tareas por usuario
   * @param {number} userId - ID del usuario
   * @param {Object} [options] - Opciones de filtrado
   * @param {string} [options.status] - Filtrar por estado
   * @param {string} [options.priority] - Filtrar por prioridad
   * @returns {Promise<DomainTask[]>} Lista de tareas
   */
  async findByUser(userId, options = {}) {
    const where = { userId };
    
    if (options.status) {
      where.status = options.status;
    }
    if (options.priority) {
      where.priority = options.priority;
    }

    const taskRecords = await this.TaskModel.findAll({ where });
    
    return taskRecords.map(record => 
      new DomainTask(
        record.title,
        record.description,
        record.userId,
        record.dueDate,
        record.id
      )
    );
  }

  /**
   * Encuentra una tarea por ID
   * @param {number} id - ID de la tarea
   * @returns {Promise<DomainTask|null>} Tarea encontrada o null
   */
  async findById(id) {
    const taskRecord = await this.TaskModel.findByPk(id);
    if (!taskRecord) {
      return null;
    }
    
    return new DomainTask(
      taskRecord.title,
      taskRecord.description,
      taskRecord.userId,
      taskRecord.dueDate,
      taskRecord.id
    );
  }

  /**
   * Elimina una tarea
   * @param {number} id - ID de la tarea
   * @returns {Promise<boolean>} True si se eliminó
   */
  async delete(id) {
    const deletedCount = await this.TaskModel.destroy({ where: { id } });
    return deletedCount > 0;
  }
}

module.exports = SequelizeTaskRepository;