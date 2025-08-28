import { cloneElement, isValidElement } from 'react';
import { FloatingPortal, useMergeRefs } from '@floating-ui/react';
import useTooltipContext from './hooks/useTooltipContext';

interface TooltipContentProps extends React.HTMLProps<HTMLDivElement> {
  asChild?: boolean;
}

export default function TooltipContent({ style, asChild = false, children, ...props }: TooltipContentProps) {
  const context = useTooltipContext();
  const mergeRefs = useMergeRefs([context.refs.setFloating, props.ref]);

  if (!context.isOpen) return null;

  if (asChild && isValidElement(children)) {
    return (
      <FloatingPortal>
        {cloneElement(children, {
          ref: mergeRefs,
          style: {
            ...context.floatingStyles,
            ...style,
          },
          ...context.getFloatingProps(props),
          ...(typeof children.props === 'object' ? children.props : {}),
        } as React.HTMLAttributes<HTMLElement>)}
      </FloatingPortal>
    );
  }

  return (
    <FloatingPortal>
      <div
        ref={mergeRefs}
        style={{
          ...context.floatingStyles,
          ...style,
        }}
        {...context.getFloatingProps(props)}
      >
        {children}
      </div>
    </FloatingPortal>
  );
}
