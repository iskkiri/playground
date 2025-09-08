import { useContext } from 'react';
import { ModalDispatchContext, ModalStateContext } from '../context/ModalContext';

export function useModalStateContext() {
  const context = useContext(ModalStateContext);

  if (context === null) {
    throw new Error('Modal components must be wrapped in <Modal />');
  }

  return context;
}

export function useModalDispatchContext() {
  const context = useContext(ModalDispatchContext);

  if (context === null) {
    throw new Error('Modal components must be wrapped in <Modal />');
  }

  return context;
}
