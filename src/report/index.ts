import * as fs from 'node:fs';

const addLogReport = (
    opration: string,
    timeConsumed: number,
    totalDataProcessed: number,
) => {
    // logger.info('| Generating Report...');
    console.log('🚀 ~ file: index.ts:10 ~ | Generating Report...:');
    let existingData;
    const pathExists = fs?.existsSync(`src/report/${opration}.json`);
    if (pathExists) {
        console.log('');
        existingData = fs?.readFileSync(`src/report/${opration}.json`, { encoding: 'utf-8' });
    }
    const data = existingData ? JSON.parse(existingData) : [];
    const result = {
        opration,
        timeConsumed,
        totalDataProcessed,
    };
    data.push(result);
    fs?.writeFileSync(`src/report/${opration}.json`, JSON.stringify(data, null, 2));
    // logger.info('| Report Added');
    console.log('🚀 ~ file: index.ts:26 ~ | Report Added:');
};

export default addLogReport;
