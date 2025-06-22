import type { Interpolation, Theme } from '@emotion/react';
import { modalCss } from './styles/modal.styles';

interface ModalHeaderProps {
  children: React.ReactNode;
  cssStyle?: Interpolation<Theme>;
}

export default function ModalHeader({ children, cssStyle }: ModalHeaderProps) {
  return <div css={[modalCss.header, cssStyle]}>{children}</div>;
}
