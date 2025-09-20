import type { UseFloatingReturn, UseInteractionsReturn } from '@floating-ui/react';
import { createContext } from 'react';

type Disclosure = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

type TooltipArrow = {
  arrowRef: React.RefObject<SVGSVGElement | null>;
  isShowArrow: boolean;
};

export type TooltipContextType =
  | (Disclosure & UseInteractionsReturn & UseFloatingReturn & TooltipArrow)
  | null;

export const TooltipContext = createContext<TooltipContextType>(null);
