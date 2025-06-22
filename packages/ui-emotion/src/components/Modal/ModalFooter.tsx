import { modalCss } from './styles/modal.styles';
import type { Interpolation, Theme } from '@emotion/react';

interface ModalFooterProps {
  children: React.ReactNode;
  cssStyle?: Interpolation<Theme>;
}

export default function ModalFooter({ children, cssStyle }: ModalFooterProps) {
  return <div css={[modalCss.footer, cssStyle]}>{children}</div>;
}
