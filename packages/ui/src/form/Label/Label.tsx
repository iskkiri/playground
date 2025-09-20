'use client';

import * as React from 'react';
import { Label as LabelPrimitive } from 'radix-ui';

import { cn } from '@repo/utils/cn';

export default function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'typography-p3-16r peer-disabled:cursor-not-allowed has-[:disabled]:cursor-not-allowed group-data-[disabled=true]:pointer-events-none',
        className
      )}
      {...props}
    />
  );
}
