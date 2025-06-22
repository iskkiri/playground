import { createContext } from 'react';
import type { ModalProps } from '../Modal';

type ContextType = Omit<ModalProps, 'children'> | null;

export const ModalContext = createContext<ContextType>(null);
