'use client';

import * as React from 'react';

import { cn } from '@repo/utils/cn';

export default function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-8 p-16', className)}
      {...props}
    />
  );
}