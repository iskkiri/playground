'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import FeatherIcons from '@repo/icons/featherIcons';
import { cn } from '@repo/utils/cn';
import DialogPortal from './DialogPortal';
import DialogOverlay from './DialogOverlay';

export default function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
          'max-w-480 rounded-16 w-[calc(100%-40px)] bg-white p-24 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)]',
          'data-[state=open]:zoom-in-90 animate data-[state=open]:animate-in data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-90 data-[state=closed]:fade-out-0 data-[state=closed]:animate-out',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" className="absolute right-24 top-24">
            <FeatherIcons.X className="shrink-0" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}