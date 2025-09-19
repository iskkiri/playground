import { cloneElement, isValidElement, ElementType } from 'react';
import { FloatingArrow, FloatingPortal, useMergeRefs } from '@floating-ui/react';
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
          children: (
            <>
              {(children.props as React.PropsWithChildren<unknown>)?.children}
              {context.isShowArrow && (
                <FloatingArrow
                  ref={context.arrowRef}
                  context={context.context}
                  fill="var(--color-white)"
                  stroke="var(--color-gray-200)"
                  strokeWidth={1}
                  width={16}
                  height={8}
                  style={{
                    transform: 'translateY(-1px)',
                  }}
                />
              )}
            </>
          ),
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

        {context.isShowArrow && (
          <FloatingArrow
            ref={context.arrowRef}
            context={context.context}
            fill="var(--color-white)"
            stroke="var(--color-gray-200)"
            strokeWidth={1}
            width={16}
            height={8}
            style={{
              transform: 'translateY(-1px)',
            }}
          />
        )}
      </Component>
    </FloatingPortal>
  );
}
