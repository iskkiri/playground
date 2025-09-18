'use client';

import * as React from 'react';
import { cn } from '@repo/utils/cn';

export default function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="dialog-footer" className={cn('mt-20 flex gap-12', className)} {...props} />
  );
}