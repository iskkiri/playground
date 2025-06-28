import { FloatingPortal, useMergeRefs } from '@floating-ui/react';
import useTooltipContext from './hooks/useTooltipContext';

export default function TooltipContent({ style, ...props }: React.HTMLProps<HTMLDivElement>) {
  const context = useTooltipContext();
  const mergeRefs = useMergeRefs([context.refs.setFloating, props.ref]);

  if (!context.isOpen) return null;

  return (
    <FloatingPortal>
      <div
        ref={mergeRefs}
        style={{
          ...context.floatingStyles,
          ...style,
        }}
        {...context.getFloatingProps(props)}
      />
    </FloatingPortal>
  );
}
