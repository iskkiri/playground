import { useContext } from 'react';
import { TiptapDispatchContext, TiptapStateContext } from '../context/TiptapContext';

export function useTiptapStateContext() {
  const context = useContext(TiptapStateContext);

  if (context === null) {
    throw new Error('Tiptap components must be wrapped in <TiptapProvider />');
  }

  return context;
}

export function useTiptapDispatchContext() {
  const context = useContext(TiptapDispatchContext);

  if (context === null) {
    throw new Error('Tiptap components must be wrapped in <TiptapProvider />');
  }

  return context;
}