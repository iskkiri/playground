'use client';

import { cn } from '@repo/utils/cn';
import { cva } from 'class-variance-authority';

type SwitchProps = React.ComponentProps<'input'>;

const switchVariants = cva(
  cn(
    'relative block h-20 w-36 rounded-full bg-gray-200 align-middle transition-colors duration-300',
    'after:absolute after:block after:h-16 after:w-16 after:rounded-full after:bg-white after:shadow-md after:transition-transform after:duration-300 after:content-[""]',
    'after:translate-x-[calc((20px-16px)/2)] after:translate-y-[calc((20px-16px)/2)]'
  ),
  {
    variants: {
      checked: {
        true: 'bg-primary after:translate-x-[calc(100%+2px)]',
      },
    },
    defaultVariants: {
      checked: false,
    },
  }
);

export default function Switch(props: SwitchProps) {
  return (
    <label className="block cursor-pointer">
      <input type="checkbox" className="sr-only" {...props} />
      <div className={cn(switchVariants({ checked: props.checked }))} />
    </label>
  );
}
