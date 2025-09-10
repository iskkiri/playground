'use client';

import { cn } from '@repo/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'flex shrink-0 items-center justify-center text-gray-800 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'border-primary bg-primary hover:bg-primary-hover border text-white disabled:border-gray-100 disabled:bg-gray-100 disabled:text-gray-300',
        linePrimary:
          'border-primary text-primary hover:border-primary-hover hover:text-primary-hover border bg-transparent disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-200',
        gray: 'border border-gray-50 bg-gray-50 text-gray-500 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-300',
        danger:
          'border-danger bg-danger hover:bg-danger-hover border text-white disabled:border-gray-100 disabled:bg-gray-100 disabled:text-gray-300',
        none: '',
      },
      size: {
        32: 'typography-p5-12b rounded-8 h-32 gap-2 px-12 py-0',
        40: 'typography-p4-14b rounded-10 h-40 gap-4 px-16 py-0',
        48: 'typography-p3-16b rounded-12 h-48 gap-6 px-20 py-0',
        56: 'typography-p2-18b rounded-13 px-22 h-56 gap-8 py-0',
        64: 'typography-p1-20b rounded-14 h-64 gap-10 px-24 py-0',
      },
    },
    defaultVariants: {
      size: 48,
      variant: 'primary',
    },
  }
);

export type ButtonProps = Omit<React.ComponentProps<'button'>, 'prefix' | 'suffix'> &
  VariantProps<typeof buttonVariants> & {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
  };

export default function Button({
  variant,
  size,
  prefix,
  suffix,
  children,
  className,
  ...restProps
}: ButtonProps) {
  return (
    <button
      {...restProps}
      type={restProps.type ?? 'button'}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {prefix}
      {children}
      {suffix}
    </button>
  );
}
