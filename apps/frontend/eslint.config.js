import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  // Haupt-TypeScript-Konfiguration (unverändert)
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // Neue Konfiguration für Jest-Setup-Dateien
  {
    files: ['**/jest.setup*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Deaktiviere die any-Regel für Jest-Setup-Dateien
    },
  },
  // Neue Konfiguration für CommonJS-Dateien (jest.config.cjs, etc.)
  {
    files: ['**/*.cjs', '**/jest.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        module: true,
        require: true,
      },
    },
  },
  // Spezielle Konfiguration für die Jest-Transformer
  {
    files: ['**/jest-transforms/**'],
    languageOptions: {
      globals: {
        ...globals.node,
        module: true,
        require: true,
      },
    },
  }
);
