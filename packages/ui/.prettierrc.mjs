import { config as baseConfig } from '@repo/prettier-config/base';

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  ...baseConfig,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './globals.css',
  tailwindFunctions: ['clsx', 'cn', 'cva'],
};

export default config;
