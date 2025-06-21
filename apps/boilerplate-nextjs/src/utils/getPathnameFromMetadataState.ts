/**
 * 동적 메타데이터를 설정할 경우
 * @docs https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
 * https://github.com/vercel/next.js/discussions/50189#discussioncomment-9224262
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPathnameFromMetadataState = (state: any): string | undefined => {
  const res = Object.getOwnPropertySymbols(state || {})
    .map((p) => state[p])
    // eslint-disable-next-line no-prototype-builtins
    .find((state) => state?.hasOwnProperty?.('urlPathname'));

  return res?.urlPathname.replace(/\?.+/, '');
};
