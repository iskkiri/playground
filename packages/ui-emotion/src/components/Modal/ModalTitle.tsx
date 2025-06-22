import type { Interpolation, Theme } from '@emotion/react';
import { modalCss } from './styles/modal.styles';

interface ModalTitleProps {
  children: React.ReactNode;
  cssStyle?: Interpolation<Theme>;
}

export default function ModalTitle({ children, cssStyle }: ModalTitleProps) {
  return <h2 css={[modalCss.title, cssStyle]}>{children}</h2>;
}
