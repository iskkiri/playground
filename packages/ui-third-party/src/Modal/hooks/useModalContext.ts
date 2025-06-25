import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

export default function useModalContext() {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error('Modal components must be wrapped in <Modal />');
  }

  return context;
}
