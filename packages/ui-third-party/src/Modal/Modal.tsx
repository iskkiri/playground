'use client';

import './styles/modal.scss';

import { useState, useCallback, useMemo } from 'react';
import { ModalDispatchContext, ModalStateContext } from './context/ModalContext';
import ModalTrigger from './ModalTrigger';
import ModalCloseTrigger from './ModalCloseTrigger';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalContent from './ModalContent';

export interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean; // Controlled
  onOpenChange?(open: boolean): void; // Controlled
  initialOpen?: boolean; // Uncontrolled
}

export default function Modal({ children, isOpen, onOpenChange, initialOpen = false }: ModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const actualOpen = isOpen ?? uncontrolledOpen;
  const setIsOpen = onOpenChange ?? setUncontrolledOpen;

  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const onOpen = useCallback(() => setIsOpen(true), [setIsOpen]);

  const stateContextValue = useMemo(() => ({ isOpen: actualOpen }), [actualOpen]);

  const dispatchContextValue = useMemo(() => ({ onOpen, onClose }), [onClose, onOpen]);

  return (
    <ModalStateContext.Provider value={stateContextValue}>
      <ModalDispatchContext.Provider value={dispatchContextValue}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.CloseTrigger = ModalCloseTrigger;
