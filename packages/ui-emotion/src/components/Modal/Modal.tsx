import ReactModal from 'react-modal';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import type { BaseModalProps } from './types/modal.types';
import { modalCss, overlayDimStyle } from './styles/modal.styles';
import ModalTitle from './ModalTitle';
import ModalCloseTrigger from './ModalCloseTrigger';
import { ModalContext } from './context/ModalContext';
import type { Interpolation, Theme } from '@emotion/react';

export const CLOSE_TIMEOUT_MS = 150;

export interface ModalProps extends BaseModalProps, React.ComponentProps<typeof ReactModal> {
  children: React.ReactNode;
  cssStyle?: Interpolation<Theme>;
}

export default function Modal({ isOpen, onClose, children, cssStyle, ...props }: ModalProps) {
  return (
    <ModalContext.Provider value={{ isOpen, onClose, ...props }}>
      <ReactModal
        {...props}
        isOpen={isOpen}
        style={{ overlay: overlayDimStyle, ...props.style }}
        closeTimeoutMS={CLOSE_TIMEOUT_MS}
        css={[modalCss.modal, cssStyle]}
        ariaHideApp={process.env.NODE_ENV === 'production'}
      >
        {children}
      </ReactModal>
    </ModalContext.Provider>
  );
}

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.CloseTrigger = ModalCloseTrigger;
