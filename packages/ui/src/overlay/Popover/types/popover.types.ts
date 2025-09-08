import type { OffsetOptions, OpenChangeReason, Placement } from '@floating-ui/react';

export interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  isOpen?: boolean;
  onOpenChange?(open: boolean, event?: Event, reason?: OpenChangeReason): void;
  offsetOptions?: OffsetOptions;
}
