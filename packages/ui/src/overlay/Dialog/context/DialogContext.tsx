import { createContext } from 'react';
import type { DialogDispatchContextType, DialogStateContextType } from '../types/dialog.types';

export const DialogStateContext = createContext<DialogStateContextType | null>(null);

export const DialogDispatchContext = createContext<DialogDispatchContextType>({
  onOpen: () => {
    throw new Error(
      'DialogDispatchProvider is missing or useDialog must be called within a DialogProvider. Please ensure that your component is wrapped within <DialogProvider>.'
    );
  },
  onClose: () => {
    throw new Error(
      'DialogDispatchProvider is missing or useDialog must be called within a DialogProvider. Please ensure that your component is wrapped within <DialogProvider>.'
    );
  },
});