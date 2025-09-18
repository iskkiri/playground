import { cloneElement, isValidElement, ElementType } from 'react';
import { FloatingPortal, useMergeRefs } from '@floating-ui/react';
import useTooltipContext from '../hooks/useTooltipContext';
import { AsProp } from '@repo/types/react';

type TooltipContentProps<T extends ElementType = 'div'> = AsProp<T> & {
  asChild?: boolean;
};

export default function TooltipContent<T extends ElementType = 'div'>({
  style,
  asChild = false,
  children,
  as,
  ...props
}: TooltipContentProps<T>) {
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

  const Component = as || 'div';

  return (
    <FloatingPortal>
      <Component
        ref={mergeRefs}
        style={{
          ...context.floatingStyles,
          ...style,
        }}
        {...context.getFloatingProps(props)}
      >
        {children}
      </Component>
    </FloatingPortal>
  );
}
