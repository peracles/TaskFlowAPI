// src/app.js
const setupServer = require('./config/server');
const routes = require('./presentation/routes');
const { connectDatabase } = require('./infrastructure/database/connection');

const app = setupServer();
app.use('/api', routes);

// Middleware de 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada', path: req.originalUrl });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('🚨 Error global:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;

if (require.main === module) {
  const startServer = async () => {
    try {
      // Conexión temporal para desarrollo (se eliminará en Issue #4)
      const config = {
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        NODE_ENV: process.env.NODE_ENV,
      };
      
      const { sequelize } = require('./infrastructure/database/models')(config);
      await sequelize.authenticate();
      console.log('✅ Conexión a PostgreSQL exitosa');

      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('❌ Error al conectar a la base de datos:', error.message);
      process.exit(1);
    }
  };

  startServer();
}