import { config } from '@repo/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
    },
  },
];
