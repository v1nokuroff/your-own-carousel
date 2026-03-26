/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jsdom',
    clearMocks: true,
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
        '\\.(css|less|scss|sass)$': '<rootDir>/src/test/styleMock.ts',
        '^@/root/(.*)$': '<rootDir>/src/system/$1',
        '^@/modules/(.*)$': '<rootDir>/src/modules/$1',
        '^@/assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@/components/(.*)$': '<rootDir>/src/components/$1',
        '^@/store/(.*)$': '<rootDir>/src/system/store/$1',
        '^@/typings$': '<rootDir>/src/typings',
        '^@/typings/(.*)$': '<rootDir>/src/typings/$1',
        '^@/translations$': '<rootDir>/src/translations',
    },
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: 'tsconfig.json',
            },
        ],
    },
};
