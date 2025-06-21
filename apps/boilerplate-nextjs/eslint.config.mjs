import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import pluginQuery from '@tanstack/eslint-plugin-query';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
});

const eslintConfig = [
  // ESLint recommended 규칙들
  ...compat.extends('eslint:recommended'),
  // Next.js 관련 설정들
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // TypeScript 관련 설정
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@tanstack/query': pluginQuery,
    },
    rules: {
      // 기본 no-unused-vars 끄기
      'no-unused-vars': 'off',

      // TypeScript no-unused-vars 규칙
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // TanStack Query 관련 규칙
      '@tanstack/query/exhaustive-deps': 'warn',

      // TypeScript empty object type 규칙
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'with-single-extends',
        },
      ],
    },
  },
];

export default eslintConfig;
