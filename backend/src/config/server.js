const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

/**
 * Configura y devuelve una instancia de Express con middleware básico.
 * @returns {Express} App de Express configurada
 */
const setupServer = () => {
  const app = express();

  app.use(helmet({ contentSecurityPolicy: false, }));

  app.use(cors());

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
  }

  app.use(express.json({ limit: '10mb' }));

  return app;
};

module.exports = setupServer;