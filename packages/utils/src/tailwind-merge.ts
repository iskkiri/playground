import { extendTailwindMerge } from 'tailwind-merge';

const createPixelClassGroup = (prefix: string) => [...Array(101)].map((_, i) => `${prefix}-${i}`);

// 커스텀 tailwind-merge 설정
export const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // https://github.com/dcastil/tailwind-merge/issues/368#issuecomment-1890460054
      'font-size': createPixelClassGroup('text'), // [text-0, text-1, text-2, ... text-100]
      rounded: createPixelClassGroup('rounded'), // [rounded-0, rounded-1, rounded-2, ... rounded-100]
    },
  },
});
