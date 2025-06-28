'use client';

import { spinLoadingCss } from './SpinLoading.styles';

interface SpinLoadingProps {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
}

/**
 * @docs https://cssloaders.github.io/
 */
export default function SpinLoading({
  size = 48,
  width = 48,
  height = 48,
  color,
}: SpinLoadingProps) {
  return (
    <div
      css={spinLoadingCss.block}
      style={{
        /**
         * width, height가 있을 경우 size는 무시
         * width, height의 우선순위가 size보다 높음
         */
        width: width || size,
        height: height || size,
        borderBottomColor: color,
      }}
    />
  );
}
