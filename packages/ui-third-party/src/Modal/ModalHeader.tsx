'use client';

import { cn } from '@repo/utils/cn';

export default function ModalHeader({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('modal__header', className)} {...props}>
      {children}
    </div>
  );
}