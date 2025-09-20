import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

export default function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}