import { useCallback, isValidElement, cloneElement, useMemo, ElementType } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import usePopoverContext from './hooks/usePopoverContext';
import { AsProp } from '@repo/types/react';

type PopoverTriggerProps<T extends ElementType = 'button'> = AsProp<T> & {
  asChild?: boolean;
};

export default function PopoverTrigger<T extends ElementType = 'button'>({
  children,
  asChild = false,
  as,
  ...props
}: PopoverTriggerProps<T>) {
  const context = usePopoverContext();

  // ref를 가진 ReactElement인지 확인하는 타입 가드 함수
  const hasRef = useCallback((child: unknown): child is { ref: React.Ref<HTMLElement> } => {
    return child !== null && typeof child === 'object' && 'ref' in child;
  }, []);
  const childrenRef = useMemo(() => (hasRef(children) ? children.ref : null), [children, hasRef]);
  const ref = useMergeRefs([context.refs.setReference, props.ref, childrenRef]);

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...(typeof children.props === 'object' ? children.props : {}),
        'data-state': context.isOpen ? 'open' : 'closed',
      } as React.HTMLAttributes<HTMLElement>)
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
