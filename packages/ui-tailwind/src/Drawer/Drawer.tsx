'use client';

import { useState, useCallback, useMemo } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { DrawerDispatchContext, DrawerStateContext } from './context/DrawerContext';

import DrawerTrigger from './DrawerTrigger';
import DrawerPortal from './DrawerPortal';
import DrawerClose from './DrawerClose';
import DrawerOverlay from './DrawerOverlay';
import DrawerContent from './DrawerContent';
import DrawerHeader from './DrawerHeader';
import DrawerFooter from './DrawerFooter';
import DrawerTitle from './DrawerTitle';
import DrawerDescription from './DrawerDescription';

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
