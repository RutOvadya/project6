const { expect } = require('chai');
const request = require('supertest');
const app = require('./path/to/your/server/file');

describe('GET /users', () => {
  it('should retrieve all users', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        // Assert the expected response
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.above(0);
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('email');
        
        done();
      });
  });
});
