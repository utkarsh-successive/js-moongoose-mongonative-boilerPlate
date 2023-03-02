import { MongoMemoryServer } from 'mongodb-memory-server';
import * as supertest from 'supertest';
import { MongoClient } from 'mongodb';
import config from '../../../config/configuration';
import Server from '../../../Server';

describe('For user endpoints', () => {
    const server = new Server(config);
    let client;
    // eslint-disable-next-line no-unused-vars
    let db;
    let mongoServer;
    let mongoUri;
    let req;
    let ID;
    let id;
    let name;

    beforeAll(async () => {
        const app = await server.bootstrap();
        req = supertest(app);

        mongoServer = await MongoMemoryServer.create({
            instance: {
                dbName: 'users-mongo-boiler',
            },
        });
        mongoUri = mongoServer.getUri();
        try {
            client = await MongoClient.connect(mongoUri);
            db = client.db('users');
        } catch (err) {
            console.log('mongo not connected', err);
        }
    });

    //* *** Positive Test Cases ****/
    describe('Positive Test cases', () => {
        test('create user', async () => {
            const newUser = {
                name: 'Test',
                email: 'test@gmail.com',
                mobile_no: '1234567890',
                address: { flat_no: 1, city: 'test', state: 'mockTest' },
                age: 25,
            };
            const res = await req.post('/api/user').send(newUser);
            expect(res.status).toBe(200);
            expect(res.body.data.name).toBe(newUser.name);
            // eslint-disable-next-line dot-notation
            ID = res.body.data['_id'];
        });

        test('get user list', async () => {
            const res = await req.get('/api/user');
            expect(res.status).toBe(200);
            expect(res.body.data).not.toBeUndefined();
        });

        test('get single user', async () => {
            const res = await req.get(`/api/user/${ID}`);
            expect(res.status).toBe(200);
            name = res.body.data.name;
        });

        test('updateOne user', async () => {
            const updateUser = {
                name: 'Mockuser',
                email: 'mockuser@gmail.com',
            };
            const res = await req.put(`/api/user/${ID}`).send(updateUser);
            expect(res.status).toBe(200);
            // ID2 = res.body.data['_id'];
        });

        test('deleteOne user', async () => {
            const res = await req.delete(`/api/user/${ID}`);
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('User information deleted');
        });
    });
    describe('Positive Bulk Test cases', () => {
        test('createBulk users', async () => {
            const newUser = [
                {
                    name: 'Test',
                    email: 'test@gmail.com',
                    mobile_no: '1234567890',
                    address: { flat_no: 1, city: 'test', state: 'mockTest' },
                    age: 25,
                },
                {
                    name: 'Test',
                    email: 'test2@gmail.com',
                    mobile_no: '1234567890',
                    address: { flat_no: 2, city: 'test2', state: 'mockTest2' },
                    age: 25,
                },
            ];
            const res = await req
                .post('/api/user/bulk-insert')
                .send({ users: newUser });
            expect(res.status).toBe(200);
            // name = res.body.data[0].name;
        });

        test('UpdateBulk users', async () => {
            const res = await req
                .put(`/api/user/bulk-update?name=${name}`)
                .send({ age: 120 });
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Usersinfo update successfully');
        });
        test('deleteBulk users', async () => {
            const res = await req.delete(
                `/api/user/bulk-delete?name=${name}`,
            );
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Users information deleted');
        });
    });
    //* *** Negative Test Cases ****/

    describe('Negative Test Cases', () => {
        test('negative user create case', async () => {
            const newUser = {};
            const res = await req.post('/api/user').send(newUser);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Bad Request');
        });
        test('negative get user list', async () => {
            const res = await req
                .get('/api/user')
                .query({ limit: '50', skip: '50' });
            expect(res.body.status).toBe(404);
        });

        test('negative get single user', async () => {
            const res = await req.get(`/api/user/${id}`);
            expect(res.status).toBe(400);
        });

        test('negative update user', async () => {
            const updateUser = {};
            const res = await req.put(`/api/user/${'id'}`).send(updateUser);
            expect(res.status).toBe(400);
        });

        //* *** Test Case for DELETE API to delete the user ****/

        test('negative delete user', async () => {
            const res = await req.delete('/api/user/');
            expect(res.status).toBe(404);
        });
    });
    describe('Negative Bulk Test Cases', () => {
        test('negative Bulk user create case', async () => {
            const newUser = [{}];
            const res = await req
                .post('/api/user/bulk-insert')
                .send({ users: newUser });
            expect(res.status).toBe(400);
        });

        //* *** Test Case for DELETE API to delete the user ****/

        test('negative delete user', async () => {
            const res = await req.delete('/api//user/bulk-delete?name = \'\'');
            expect(res.status).toBe(400);
        });

        test('negative update user', async () => {
            const res = await req
                .put('/api/user/bulk-update?name = \'\'')
                .send({});
            expect(res.status).toBe(400);
        });
    });
});
