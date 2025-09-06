import { cloneElement, isValidElement, ElementType } from 'react';
import usePopoverContext from './hooks/usePopoverContext';
import { FloatingFocusManager, FloatingPortal, useMergeRefs } from '@floating-ui/react';
import { AsProp } from '@repo/types/react';

type PopoverContentProps<T extends ElementType = 'div'> = AsProp<T> & {
  asChild?: boolean;
};

export default function PopoverContent<T extends ElementType = 'div'>({
  style,
  onClick,
  asChild = false,
  children,
  as,
  ...props
}: PopoverContentProps<T>) {
  const { context: floatingContext, ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, props.ref]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // 기존 onClick이 있다면 먼저 실행
    onClick?.(event);

    // dismissOnContentClick 옵션이 true면 팝오버를 닫음
    if (context.dismissOnContentClick) {
      context.setIsOpen(false);
    }
  };

  if (!context.isOpen) return null;

  if (asChild && isValidElement(children)) {
    return (
      <FloatingPortal>
        <FloatingFocusManager context={floatingContext} disabled={context.isFocusDisabled}>
          {cloneElement(children, {
            ref,
            style: { ...context.floatingStyles, ...style },
            ...context.getFloatingProps({ ...props, onClick: handleClick }),
            ...(typeof children.props === 'object' ? children.props : {}),
          } as React.HTMLAttributes<HTMLElement>)}
        </FloatingFocusManager>
      </FloatingPortal>
    );
  }

  const Component = as || 'div';

  return (
    <FloatingPortal>
      <FloatingFocusManager context={floatingContext} disabled={context.isFocusDisabled}>
        <Component
          ref={ref}
          style={{ ...context.floatingStyles, ...style }}
          {...context.getFloatingProps({ ...props, onClick: handleClick })}
        >
          {children}
        </Component>
      </FloatingFocusManager>
    </FloatingPortal>
  );
}
