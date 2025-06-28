import type { Config } from 'tailwindcss';

type PixelObj = Record<number, string>;

const px0_10 = { ...[...Array(11)].map((_, i) => `${i}px`) } as PixelObj;
const px0_100 = { ...[...Array(101)].map((_, i) => `${i}px`) } as PixelObj;
const px0_600 = { ...[...Array(601)].map((_, i) => `${i}px`) } as PixelObj;

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: px0_10,
      borderRadius: px0_100,
      fontSize: px0_100,
      lineHeight: { ...px0_100, normal: 'normal' },
      minWidth: px0_600,
      maxWidth: px0_600,
      minHeight: px0_600,
      maxHeight: px0_600,
      spacing: px0_600,
      letterSpacing: { normal: 'normal' },
    },
  },
  plugins: [],
};

export default config;
