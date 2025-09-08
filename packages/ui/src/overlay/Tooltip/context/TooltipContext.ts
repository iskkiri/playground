import type { UseFloatingReturn, UseInteractionsReturn } from '@floating-ui/react';
import { createContext } from 'react';

type Disclosure = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export type TooltipContextType = (Disclosure & UseInteractionsReturn & UseFloatingReturn) | null;

export const TooltipContext = createContext<TooltipContextType>(null);
