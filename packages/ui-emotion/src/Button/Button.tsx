import { useMemo } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { buttonCss, buttonTypeCss } from './Button.styles';

export type ButtonType = keyof typeof buttonTypeCss;
interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix' | 'suffix'> {
  buttonType: ButtonType;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  cssStyle?: Interpolation<Theme>;
}

export default function Button({
  buttonType,
  prefix,
  suffix,
  children,
  cssStyle,
  ...restProps
}: ButtonProps) {
  const buttonTypeStyle = useMemo(() => buttonTypeCss[buttonType], [buttonType]);

  return (
    <button
      {...restProps}
      type={restProps.type ?? 'button'}
      css={[buttonCss.button, buttonTypeStyle, cssStyle]}
    >
      {prefix}
      {children}
      {suffix}
    </button>
  );
}
