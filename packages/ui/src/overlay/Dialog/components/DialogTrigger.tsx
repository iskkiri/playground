'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';

export default function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}