import request from 'supertest';
import { expect } from 'chai';
import app from './server.js';  // Update path if necessary

describe('POST /login', function() {
  it('should login successfully and return JWT token', async function() {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('should fail with incorrect credentials', async function() {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('Invalid credentials');
  });
});
