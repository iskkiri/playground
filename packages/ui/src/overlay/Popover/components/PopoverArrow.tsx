import * as React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';

export default function PopoverArrow({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Arrow>) {
  return <PopoverPrimitive.Arrow data-slot="popover-arrow" {...props} />;
}