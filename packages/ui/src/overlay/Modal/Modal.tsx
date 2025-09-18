'use client';

import './styles/modal-animations.scss';

import { useState, useCallback, useMemo } from 'react';
import { ModalDispatchContext, ModalStateContext } from './context/ModalContext';
import ModalTrigger from './components/ModalTrigger';
import ModalCloseTrigger from './components/ModalCloseTrigger';
import ModalHeader from './components/ModalHeader';
import ModalTitle from './components/ModalTitle';
import ModalBody from './components/ModalBody';
import ModalFooter from './components/ModalFooter';
import ModalContent from './components/ModalContent';

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
