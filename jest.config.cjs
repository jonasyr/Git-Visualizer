/** @type {import('jest').Config} */
module.exports = {
  
  projects: [
    {
      displayName: 'backend',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/apps/backend/**/__tests__/**/*.test.ts'],
      moduleDirectories: ['node_modules', 'node_modules', '../../node_modules'],
      rootDir: './',
      testPathIgnorePatterns: ['/node_modules/'],
      globals: {
        'ts-jest': {
          tsconfig: 'apps/backend/tsconfig.json',
        },
      },
    },
    {
      displayName: 'frontend',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      rootDir: './',
      testMatch: ['<rootDir>/apps/frontend/**/__tests__/**/*.test.tsx'],
      transform: {
        // ➞ TypeScript Dateien mit ts-jest bearbeiten
        '^.+\\.tsx?$': [
          'ts-jest',
          { tsconfig: 'apps/frontend/tsconfig.jest.json' },
        ],
        // ➞ Assets stubben
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          'jest-transform-stub',
      },

      moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
        '\\.(svg|jpg|jpeg|png|gif|webp)$': '<rootDir>/apps/frontend/__mocks__/fileMock.cjs',
        '^/vite\\.svg$': '<rootDir>/apps/frontend/__mocks__/fileMock.cjs',
        '^ansi-styles$': '<rootDir>/apps/frontend/__mocks__/ansi-styles.cjs',
      },
      setupFilesAfterEnv: ['<rootDir>/apps/frontend/jest.setup.ts'],
      moduleDirectories: ['node_modules', '<rootDir>/apps/frontend/node_modules', '<rootDir>/node_modules', '../../node_modules'],
      testPathIgnorePatterns: ['/node_modules/'],
      extensionsToTreatAsEsm: ['.ts', '.tsx'],
    },
  ],
};
