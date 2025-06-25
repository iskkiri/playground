import { cn } from '@repo/utils/cn';

export default function ModalFooter({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('modal__footer', className)} {...props}>
      {children}
    </div>
  );
}
