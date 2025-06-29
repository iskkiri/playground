'use client';

import { pulseLoadingCss } from './PulseLoading.styles';

/**
 * @docs https://cssloaders.github.io/
 */
export default function PulseLoading() {
  return <div css={pulseLoadingCss.block} className="pulse-loading" />;
}
