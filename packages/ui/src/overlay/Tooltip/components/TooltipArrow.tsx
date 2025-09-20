import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

export default function TooltipArrow({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Arrow>) {
  return <TooltipPrimitive.Arrow data-slot="tooltip-arrow" {...props} />;
}