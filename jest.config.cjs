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
    },
    {
      displayName: 'frontend',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/apps/frontend/**/__tests__/**/*.test.tsx'],
      rootDir: './',
      transform: {
        '^.+\\.tsx?$': [
          'ts-jest',
          {
            tsconfig: 'apps/frontend/tsconfig.jest.json',
          },
        ],
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/apps/frontend/jest-transforms/fileTransformer.cjs',
      },
      moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
        '\\.svg$':
          '<rootDir>/apps/frontend/jest-transforms/fileTransformer.cjs',
      },
      setupFilesAfterEnv: ['<rootDir>/apps/frontend/jest.setup.ts'],
      moduleDirectories: [
        'node_modules',
        '<rootDir>/node_modules',
        '../../node_modules',
      ],
      testPathIgnorePatterns: ['/node_modules/'],
    },
  ],
};
