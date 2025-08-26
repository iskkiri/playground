import { cloneElement, isValidElement, useCallback, useMemo } from 'react';
import { useMergeRefs } from 'react-merge-refs';
import useModalContext from './hooks/useModalContext';

interface ModalTriggerProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
  children: React.ReactNode;
}

export default function ModalTrigger({
  children,
  asChild = false,
  onClick,
  ...restProps
}: ModalTriggerProps) {
  const context = useModalContext();

  // ref를 가진 ReactElement인지 확인하는 타입 가드 함수
  const hasRef = useCallback((child: unknown): child is { ref: React.Ref<HTMLButtonElement> } => {
    return child !== null && typeof child === 'object' && 'ref' in child;
  }, []);
  const childrenRef = useMemo(() => (hasRef(children) ? children.ref : null), [children, hasRef]);
  const ref = useMergeRefs([restProps.ref, childrenRef]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      context.onOpen();
      onClick?.(e);
    },
    [context, onClick]
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...restProps,
      ...(typeof children.props === 'object' ? children.props : {}),
      onClick: handleClick,
      ref,
      'data-state': context.isOpen ? 'open' : 'closed',
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      // The user can style the trigger based on the state
      data-state={context.isOpen ? 'open' : 'closed'}
      {...restProps}
    >
      {children}
    </button>
  );
}
