import { createContext } from 'react';
import type { DrawerDispatchContextType, DrawerStateContextType } from '../types/drawer.types';

export const DrawerStateContext = createContext<DrawerStateContextType | null>(null);

export const DrawerDispatchContext = createContext<DrawerDispatchContextType>({
  onOpen: () => {
    throw new Error('DrawerProvider is missing or useDrawer must be called within a DrawerProvider. Please ensure that your component is wrapped within <DrawerProvider>.');
  },
  onClose: () => {
    throw new Error('DrawerProvider is missing or useDrawer must be called within a DrawerProvider. Please ensure that your component is wrapped within <DrawerProvider>.');
  },
});