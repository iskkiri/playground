import { type InputHTMLAttributes } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { checkBoxCss } from './CheckBox.styles';
import FeatherIcons from '@repo/icons/featherIcons';
import { commonCss } from '#src/styles/common.styles';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  cssStyle?: Interpolation<Theme>;
}

export default function CheckBox({ children, cssStyle, ...restProps }: CheckBoxProps) {
  return (
    <label
      css={[
        checkBoxCss.label,
        restProps.checked && checkBoxCss.checked,
        restProps.disabled && checkBoxCss.disabled,
        cssStyle,
      ]}
    >
      <input type="checkbox" {...restProps} css={commonCss.srOnly} />
      <FeatherIcons.CheckSquare
        css={[
          checkBoxCss.icon,
          !restProps.disabled && restProps.checked && checkBoxCss.iconChecked,
        ]}
        aria-hidden="true"
      />
      {children && children}
    </label>
  );
}
