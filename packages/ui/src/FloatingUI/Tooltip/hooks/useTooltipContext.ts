import { useContext } from 'react';
import { TooltipContext, type TooltipContextType } from '../context/TooltipContext';

export default function useTooltipContext(): NonNullable<TooltipContextType> {
  const context = useContext(TooltipContext);

  if (context === null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
}
