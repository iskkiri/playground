import { cloneElement, isValidElement, useCallback, useMemo } from 'react';
import { useMergeRefs } from 'react-merge-refs';
import { useModalDispatchContext, useModalStateContext } from './hooks/useModalContext';
import { cn } from '@repo/utils/cn';

interface ModalTriggerProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
  children: React.ReactNode;
}

export default function ModalTrigger({
  children,
  asChild = false,
  onClick,
  className,
  ...restProps
}: ModalTriggerProps) {
  const { isOpen } = useModalStateContext();
  const { onOpen } = useModalDispatchContext();

  // ref를 가진 ReactElement인지 확인하는 타입 가드 함수
  const hasRef = useCallback((child: unknown): child is { ref: React.Ref<HTMLButtonElement> } => {
    return child !== null && typeof child === 'object' && 'ref' in child;
  }, []);
  const childrenRef = useMemo(() => (hasRef(children) ? children.ref : null), [children, hasRef]);
  const ref = useMergeRefs([restProps.ref, childrenRef]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onOpen();
      onClick?.(e);
    },
    [onOpen, onClick]
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...restProps,
      ...(typeof children.props === 'object' ? children.props : {}),
      onClick: handleClick,
      ref,
      'data-state': isOpen ? 'open' : 'closed',
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      // The user can style the trigger based on the state
      data-state={isOpen ? 'open' : 'closed'}
      className={cn('modal__trigger', className)}
      {...restProps}
    >
      {children}
    </button>
  );
}
