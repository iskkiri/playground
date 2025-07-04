import { config } from '@repo/eslint-config/react-internal';
import storybook from 'eslint-plugin-storybook';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
    },
  },
  ...storybook.configs['flat/recommended'],
];
