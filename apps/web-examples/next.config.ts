import type { NextConfig } from 'next';
import { validateEnv } from '@/_utils/validateEnv';

// 환경변수 검증
validateEnv();

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  // Learn more here - https://nextjs.org/docs/advanced-features/compiler#module-transpilation
  // Required for UI css to be transpiled correctly 👇
  transpilePackages: ['jotai-devtools'],
  images: {
    remotePatterns: [
      // 더미 데이터 이미지로 인한 임시 처리
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
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
                      overrides: {
                        cleanupIds: false,
                        removeViewBox: false,
                      },
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
        as: '*.js',
      },
    },
  },

  // https://react-svgr.com/docs/next/
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
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
                      overrides: {
                        cleanupIds: false,
                        removeViewBox: false,
                      },
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
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
