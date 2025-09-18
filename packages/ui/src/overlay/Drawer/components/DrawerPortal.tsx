'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

export default function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}