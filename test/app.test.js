const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps', () => {
    it('should show a list of apps', () => {
      return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array')
        })
    });
    it('should error if wrong query', () => {
        return supertest(app)
            .get('/apps?sort=abc')
            .expect(400, 'sort must be by app or rating')
    })
  });