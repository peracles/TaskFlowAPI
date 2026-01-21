/**
 * Entidad de Usuario - lógica de negocio pura
 * @property {number} id - ID único del usuario
 * @property {string} email - Email único
 * @property {string} password - Contraseña hasheada
 * @property {string} name - Nombre completo
 */
class User {
  constructor(email, password, name, id = null) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    
    // Validación de dominio
    this.validate();
  }

  validate() {
    if (!this.email || !this.isValidEmail(this.email)) {
      throw new Error('Email inválido');
    }
    if (!this.password || this.password.length < 6) {
      throw new Error('Contraseña debe tener al menos 6 caracteres');
    }
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Nombre es requerido');
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Cambia la contraseña del usuario
   * @param {string} newPassword - Nueva contraseña
   */
  changePassword(newPassword) {
    this.password = newPassword;
    this.validate(); // Revalida la entidad
  }
}

module.exports = User;