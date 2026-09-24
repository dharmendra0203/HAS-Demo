const request = require('supertest');
const app = require('../src/app');

describe('GET /api/health', () => {
  it('returns a healthy status payload', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('services');
  });
});
