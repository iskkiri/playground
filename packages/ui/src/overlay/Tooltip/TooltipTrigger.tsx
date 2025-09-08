import { cloneElement, isValidElement, useCallback, useMemo, ElementType } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import useTooltipContext from './hooks/useTooltipContext';
import { AsProp } from '@repo/types/react';

type TooltipTriggerProps<T extends ElementType = 'button'> = AsProp<T> & {
  asChild?: boolean;
};

export default function TooltipTrigger<T extends ElementType = 'button'>({
  children,
  asChild = false,
  as,
  ...props
}: TooltipTriggerProps<T>) {
  const context = useTooltipContext();

  // ref를 가진 ReactElement인지 확인하는 타입 가드 함수
  const hasRef = useCallback((child: unknown): child is { ref: React.Ref<HTMLElement> } => {
    return child !== null && typeof child === 'object' && 'ref' in child;
  }, []);
  const childrenRef = useMemo(() => (hasRef(children) ? children.ref : null), [children, hasRef]);
  const ref = useMergeRefs([context.refs.setReference, props.ref, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...(children.props as Record<string, unknown>),
        // 'data-state': context.isOpen ? 'open' : 'closed',
      })
    );
  }

  const Component = as || 'button';

  return (
    <Component
      ref={ref}
      type={Component === 'button' ? 'button' : undefined}
      // The user can style the trigger based on the state
      data-state={context.isOpen ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </Component>
  );
}
