import { createContext } from 'react';
import type { UseFloatingReturn, UseInteractionsReturn } from '@floating-ui/react';

export type PopoverContextType =
  | ({
      isOpen: boolean;
      setIsOpen: (open: boolean) => void;
    } & UseInteractionsReturn &
      UseFloatingReturn)
  | null;

export const PopoverContext = createContext<PopoverContextType>(null);
