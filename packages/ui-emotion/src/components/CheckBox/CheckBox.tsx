import { type InputHTMLAttributes } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { checkBoxCss } from './CheckBox.styles';
import FeatherIcons from '@repo/theme/featherIcons';
import { commonCss } from '#src/styles/common.styles';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  cssStyle?: Interpolation<Theme>;
}

export default function CheckBox({ children, cssStyle, ...restProps }: CheckBoxProps) {
  return (
    <label css={[checkBoxCss.label, cssStyle]}>
      <input type="checkbox" {...restProps} css={commonCss.srOnly} />
      <FeatherIcons.CheckSquare
        color={restProps.checked ? '#4E86FF' : '#C1C7CD'}
        css={checkBoxCss.icon}
        aria-hidden="true"
      />
      {children && children}
    </label>
  );
}
