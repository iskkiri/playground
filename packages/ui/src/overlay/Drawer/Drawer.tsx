'use client';

import { useState, useCallback, useMemo } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { DrawerDispatchContext, DrawerStateContext } from './context/DrawerContext';

import DrawerTrigger from './components/DrawerTrigger';
import DrawerPortal from './components/DrawerPortal';
import DrawerClose from './components/DrawerClose';
import DrawerOverlay from './components/DrawerOverlay';
import DrawerContent from './components/DrawerContent';
import DrawerHeader from './components/DrawerHeader';
import DrawerFooter from './components/DrawerFooter';
import DrawerTitle from './components/DrawerTitle';
import DrawerDescription from './components/DrawerDescription';

export type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root> & {
  initialOpen?: boolean; // Uncontrolled
};

export default function Drawer({ open, onOpenChange, initialOpen = false, ...props }: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const actualOpen = open ?? uncontrolledOpen;
  const setIsOpen = onOpenChange ?? setUncontrolledOpen;

  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const onOpen = useCallback(() => setIsOpen(true), [setIsOpen]);

  const stateContextValue = useMemo(() => ({ isOpen: actualOpen }), [actualOpen]);
  const dispatchContextValue = useMemo(() => ({ onOpen, onClose }), [onClose, onOpen]);

  return (
    <DrawerStateContext.Provider value={stateContextValue}>
      <DrawerDispatchContext.Provider value={dispatchContextValue}>
        <DrawerPrimitive.Root
          data-slot="drawer"
          open={actualOpen}
          onOpenChange={setIsOpen}
          {...props}
        />
      </DrawerDispatchContext.Provider>
    </DrawerStateContext.Provider>
  );
}

Drawer.Trigger = DrawerTrigger;
Drawer.Portal = DrawerPortal;
Drawer.Close = DrawerClose;
Drawer.Overlay = DrawerOverlay;
Drawer.Content = DrawerContent;
Drawer.Header = DrawerHeader;
Drawer.Footer = DrawerFooter;
Drawer.Title = DrawerTitle;
Drawer.Description = DrawerDescription;
