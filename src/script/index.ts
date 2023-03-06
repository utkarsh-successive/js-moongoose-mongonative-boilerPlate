import * as fs from 'node:fs';
import { faker } from '@faker-js/faker';
// import mongoose from 'mongoose';

class Script {
    public static getInstance() {
        if (!Script.instance) {
            Script.instance = new Script();
        }
        return Script.instance;
    }

    // eslint-disable-next-line no-use-before-define
    private static instance: Script;

    // eslint-disable-next-line class-methods-use-this
    public generateUserData(totalDocs: number) {
        const result = [];
        for (let i = 0; i < totalDocs; i += 1) {
            const personData = {
                name: 'sandip',
                email: faker.internet.email(),
                // age: faker.date.birthdate(),
                age: 15,
                address: {
                    flat_no: 102,
                    city: faker.address.city(),
                    state: faker.address.state(),
                },
                mobile_no: faker.phone.number(),
            };
            result.push(personData);
        }
        return result;
    }

    // eslint-disable-next-line class-methods-use-this
    public generateNestedUserData(totalDocs: number): any {
        const result = [];
        for (let i = 0; i < totalDocs; i += 1) {
            const personData = {
                name: faker.name.firstName(),
                email: faker.internet.email(),
                age: faker.date.birthdate(),
                address: {
                    flat_no: faker.date.birthdate(),
                    city: faker.address.city(),
                    state: faker.address.state(),
                },
                mobile_no: faker.phone.number(),
            };
            result.push(personData);
        }
        return result;
    }

    // eslint-disable-next-line class-methods-use-this
    public storeId(ObjectIds: any, collectionName: string) {
        let existingData;
        const pathExists = fs?.existsSync(
            `src/script/${collectionName}Ids.json`,
        );
        if (pathExists) {
            existingData = fs?.readFileSync(
                `src/script/${collectionName}Ids.json`,
                { encoding: 'utf-8' },
            );
        }
        const data = existingData ? JSON.parse(existingData) : [];
        data.push(...ObjectIds);
        fs?.writeFileSync(
            `src/script/${collectionName}Ids.json`,
            JSON.stringify(data, null, 2),
        );
    }

    // eslint-disable-next-line class-methods-use-this
    public readIds(collectionName: string, noIds: number) {
        const ids: string[] = JSON.parse(
            fs?.readFileSync(`src/script/${collectionName}Ids.json`, {
                encoding: 'utf-8',
            }),
        );
        const extractedIds = ids.splice(0, noIds);
        fs?.writeFileSync(
            `src/script/${collectionName}Ids.json`,
            JSON.stringify(ids),
        );
        return extractedIds;
    }
}

export default Script.getInstance();
