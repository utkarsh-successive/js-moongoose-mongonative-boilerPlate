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
                dbName: 'users-exp-boiler',
            },
        });
        mongoUri = mongoServer.getUri();
        await Database.open(mongoUri);
    });

    //* *** Positive Test Cases ****/
    describe('Positive Test cases', () => {
        test('create todo', async () => {
            const newUser = {
                title: 'Demo',
                description: 'Testing the test cases',
            };
            const res = await req
                .post('/api/todo')
                .send(newUser);
            expect(res.status).toBe(200);
            expect(res.body.data.title).toBe(newUser.title);
            expect(res.body.data.description).toBe(newUser.description);
            ID = res.body.data.id;
        });

        test('get todo list', async () => {
            const res = await req.get('/api/todo');
            expect(res.status).toBe(200);
            expect(res.body.data).not.toBeUndefined();
        });

        test('get single todo', async () => {
            const res = await req.get(`/api/todo/${ID}`);
            expect(res.status).toBe(200);
        });

        test('update todo', async () => {
            const updateUser = {
                id: `${ID}`,
                status: 'in progress',
            };
            const res = await req
                .put('/api/todo')
                .send(updateUser);
            expect(res.status).toBe(200);
            ID2 = res.body.data.id;
        });

        test('delete todo', async () => {
            const res = await req
                .delete(`/api/todo/${ID2}`);
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Record deleted');
        });
    });
    //* *** Negative Test Cases ****/

    describe('Negative Test Cases', () => {
        test('negative create case', async () => {
            const newUser = {};
            const res = await req
                .post('/api/todo')
                .send(newUser);
            expect(res.status).toBe(400);
        });
        test('negative get todo list', async () => {
            const res = await req.get('/api/todo').query({ limit: '50', skip: '50' });
            expect(res.body.status).toBe(400);
        });

        test('negative get single todo', async () => {
            const res = await req.get(`/api/todo/${id}`);
            expect(res.status).toBe(400);
        });

        test('negative update todo', async () => {
            const updateUser = {};
            const res = await req
                .put('/api/todo')
                .send(updateUser);
            expect(res.status).toBe(400);
        });

        //* *** Test Case for DELETE API to delete the user ****/

        test('negative delete todo', async () => {
            const res = await req
                .delete(`/api/todo/${''}`);
            expect(res.status).toBe(404);
        });
    });
    afterAll(async () => {
        Database.close();
    });
});
