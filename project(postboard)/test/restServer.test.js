const expect = require('chai').expect;
const request = require('supertest');

const app = require('../restServer.js');



// apiMap.set('post','/api/post/');
// apiMap.set('logingoogle','/api/login/google/');


describe('restServer REST API', () => {
    it('get api link should return apiMap', (done) => {
        request(app).get('/api/')
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('apiMap');
            done();
        })
        .catch((err) => done(err));
    });

    it('loadprofile should return false', (done) => {
        request(app).get('/api/user/loadprofile/')
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('flag');
            expect(body.flag, false);
            done();
        })
        .catch((err) => done(err));
    });

    it('get user should return false', (done) => {
        request(app).get('/api/user/jmp')
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('flag');
            expect(body.flag, false);
            done();
        })
        .catch((err) => done(err));
    });

    it('logout should return false', (done) => {
        request(app).get('/api/user/logout/')
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('flag');
            expect(body.flag, false);
            done();
        })
        .catch((err) => done(err));
    });

    it('create post should return false', (done) => {
        request(app).post('/api/post/')
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('flag');
            expect(body.flag, false);
            done();
        })
        .catch((err) => done(err));
    });

    it('delete post should return false', (done) => {
        request(app).delete('/api/post/100')
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('flag');
            expect(body.flag, false);
            done();
        })
        .catch((err) => done(err));
    });

    it('update user profile should return false', (done) => {
        request(app).patch('/api/user/')
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('flag');
            expect(body.flag, false);
            done();
        })
        .catch((err) => done(err));
    });


});

