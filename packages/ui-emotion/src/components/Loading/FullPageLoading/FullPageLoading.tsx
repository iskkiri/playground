'use client';

import { fullPageLoadingCss } from './FullPageLoading.styles';
import SpinLoading from '../SpinLoading/SpinLoading';

export default function FullPageLoading() {
  return (
    <div css={fullPageLoadingCss.page}>
      <SpinLoading size={64} />
    </div>
  );
}
