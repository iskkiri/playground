'use client';

import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { DialogDispatchContext, DialogStateContext } from './context/DialogContext';
import DialogTrigger from './components/DialogTrigger';
import DialogPortal from './components/DialogPortal';
import DialogClose from './components/DialogClose';
import DialogOverlay from './components/DialogOverlay';
import DialogContent from './components/DialogContent';
import DialogHeader from './components/DialogHeader';
import DialogFooter from './components/DialogFooter';
import DialogTitle from './components/DialogTitle';
import DialogDescription from './components/DialogDescription';

export default function Dialog({
  children,
  open,
  onOpenChange,
  defaultOpen = false,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const actualOpen = open ?? uncontrolledOpen;
  const setIsOpen = onOpenChange ?? setUncontrolledOpen;

  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const onOpen = useCallback(() => setIsOpen(true), [setIsOpen]);

  const stateContextValue = useMemo(() => ({ isOpen: actualOpen }), [actualOpen]);
  const dispatchContextValue = useMemo(() => ({ onOpen, onClose }), [onClose, onOpen]);

  return (
    <DialogStateContext.Provider value={stateContextValue}>
      <DialogDispatchContext.Provider value={dispatchContextValue}>
        <DialogPrimitive.Root
          data-slot="dialog"
          open={actualOpen}
          onOpenChange={setIsOpen}
          {...props}
        >
          {children}
        </DialogPrimitive.Root>
      </DialogDispatchContext.Provider>
    </DialogStateContext.Provider>
  );
}

Dialog.Trigger = DialogTrigger;
Dialog.Portal = DialogPortal;
Dialog.Close = DialogClose;
Dialog.Overlay = DialogOverlay;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
