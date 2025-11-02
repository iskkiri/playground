import { cn } from '@repo/utils/cn';

export default function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      data-slot="input-group-control"
      className={cn(
        'typography-p3-16r h-full w-full min-w-0 flex-1 shrink-0 border-none bg-transparent text-gray-900 outline-none',
        'placeholder:text-gray-400',
        'disabled:cursor-not-allowed disabled:text-gray-400',
        className
      )}
      {...props}
    />
  );
}
