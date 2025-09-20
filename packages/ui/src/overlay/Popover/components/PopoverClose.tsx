import * as React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';

export default function PopoverClose({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}