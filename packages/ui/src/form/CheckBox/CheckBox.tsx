'use client';

import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';

import { cn } from '@repo/utils/cn';
import FeatherIcons from '@repo/icons/featherIcons';

export default function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'shadow-xs rounded-4 flex size-20 shrink-0 items-center justify-center border border-gray-300 outline-none transition-shadow',
        'enabled:data-[state=checked]:border-primary enabled:data-[state=checked]:bg-primary enabled:data-[state=checked]:text-white',
        'enabled:aria-invalid:border-red-500 enabled:aria-invalid:ring-red-500/20',
        'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 disabled:text-white',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <FeatherIcons.Check size={16} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
