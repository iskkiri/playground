import { extendTailwindMerge } from 'tailwind-merge';

const px0_100 = [...Array(101)].map((_, i) => `text-${i}`);

// 커스텀 tailwind-merge 설정
export const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // https://github.com/dcastil/tailwind-merge/issues/368#issuecomment-1890460054
      'font-size': px0_100,
    },
  },
});
