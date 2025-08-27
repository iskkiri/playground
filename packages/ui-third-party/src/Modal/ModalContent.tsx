import ReactModal from 'react-modal';
import { overlayDimStyle } from './styles/overlay.styles';
import { cn } from '@repo/utils/cn';
import { useModalDispatchContext, useModalStateContext } from './hooks/useModalContext';

const CLOSE_TIMEOUT_MS = 150;

interface ModalContentProps extends Omit<React.ComponentProps<typeof ReactModal>, 'isOpen'> {
  children: React.ReactNode;
}

export default function ModalContent({ className, style, ...props }: ModalContentProps) {
  const { isOpen } = useModalStateContext();
  const { onClose } = useModalDispatchContext();

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{ overlay: overlayDimStyle, ...style }}
      closeTimeoutMS={CLOSE_TIMEOUT_MS}
      className={cn('modal', className)}
      ariaHideApp={process.env.NODE_ENV === 'production'}
      {...props}
    />
  );
}
