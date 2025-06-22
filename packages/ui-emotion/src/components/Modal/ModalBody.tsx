import type { Interpolation, Theme } from '@emotion/react';
import { modalCss } from './styles/modal.styles';

interface ModalBodyProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  cssStyle?: Interpolation<Theme>;
}

export default function ModalBody({ children, cssStyle, ...props }: ModalBodyProps) {
  return (
    <div css={[modalCss.body, cssStyle]} {...props}>
      {children}
    </div>
  );
}
