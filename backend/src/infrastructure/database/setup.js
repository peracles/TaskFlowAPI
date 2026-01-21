const { createDatabaseConnection } = require('./connection');
const modelFactories = require('./models');

const setupDatabaseModels = (config) => {
  const sequelize = createDatabaseConnection(config);
  
  // Inicialización dinámica de modelos
  const models = Object.fromEntries(
    Object.entries(modelFactories).map(([name, factory]) => [name, factory(sequelize)])
  );
  
  // Relaciones manuales (lógica de negocio)
  models.User.hasMany(models.Task, { foreignKey: 'userId', as: 'tasks' });
  models.Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  
  return { sequelize, models };
};

module.exports = setupDatabaseModels;