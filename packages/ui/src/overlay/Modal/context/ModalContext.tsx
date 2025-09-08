import { createContext } from 'react';
import type { ModalDispatchContextType, ModalStateContextType } from '../types/modal.types';

export const ModalStateContext = createContext<ModalStateContextType | null>(null);

export const ModalDispatchContext = createContext<ModalDispatchContextType>({
  onOpen: () => {
    throw new Error(
      'ModalDispatchProvider is missing or useModal must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );
  },
  onClose: () => {
    throw new Error(
      'ModalDispatchProvider is missing or useModal must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );
  },
});
