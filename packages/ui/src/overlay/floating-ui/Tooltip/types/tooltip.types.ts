import type { OffsetOptions, Placement } from '@floating-ui/react';

export interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  offsetOptions?: OffsetOptions;
}
