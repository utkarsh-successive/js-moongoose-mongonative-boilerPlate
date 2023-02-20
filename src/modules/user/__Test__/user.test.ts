// import { MongoMemoryServer } from 'mongodb-memory-server';
// import * as supertest from 'supertest';
// import config from '../../../config/configuration';
// import Server from '../../../Server';
// import Database from '../../../libs/database/Database';

// describe('For user endpoints', () => {
//     const server = new Server(config);
//     let mongoServer;
//     let mongoUri;
//     let req;
//     let token;
//     let ID;
//     let ID2;
//     let id;
//     const pass = 'Training@node';

//     beforeAll(async () => {
//         const app = await server.bootstrap();
//         req = supertest(app);
//         mongoServer = await MongoMemoryServer.create();
//         mongoUri = mongoServer.getUri();
//         await Database.open(mongoUri);
//         await req.post('/api/users/registration')
//             .send({
//                 email: 'Anu@successive.tech',
//                 password: 'Training@123',
//                 name: 'Anuj',
//             });

//         const res = await req.post('/api/users/login')
//             .send({
//                 email: 'Anu@successive.tech',
//                 password: 'Training@123',
//             });

//         token = res.body.data.data.token;
//     });
//     //* *** Positive Test Cases ****/

//     describe('Positive Test cases', () => {
//         test('Create user', async () => {
//             const newUser = {
//                 first_name: 'Trainee',
//                 last_name: 'Team',
//                 email: 'Trainee@gmail.com',
//                 password: pass,
//             };
//             const res = await req
//                 .post('/api/users/')
//                 .set('Authorization', token)
//                 .send(newUser);
//             expect(res.status).toBe(200);
//             expect(res.body.data.first_name).toBe(newUser.first_name);
//             expect(res.body.data.last_name).toBe(newUser.last_name);
//             ID = res.body.data.id;
//         });

//         test('Get all users', async () => {
//             const res = await req.get('/api/users/').set('Authorization', token);
//             expect(res.status).toBe(200);
//             expect(res.body.data).not.toBeUndefined();
//         });

//         test('Get user', async () => {
//             const res = await req.get(`/api/users/${ID}`)
//                 .set('Authorization', token);
//             expect(res.status).toBe(200);
//         });

//         test('Update user', async () => {
//             const updateUser = {
//                 id: `${ID}`,
//                 first_name: 'Arjun',
//                 last_name: 'Ali',
//                 email: 'Arjun@gmail.com',
//             };
//             const res = await req
//                 .put('/api/users/')
//                 .set('Authorization', token)
//                 .send(updateUser);
//             expect(res.status).toBe(200);
//             expect(res.body.data.first_name).toBe(updateUser.first_name);
//             expect(res.body.data.last_name).toBe(updateUser.last_name);
//             ID2 = res.body.data.id;
//         });

//         test('Delete', async () => {
//             const res = await req
//                 .delete('/api/users/')
//                 .set('Authorization', token)
//                 .send({ id: ID2 });
//             expect(res.status).toBe(200);
//             expect(res.body.message).toBe('User deleted');
//         });
//     });
//     //* *** Negative Test Cases ****/

//     describe('Negative Test Cases', () => {
//         test('Negative Create user', async () => {
//             const newUser = {};
//             const res = await req
//                 .post('/api/users/')
//                 .set('Authorization', token)
//                 .send(newUser);
//             expect(res.status).toBe(400);
//             expect(res.body.message).toBe('Bad Request');
//         });

//         test('Negative Get all users', async () => {
//             const res = await req.get('/api/users/')
//                 .set('Authorization', token)
//                 .query({ limit: '5', skip: '5' });
//             expect(res.body.status).toBe(400);
//             expect(res.body.message).toBe('Data not found');
//         });

//         test('Negative Get user', async () => {
//             const res = await req.get(`/api/users/${id}`)
//                 .set('Authorization', token);
//             expect(res.status).toBe(400);
//         });

//         test('Negative Update user', async () => {
//             const updateUser = {};
//             const res = await req
//                 .put('/api/users/')
//                 .set('Authorization', token)
//                 .send(updateUser);
//             expect(res.status).toBe(400);
//             expect(res.body.message).toBe('Bad Request');
//         });

//         test('Negative Delete', async () => {
//             const res = await req
//                 .delete('/api/users/')
//                 .set('Authorization', token)
//                 .send({ });
//             expect(res.status).toBe(400);
//             expect(res.body.message).toBe('Bad Request');
//         });
//     });
//     afterAll(async () => {
//         Database.close();
//     });
// });
