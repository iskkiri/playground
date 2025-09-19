import { createContext } from 'react';
import type { UseFloatingReturn, UseInteractionsReturn } from '@floating-ui/react';

type Disclosure = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

type PopoverArrow = {
  arrowRef: React.RefObject<SVGSVGElement | null>;
  isShowArrow: boolean;
};

export type PopoverContextType =
  | (Disclosure & {
      dismissOnContentClick?: boolean;
      isFocusDisabled?: boolean;
    } & UseInteractionsReturn &
      UseFloatingReturn &
      PopoverArrow)
  | null;

export const PopoverContext = createContext<PopoverContextType>(null);
