'use strict';

process.env.NODE_ENV = 'test';

const { mockUser, loginMock, wrongLoginMock, registerMock } = require('./../mocks');
const app = require('./../../config/app');

const Bluebird = require('bluebird');
const expect = require('expect');
const request = require('supertest');
const cExpect = require('chai').expect;

const bcrypt = require('bcryptjs');


const model = require('./../../models');

describe('Login and registration', function() {

    before(async() => {
        return model.sequelize.sync();

        const BCRYPT_SALT_ROUNDS = 12;
        const password = await bcrypt.hash('sdsd2323', BCRYPT_SALT_ROUNDS);

        this.models = model;

        return Bluebird.all([
            this.models.User.destroy({ truncate: true }),
            this.models.User.create({
                password,
                ...mockUser,
            })
        ]);
    });

    it('Should respond with a 200 when user register', async() => {
        const req = await request(app).post('/api/registration').send(registerMock);

        expect(req.statusCode).toBe(200);
        expect(req.body.auth).toEqual(true);
        cExpect(req.body).to.have.deep.property('token');
        cExpect(req.body).to.have.deep.property('auth');
    });


    it('Should respond with a 200 when user login with right password', async() => {
        const req = await request(app).post('/api/login').send(loginMock);

        expect(req.statusCode).toBe(200);
        expect(req.body.auth).toEqual(true);
        cExpect(req.body).to.have.deep.property('token');
        cExpect(req.body).to.have.deep.property('auth');
    });


    it('Should respond with a 401 when user login with wrong password', async() => {
        const req = await request(app).post('/api/login').send(wrongLoginMock);

        expect(req.statusCode).toBe(401);
        expect(req.error.text).toMatch('Passwords do not match');
    });
});
