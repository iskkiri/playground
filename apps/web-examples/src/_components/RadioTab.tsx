'use client';

import { type InputHTMLAttributes } from 'react';
import { cn } from '@repo/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const radioTabVariants = cva(
  [
    'rounded-4 cursor-pointer bg-gray-100 px-12 py-8',
    'flex items-center justify-center',
    'typography-p4-14r font-medium',
    'transition-colors duration-200',
    // 키보드 포커스일 때만 outline
    'has-[input:focus-visible]:outline-primary has-[input:focus-visible]:rounded-4 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2',
  ],
  {
    variants: {
      checked: {
        true: 'bg-primary text-white',
        false: 'bg-gray-100',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  }
);

type RadioTabProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof radioTabVariants> & {
    className?: string;
  };

export default function RadioTab({
  children,
  className,
  checked,
  disabled,
  ...restProps
}: RadioTabProps) {
  return (
    <label className={cn(radioTabVariants({ checked, disabled }), className)}>
      <input
        type="radio"
        checked={checked}
        disabled={disabled}
        className="sr-only"
        {...restProps}
      />
      <span>{children}</span>
    </label>
  );
}
