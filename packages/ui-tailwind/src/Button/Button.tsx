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
        32: 'button-size-32',
        40: 'button-size-40',
        48: 'button-size-48',
        56: 'button-size-56',
        64: 'button-size-64',
      },
    },
    defaultVariants: {
      size: 48,
      variant: 'primary',
    },
  }
);

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix' | 'suffix'> &
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
