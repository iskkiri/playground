import { useContext } from 'react';
import { DrawerDispatchContext, DrawerStateContext } from '../context/DrawerContext';

export function useDrawerStateContext() {
  const context = useContext(DrawerStateContext);

  if (context === null) {
    throw new Error('Drawer components must be wrapped in <Drawer />');
  }

  return context;
}

export function useDrawerDispatchContext() {
  const context = useContext(DrawerDispatchContext);

  if (context === null) {
    throw new Error('Drawer components must be wrapped in <Drawer />');
  }

  return context;
}
