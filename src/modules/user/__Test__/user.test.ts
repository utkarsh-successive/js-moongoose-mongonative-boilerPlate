import { MongoMemoryServer } from 'mongodb-memory-server';
import * as supertest from 'supertest';
import config from '../../../config/configuration';
import Server from '../../../Server';
import Database from '../../../libs/database/Database';

describe('For user endpoints', () => {
    const server = new Server(config);
    let mongoServer;
    let mongoUri;
    let req;
    let ID;
    let ID2;
    let id;

    beforeAll(async () => {
        const app = await server.bootstrap();
        req = supertest(app);

        mongoServer = await MongoMemoryServer.create({
            instance: {
                dbName: 'users-mongo-boiler',
            },
        });
        mongoUri = mongoServer.getUri();
        await Database.open(mongoUri);
    });

    //* *** Positive Test Cases ****/
    describe('Positive Test cases', () => {
        test('create user', async () => {
            const newUser = {
                name:"utkarsh Tomer",
                email: "utkarsh@gmail.com",
                mobile_no: "8859755869",
               address: {"flat_no": 1, "city": "sikandarabad", "state": "uttar Pradesh "},
               age: 25
            };
            const res = await req
                .post('/api/user')
                .send(newUser);
            expect(res.status).toBe(200);
            expect(res.body.data.name).toBe(newUser.name);
            console.log(res.body.data.id, "objectid");
            ID = res.body.data.id;
        });

        test('get user list', async () => {
            const res = await req.get('/api/user');
            expect(res.status).toBe(200);
            expect(res.body.data).not.toBeUndefined();
        });

        test('get single user', async () => {
            const res = await req.get(`/api/user/${ID}`);
            expect(res.status).toBe(200);
        });

        test('update user', async () => {
            const updateUser = {
                    name: "siddhant Garg",
                    email: "siddhant.garg@gmail.com"
            };
            const res = await req
                .put(`/api/user/${ID}`)
                .send(updateUser);
                console.log('updateduser', res);
            expect(res.status).toBe(200);
            ID2 = res.body.data.id;
        });

        test('delete user', async () => {
            console.log('id2delete', ID2);
            const res = await req
                .delete(`/api/user/${ID2}`);
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('User information deleted');
        });
    });
    //* *** Negative Test Cases ****/

    describe('Negative Test Cases', () => {
        test('negative user create case', async () => {
            const newUser = {};
            const res = await req
                .post('/api/user')
                .send(newUser);
            expect(res.status).toBe(400);
        });
        test('negative get user list', async () => {
            const res = await req.get('/api/user').query({ limit: '50', skip: '50' });
            expect(res.body.status).toBe(404);
        });

        test('negative get single user', async () => {
            const res = await req.get(`/api/user/${id}`);
            expect(res.status).toBe(400);
        });

        test('negative update user', async () => {
            const updateUser = {};
            const res = await req
                .put(`/api/user/${'id'}`)
                .send(updateUser);
            expect(res.status).toBe(400);
        });

        //* *** Test Case for DELETE API to delete the user ****/

        test('negative delete user', async () => {
            const res = await req
                .delete(`/api/user/`);
            expect(res.status).toBe(404);
        });
    });
    afterAll(async () => {
        Database.close();
    });
});
