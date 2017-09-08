const request = require('supertest');
const app = require('../../server').app;

describe('GET /setUp', function () {
    it('respond with json', function (done) {
        request(app)
            .get('/setUp')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /setCurrencies', function () {
    it('respond with json', function (done) {
        request(app)
        .post('/setCurrencies')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('GET /home', function () {
    it('respond with json', function (done) {
        request(app)
            .get('/home')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /latest', function () {
    it('respond with json', function (done) {
        request(app)
            .post('/latest')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /show', function () {
    it('respond with json', function (done) {
        request(app)
            .get('/show')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /error', function () {
    it('respond with json', function (done) {
        request(app)
            .get('/error')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /showHistorical', function () {
    it('respond with json', function (done) {
        request(app)
            .get('/showHistorical')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /historical', function () {
    it('respond with json', function (done) {
        request(app)
            .post('/historical')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /showPeriod', function () {
    it('respond with json', function (done) {
        request(app)
            .get('/showPeriod')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /period', function () {
    it('respond with json', function (done) {
        request(app)
            .post('/period')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});