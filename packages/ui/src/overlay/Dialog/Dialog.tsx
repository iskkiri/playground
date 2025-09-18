'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import DialogTrigger from './components/DialogTrigger';
import DialogPortal from './components/DialogPortal';
import DialogClose from './components/DialogClose';
import DialogOverlay from './components/DialogOverlay';
import DialogContent from './components/DialogContent';
import DialogHeader from './components/DialogHeader';
import DialogFooter from './components/DialogFooter';
import DialogTitle from './components/DialogTitle';
import DialogDescription from './components/DialogDescription';

export default function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
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
