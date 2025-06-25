'use client';

import './styles/modal.scss';

import ReactModal from 'react-modal';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import type { BaseModalProps } from './types/modal.types';
import ModalTitle from './ModalTitle';
import ModalCloseTrigger from './ModalCloseTrigger';
import { ModalContext } from './context/ModalContext';
import { cn } from '@repo/utils/cn';

export const CLOSE_TIMEOUT_MS = 150;
export const overlayStyle: ReactModal.Styles['overlay'] = {
  backgroundColor: 'transparent',
  zIndex: 1000,
};

export const overlayDimStyle: ReactModal.Styles['overlay'] = {
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
};

export interface ModalProps extends BaseModalProps, React.ComponentProps<typeof ReactModal> {
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children, className, ...props }: ModalProps) {
  return (
    <ModalContext.Provider value={{ isOpen, onClose, ...props }}>
      <ReactModal
        {...props}
        isOpen={isOpen}
        style={{ overlay: overlayDimStyle, ...props.style }}
        closeTimeoutMS={CLOSE_TIMEOUT_MS}
        className={cn('modal', className)}
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
