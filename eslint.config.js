import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules', 'ref'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  // ADR 0011: src/engine/** is pure TypeScript — no React, no DOM. The notation
  // logic must stay unit-testable without a DOM, and reusable by any renderer.
  // The engine directory itself lands in M1; the boundary is enforced from M0 so
  // it can never be crossed by accident.
  {
    files: ['src/engine/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'react', message: 'src/engine/** must stay pure TypeScript (ADR 0011).' },
            { name: 'react-dom', message: 'src/engine/** must stay pure TypeScript (ADR 0011).' },
            {
              name: 'react-dom/client',
              message: 'src/engine/** must stay pure TypeScript (ADR 0011).',
            },
            {
              name: 'react/jsx-runtime',
              message: 'src/engine/** must stay pure TypeScript (ADR 0011).',
            },
          ],
          patterns: [
            {
              group: ['react', 'react-*', '*.css', '../ui/*', '@/ui/*'],
              message: 'src/engine/** must not import React, styles, or UI code (ADR 0011).',
            },
          ],
        },
      ],
      // The DOM is not merely un-imported, it is unavailable: no global reach
      // for `document`, `window`, or friends either.
      'no-restricted-globals': [
        'error',
        ...['window', 'document', 'navigator', 'location', 'localStorage', 'HTMLElement'].map(
          (name) => ({ name, message: 'src/engine/** must not touch the DOM (ADR 0011).' }),
        ),
      ],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', 'src/test/**/*.ts'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ['*.config.{ts,js}', 'eslint.config.js'],
    languageOptions: { globals: globals.node },
  },
);
