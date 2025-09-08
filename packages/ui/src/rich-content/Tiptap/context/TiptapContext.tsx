import { createContext } from 'react';
import type { TiptapDispatchContextType, TiptapStateContextType } from '../types/tiptap.types';

export const TiptapStateContext = createContext<TiptapStateContextType | null>(null);

export const TiptapDispatchContext = createContext<TiptapDispatchContextType>({
  setIsLinkFormOpen: () => {
    throw new Error(
      'TiptapDispatchProvider is missing or useTiptap must be called within a TiptapProvider. Please ensure that your component is wrapped within <TiptapProvider>.'
    );
  },
});