const expect = require('chai').expect;
const request = require('supertest');

const app = require('../authServer.js');


describe('authServer REST API', () => {
    it('islogin should return false', (done) => {
        request(app).get('/api/user/islogin/')
        .then((res) => {
            const result = res.body.data;
            
            expect(result, false);
            done();
        })
        .catch((err) => done(err));
    });

    it('register should return info', (done) => {
        request(app).post('/api/user/register/')
        .query({ username: 'jmp', password: 'jmp' })
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('info');
            done();
        })
        .catch((err) => done(err));
    });

    it('login should return true', (done) => {
        request(app).post('/api/user/login/')
        .query({ username: 'root', password: 'jmp' })
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('flag');
            expect(body).to.contain.property('info');
            expect(body.flag, true );

            done();
        })
        .catch((err) => done(err));
    });

    it('refresh access token should return false', (done) => {
        request(app).get('/api/user/token/')
        .then((res) => {
            const result = res.body.data;
            expect(result, false);
            done();
        })
        .catch((err) => done(err));
    });

});

