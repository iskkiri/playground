'use client';

import * as React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';
import PopoverTrigger from './components/PopoverTrigger';
import PopoverContent from './components/PopoverContent';
import PopoverAnchor from './components/PopoverAnchor';
import PopoverArrow from './components/PopoverArrow';
import PopoverClose from './components/PopoverClose';

export default function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.Anchor = PopoverAnchor;
Popover.Arrow = PopoverArrow;
Popover.Close = PopoverClose;
