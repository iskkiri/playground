import { useContext } from 'react';
import { PopoverContext, type PopoverContextType } from '../context/PopoverContext';

export default function usePopoverContext(): NonNullable<PopoverContextType> {
  const context = useContext(PopoverContext);

  if (context === null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }

  return context;
}
