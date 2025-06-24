import { cn } from '@repo/utils/cn';
import { cva } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';

export type RadioProps = InputHTMLAttributes<HTMLInputElement>;

const radioLabelVariants = cva(
  'flex cursor-pointer items-center gap-6 typography-paragraph3-regular text-gray-800',
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed text-gray-300',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

const radioVariants = cva(
  cn(
    'relative m-1 h-24 w-24 cursor-pointer appearance-none rounded-full border-2 border-gray-300 align-middle',
    // Focus visible
    'focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
  ),
  {
    variants: {
      checked: {
        true: 'border-primary after:absolute after:top-1/2 after:left-1/2 after:h-10 after:w-10 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-primary after:content-[""]',
        false: '',
      },
      disabled: {
        true: 'cursor-not-allowed border-gray-200 checked:after:bg-gray-200',
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  }
);

export default function Radio({ children, ...restProps }: RadioProps) {
  return (
    <label className={cn(radioLabelVariants({ disabled: restProps.disabled }))}>
      <input
        type="radio"
        className={cn(radioVariants({ checked: restProps.checked, disabled: restProps.disabled }))}
        {...restProps}
      />
      {children && children}
    </label>
  );
}
