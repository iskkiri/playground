import { cloneElement, isValidElement } from 'react';
import usePopoverContext from './hooks/usePopoverContext';
import { FloatingFocusManager, FloatingPortal, useMergeRefs } from '@floating-ui/react';

interface PopoverContentProps extends React.HTMLProps<HTMLDivElement> {
  asChild?: boolean;
}

export default function PopoverContent({
  style,
  onClick,
  asChild = false,
  children,
  ...props
}: PopoverContentProps) {
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
        <FloatingFocusManager context={floatingContext}>
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

  return (
    <FloatingPortal>
      <FloatingFocusManager context={floatingContext}>
        <div
          ref={ref}
          style={{ ...context.floatingStyles, ...style }}
          {...context.getFloatingProps({ ...props, onClick: handleClick })}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
}
