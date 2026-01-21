// src/domain/repositories/UserRepository.js
/**
 * Interface para el repositorio de usuarios
 * Define las operaciones que el dominio necesita
 */
class UserRepository {
  /**
   * Guarda un usuario en la base de datos
   * @param {User} user - Entidad de usuario del dominio
   * @returns {Promise<User>} Usuario guardado
   */
  async save(user) {
    throw new Error('Method not implemented');
  }

  /**
   * Encuentra un usuario por email
   * @param {string} email - Email del usuario
   * @returns {Promise<User|null>} Usuario encontrado o null
   */
  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  /**
   * Encuentra un usuario por ID
   * @param {number} id - ID del usuario
   * @returns {Promise<User|null>} Usuario encontrado o null
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = UserRepository;