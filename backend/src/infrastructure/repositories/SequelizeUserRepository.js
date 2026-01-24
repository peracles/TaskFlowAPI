const DomainUser = require('../../domain/models/User');
const { UserRepository: UserRepositoryInterface } = require('../../domain/repositories');
const setupDatabaseModels = require('../database/setup');

/**
 * Implementación concreta del repositorio de usuarios usando Sequelize
 */
class SequelizeUserRepository extends UserRepositoryInterface {
  /**
   * @param {Object} config - Configuración de base de datos
   */
  constructor(config) {
    super();
    const { models } = setupDatabaseModels(config);
    this.UserModel = models.User;
  }

  /**
   * Guarda un usuario en la base de datos
   * @param {DomainUser} user - Entidad de usuario del dominio
   * @returns {Promise<DomainUser>} Usuario guardado
   */
  async save(user) {
    try {
      // Conversión: Dominio → ORM
      const userData = {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
      };

      let userRecord;
      if (user.id) {
        // Actualizar usuario existente
        userRecord = await this.UserModel.findByPk(user.id);
        if (!userRecord) {
          throw new Error('Usuario no encontrado');
        }
        await userRecord.update(userData);
      } else {
        // Crear nuevo usuario
        userRecord = await this.UserModel.create(userData);
      }

      // Conversión: ORM → Dominio
      return new DomainUser(
        userRecord.email,
        userRecord.password,
        userRecord.name,
        userRecord.id
      );
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('El email ya está registrado');
      }
      throw error;
    }
  }

  /**
   * Encuentra un usuario por email
   * @param {string} email - Email del usuario
   * @returns {Promise<DomainUser|null>} Usuario encontrado o null
   */
  async findByEmail(email) {
    const userRecord = await this.UserModel.findOne({ where: { email } });
    if (!userRecord) {
      return null;
    }
    
    return new DomainUser(
      userRecord.email,
      userRecord.password,
      userRecord.name,
      userRecord.id
    );
  }

  /**
   * Encuentra un usuario por ID
   * @param {number} id - ID del usuario
   * @returns {Promise<DomainUser|null>} Usuario encontrado o null
   */
  async findById(id) {
    const userRecord = await this.UserModel.findByPk(id);
    if (!userRecord) {
      return null;
    }
    
    return new DomainUser(
      userRecord.email,
      userRecord.password,
      userRecord.name,
      userRecord.id
    );
  }
}

module.exports = SequelizeUserRepository;