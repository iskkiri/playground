'use client';

import { cn } from '@repo/utils/cn';

export default function Textarea({ className, ...restProps }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'rounded-8 typography-p3-16r custom-scrollbar block h-full w-full resize-none border border-gray-300 bg-white px-14 py-20 text-gray-900 outline-none',
        'placeholder:text-gray-300',
        'enabled:focus-within:border-gray-400 enabled:hover:border-gray-400',
        'disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-100',
        'enabled:aria-invalid:border-red-500',
        className
      )}
      {...restProps}
    />
  );
}
