/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',

  // Transformatoren für verschiedene Dateitypen
  transform: {
  // TypeScript-Dateien mit ts-jest transformieren
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
        isolatedModules: true,
      },
    ],
    // Statt eigener Transformer: jest-transform-stub
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',
  },

  // Teste alle Dateien im __tests__ Ordner oder mit .test/.spec Erweiterung
  testMatch: ['**/__tests__/**/*.test.tsx'],

  moduleNameMapper: {
    // CSS-Module
    '\\.css$': 'identity-obj-proxy',
    // Stub für Bild- und SVG-Imports
    '\\.(svg|jpg|jpeg|png|gif|webp)$': '<rootDir>/__mocks__/fileMock.cjs',
  },

// Setup-Dateien, die vor jedem Test ausgeführt werden
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

// Hilft bei der Auflösung von Modulen in pnpm
  moduleDirectories: ['node_modules', '../../node_modules'],

  testTimeout: 10000,
  clearMocks: true,
  passWithNoTests: true,
};
