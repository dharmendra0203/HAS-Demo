const request = require('supertest');
const app = require('../src/app');

describe('People API', () => {
  it('lists people without follow state', async () => {
    const response = await request(app).get('/api/people');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.people)).toBe(true);
    expect(response.body.people[0]).toMatchObject({
      id: 'amara',
      name: 'Amara Okafor',
      handle: '@amara',
      role: 'Product designer'
    });
    expect(response.body.people[0]).not.toHaveProperty('following');
  });

  it('does not expose follow endpoints or the activity page', async () => {
    const followsResponse = await request(app).get('/api/follows');
    const mutationResponse = await request(app).post('/api/follows/amara');
    const activityResponse = await request(app).get('/activity');

    expect(followsResponse.status).toBe(404);
    expect(mutationResponse.status).toBe(404);
    expect(activityResponse.status).toBe(404);
  });
});