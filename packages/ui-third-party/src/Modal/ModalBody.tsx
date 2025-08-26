'use client';

import { cn } from '@repo/utils/cn';

export default function ModalBody({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('modal__body', className)} {...props}>
      {children}
    </div>
  );
}