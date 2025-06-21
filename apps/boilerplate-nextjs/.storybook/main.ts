import { join, dirname } from 'path';
import type { StorybookConfig } from '@storybook/nextjs';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {
      nextConfigPath: require.resolve('../next.config.ts'),
    },
  },
  // 정적 파일 경로 설정
  staticDirs: [
    '../public',
    {
      from: '../public/fonts',
      to: 'public/fonts',
    },
  ],
  webpackFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      // 절대 경로 설정
      new TsconfigPathsPlugin({ extensions: config.resolve.extensions }),
    ];

    if (config.module?.rules) {
      config.module.rules = [
        ...config.module.rules.map((rule) => {
          if (!rule || rule === '...') {
            return rule;
          }
          if (rule.test && /svg/.test(String(rule.test))) {
            return { ...rule, exclude: /\.svg$/i };
          }
          return rule;
        }),
        // SVG 컴포넌트 설정
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                prettier: false,
                svgo: true,
                titleProp: true,
                svgoConfig: {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: { removeViewBox: false },
                      },
                      // Enable figma's wrong mask-type attribute work
                      removeRasterImages: false,
                      removeStyleElement: false,
                      removeUnknownsAndDefaults: false,
                      // Enable svgr's svg to fill the size
                      removeViewBox: false,
                    },
                  ],
                },
              },
            },
          ],
        },
      ];
    }

    return config;
  },
};
export default config;
