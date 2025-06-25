import { cn } from '@repo/utils/cn';

export default function ModalTitle({ children, className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2 className={cn('modal__title', className)} {...props}>
      {children}
    </h2>
  );
}
