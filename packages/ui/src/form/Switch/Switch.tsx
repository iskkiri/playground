'use client';

import * as React from 'react';
import { Switch as SwitchPrimitive } from 'radix-ui';
import { cn } from '@repo/utils/cn';

export default function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'shadow-xs inline-flex h-20 w-36 shrink-0 items-center rounded-full border border-transparent outline-none transition-all',
        'data-[state=unchecked]:bg-gray-300',
        'data-[state=checked]:bg-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background pointer-events-none block size-16 rounded-full bg-white ring-0 transition-transform',
          'data-[state=unchecked]:bg-foreground data-[state=unchecked]:translate-x-2',
          'data-[state=checked]:bg-primary-foreground data-[state=checked]:translate-x-full'
        )}
      />
    </SwitchPrimitive.Root>
  );
}
