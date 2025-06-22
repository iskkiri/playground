import { cloneElement, isValidElement, useCallback, useMemo } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import useTooltipContext from './hooks/useTooltipContext';

interface TooltipTriggerProps extends React.HTMLProps<HTMLElement> {
  asChild?: boolean;
}

export default function TooltipTrigger({
  children,
  asChild = false,
  ...restProps
}: TooltipTriggerProps) {
  const context = useTooltipContext();

  // ref를 가진 ReactElement인지 확인하는 타입 가드 함수
  const hasRef = useCallback(
    (child: unknown): child is { ref: React.Ref<HTMLElement> } => {
      return child !== null && typeof child === 'object' && 'ref' in child;
    },
    []
  );
  const childrenRef = useMemo(
    () => (hasRef(children) ? children.ref : null),
    [children, hasRef]
  );
  const ref = useMergeRefs([
    context.refs.setReference,
    restProps.ref,
    childrenRef,
  ]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...restProps,
        ...(children.props as Record<string, unknown>),
        // 'data-state': context.isOpen ? 'open' : 'closed',
      })
    );
  }

  return (
    <div
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.isOpen ? 'open' : 'closed'}
      {...context.getReferenceProps(restProps)}
    >
      {children}
    </div>
  );
}
