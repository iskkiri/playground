import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@repo/utils/cn';
import { useCallback } from 'react';

const inputGroupAddonVariants = cva(
  'flex h-full cursor-text select-none items-center justify-center gap-8',
  {
    variants: {
      align: {
        'inline-start': 'order-first pl-20',
        'inline-end': 'order-last pr-20',
        'block-start':
          '[.border-b]:pb-12 order-first w-full justify-start px-20 pt-12 group-has-[>input]/input-group:pt-10',
        'block-end':
          '[.border-t]:pt-12 order-last w-full justify-start px-20 pb-12 group-has-[>input]/input-group:pb-10',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  }
);

export default function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    e.currentTarget.parentElement?.querySelector('input')?.focus();
  }, []);

  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={onClick}
      {...props}
    />
  );
}
