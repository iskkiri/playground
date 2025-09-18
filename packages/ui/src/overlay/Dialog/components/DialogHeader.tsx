'use client';

import * as React from 'react';
import { cn } from '@repo/utils/cn';

export default function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={cn('mb-16', className)} {...props} />;
}