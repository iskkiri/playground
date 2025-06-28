import { barLoadingCss } from './BarLoading.styles';

/**
 * @docs https://cssloaders.github.io/
 */
export default function BarLoading() {
  return <div css={barLoadingCss.block} className="bar-loading" />;
}
