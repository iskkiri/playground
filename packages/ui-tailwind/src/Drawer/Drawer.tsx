'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import DrawerTrigger from './DrawerTrigger';
import DrawerPortal from './DrawerPortal';
import DrawerClose from './DrawerClose';
import DrawerOverlay from './DrawerOverlay';
import DrawerContent from './DrawerContent';
import DrawerHeader from './DrawerHeader';
import DrawerFooter from './DrawerFooter';
import DrawerTitle from './DrawerTitle';
import DrawerDescription from './DrawerDescription';

export default function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

Drawer.Trigger = DrawerTrigger;
Drawer.Portal = DrawerPortal;
Drawer.Close = DrawerClose;
Drawer.Overlay = DrawerOverlay;
Drawer.Content = DrawerContent;
Drawer.Header = DrawerHeader;
Drawer.Footer = DrawerFooter;
Drawer.Title = DrawerTitle;
Drawer.Description = DrawerDescription;
