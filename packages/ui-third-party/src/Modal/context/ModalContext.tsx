import { createContext } from 'react';
import type { ModalProps } from '../Modal';

type ModalContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
} & Omit<ModalProps, 'children' | 'isOpen' | 'onOpenChange'>;

export const ModalContext = createContext<ModalContextType | null>(null);
