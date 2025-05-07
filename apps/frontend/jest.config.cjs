/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',

  // Transformatoren für verschiedene Dateitypen
  transform: {
    // TypeScript-Dateien mit ts-jest transformieren
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json', // Verwende die neue tsconfig
        isolatedModules: true,
      },
    ],
    // SVGs und andere Assets mit dem korrekten Transformer behandeln
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest-transforms/fileTransformer.cjs',
  },

  // Teste alle Dateien im __tests__ Ordner oder mit .test/.spec Erweiterung
  testMatch: ['**/__tests__/**/*.test.tsx'],

  // Modul-Mapping für bessere Auflösung
  moduleNameMapper: {
    // CSS-Module und Stilimporte als leere Module behandeln
    '\\.css$': 'identity-obj-proxy',
    // SVG-Importe
    '\\.svg$': '<rootDir>/jest-transforms/fileTransformer.cjs',
  },

  // Setup-Dateien, die vor jedem Test ausgeführt werden
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Hilft bei der Auflösung von Modulen in pnpm
  moduleDirectories: ['node_modules', '../../node_modules'],

  // Verbesserte Testumgebung
  testTimeout: 10000,
  clearMocks: true,

  // Besser mit passWithNoTests für den Anfang
  passWithNoTests: true,
};
