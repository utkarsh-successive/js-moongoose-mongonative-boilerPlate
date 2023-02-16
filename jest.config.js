/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testTimeout: 15000,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['dist'],
    collectCoverageFrom: [
        'src/**/{!(index),}.ts',
    ],
    coveragePathIgnorePatterns: [
        '<rootDir>/src/libs',
        '<rootDir>/src/middleware',
        '<rootDir>/src/Server.ts',
    ],

};
