import { type InputHTMLAttributes } from 'react';
import { radioCss } from './Radio.styles';
import type { Interpolation, Theme } from '@emotion/react';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  cssStyle?: Interpolation<Theme>;
}

export default function Radio({ children, cssStyle, ...restProps }: RadioProps) {
  return (
    <label css={[radioCss.label, restProps.disabled && radioCss.disabled, cssStyle]}>
      <input type="radio" {...restProps} />
      {children && children}
    </label>
  );
}
