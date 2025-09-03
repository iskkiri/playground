'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

export default function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}