const request = require('supertest');
const app = require('../app');

/**
 * Description
 * @param {any} 'ServerSetup'
 * @param {any} (
 * @returns {any}
 */
describe('Server Setup', () => {
  it('debería responder en GET /api', async () => {
    const response = await request(app)
      .get('/api')
      .expect(200);

    expect(response.body.message).toBe('TaskFlow API - funcionando!');
    expect(response.body.version).toBe('1.0.0');
  });

  it('debería devolver 404 en ruta no existente', async () => {
    const response = await request(app)
      .get('/api/invalid-route')
      .expect(404);

    expect(response.body.error).toBe('Ruta no encontrada');
  });
});