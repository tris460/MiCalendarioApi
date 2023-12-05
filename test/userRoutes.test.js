const { expect } = require('chai');
const request = require('supertest');
const app = require('../routes/users');

describe('User Routes', () => {
  it('should return 200 when logging in with valid credentials', (done) => {
    request(app)
      .put('/login')
      .send({ email: 'test@example.com', pin: '1234' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal('Valid credentials');
        done();
      });
  });

  it('should return 401 when logging in with invalid credentials', (done) => {
    request(app)
      .put('/login')
      .send({ email: 'invalid@example.com', pin: '5678' })
      .expect(401, done);
  });

  // Agrega más pruebas para otras rutas y escenarios
});
