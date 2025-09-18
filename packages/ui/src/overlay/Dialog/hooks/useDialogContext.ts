import { useContext } from 'react';
import { DialogDispatchContext, DialogStateContext } from '../context/DialogContext';

export function useDialogStateContext() {
  const context = useContext(DialogStateContext);

  if (context === null) {
    throw new Error('Dialog components must be wrapped in <Dialog />');
  }

  return context;
}

export function useDialogDispatchContext() {
  const context = useContext(DialogDispatchContext);

  if (context === null) {
    throw new Error('Dialog components must be wrapped in <Dialog />');
  }

  return context;
}
