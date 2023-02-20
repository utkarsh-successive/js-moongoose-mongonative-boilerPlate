import PatternMatecherHelper from './PatternMatecherHelper';

describe('Testing regex', () => {
    test('Checking', () => {
        const str = PatternMatecherHelper('abcd');
        expect(str).toBe(str);
    });
});
