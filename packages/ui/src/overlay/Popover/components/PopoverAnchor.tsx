import * as React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';

export default function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}