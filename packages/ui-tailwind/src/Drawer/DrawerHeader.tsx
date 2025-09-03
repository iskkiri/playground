'use client';

import * as React from 'react';

import { cn } from '@repo/utils/cn';

export default function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        'flex flex-col gap-2 p-16 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-6 md:text-left',
        className
      )}
      {...props}
    />
  );
}