import { cn } from '@repo/utils/cn';

interface ModalBodyProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

export default function ModalBody({ children, className, ...props }: ModalBodyProps) {
  return (
    <div className={cn('modal__body', className)} {...props}>
      {children}
    </div>
  );
}
