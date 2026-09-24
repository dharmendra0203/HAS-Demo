const request = require('supertest');
const app = require('../src/app');

describe('Follow API', () => {
  it('lists people with current follow state', async () => {
    const response = await request(app).get('/api/people');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.people)).toBe(true);
    expect(response.body.people[0]).toHaveProperty('id');
    expect(response.body.people[0]).toHaveProperty('following');
  });

  it('follows and unfollows a person', async () => {
    const personId = 'mateo';

    const followResponse = await request(app).post(`/api/follows/${personId}`);
    expect(followResponse.status).toBe(200);
    expect(followResponse.body).toMatchObject({ personId, following: true });

    const unfollowResponse = await request(app).delete(`/api/follows/${personId}`);
    expect(unfollowResponse.status).toBe(200);
    expect(unfollowResponse.body).toMatchObject({ personId, following: false });
  });

  it('returns 404 for an unknown person', async () => {
    const response = await request(app).post('/api/follows/unknown-user');
    expect(response.status).toBe(404);
  });
});
