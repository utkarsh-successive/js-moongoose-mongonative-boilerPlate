import * as supertest from 'supertest';
import config from '../config/configuration';
import Server from '../Server';

describe('Router test check', () => {
    const server = new Server(config);
    const responseApp = server.bootstrap();
    const request = supertest(responseApp);

    describe('/App-test', () => {
        test('return apiResponse', async () => {
            const dataResponse = await request.get('/api/health-check');
            expect(dataResponse.text).toBe('I am OK');
        });

        test('return version response', async () => {
            const dataResponse = await request.get('/api/version');
            expect(dataResponse.body.version).toBe('1.0.0');
        });
        test('return swagger response', async () => {
            const dataResponse = await request.get('/api-docs.json');
            expect(dataResponse.status).toBe(200);
        });
    });
});
