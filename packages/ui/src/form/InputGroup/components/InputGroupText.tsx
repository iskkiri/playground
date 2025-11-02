import { cn } from '@repo/utils/cn';

export default function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('typography-p3-16r flex items-center gap-8 text-gray-400', className)}
      {...props}
    />
  );
}
