'use client';

import { cloneElement, isValidElement, ElementType } from 'react';
import { cn } from '@repo/utils/cn';
import { AsProp } from '@repo/types/react';

type ModalHeaderProps<T extends ElementType = 'div'> = AsProp<T> & {
  asChild?: boolean;
};

export default function ModalHeader<T extends ElementType = 'div'>({
  children,
  className,
  asChild = false,
  as,
  ...props
}: ModalHeaderProps<T>) {
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...(typeof children.props === 'object' ? children.props : {}),
    } as React.HTMLAttributes<HTMLElement>);
  }

  const Component = as || 'div';

  return (
    <Component className={cn('modal__header', className)} {...props}>
      {children}
    </Component>
  );
}
