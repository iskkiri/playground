'use client';

import { cva } from 'class-variance-authority';
import { useMemo } from 'react';
import { cn } from '@repo/utils/cn';

const textareaVariants = cva(
  cn(
    'rounded-8 typography-p3-16r block h-full w-full resize-none border border-gray-300 bg-white px-14 py-20 text-gray-900 outline-none placeholder:text-gray-300',
    'custom-scrollbar'
  ),
  {
    variants: {
      state: {
        default: 'focus-within:border-gray-400 hover:border-gray-400',
        error: 'border-danger',
        disabled: 'cursor-not-allowed border-gray-100 bg-gray-100',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export type TextareaProps = React.ComponentProps<'textarea'> & {
  isError?: boolean;
};

export default function Textarea({ isError, className, ...restProps }: TextareaProps) {
  const textareaState = useMemo(() => {
    if (isError) return 'error';
    if (restProps.disabled) return 'disabled';
    return 'default';
  }, [isError, restProps.disabled]);

  return (
    <textarea
      className={cn(textareaVariants({ state: textareaState }), className)}
      {...restProps}
    />
  );
}
