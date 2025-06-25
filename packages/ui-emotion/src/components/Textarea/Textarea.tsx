import { type TextareaHTMLAttributes } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { textareaCss } from './Textarea.styles';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isError?: boolean;
  cssStyle?: Interpolation<Theme>;
}

export default function Textarea({ cssStyle, isError, ...restProps }: TextareaProps) {
  return (
    <textarea
      {...restProps}
      css={[
        textareaCss.textarea,
        !restProps.disabled && !isError && textareaCss.hoverFocus,
        restProps.disabled && textareaCss.disabled,
        isError && textareaCss.error,
        cssStyle,
      ]}
    />
  );
}
