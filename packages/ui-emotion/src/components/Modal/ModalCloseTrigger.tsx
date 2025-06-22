import { cloneElement, isValidElement } from 'react';
import useModalContext from './hooks/useModalContext';
import { modalCss } from './styles/modal.styles';

interface ModalCloseTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export default function ModalCloseTrigger({ children, asChild, ...props }: ModalCloseTriggerProps) {
  const { onClose } = useModalContext();

  if (asChild && isValidElement(children)) {
    const buttonProps: React.HTMLAttributes<HTMLButtonElement> = {
      ...props,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose();
        props.onClick?.(e);
      },
    };

    return cloneElement(children, buttonProps);
  }

  return (
    <button onClick={onClose} type="button" css={modalCss.closeTrigger} {...props}>
      {children}
    </button>
  );
}
