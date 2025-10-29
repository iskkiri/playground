import { cn } from '@repo/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const editorMenuButtonVariants = cva('rounded-4 flex h-32 w-32 items-center justify-center', {
  variants: {
    isActive: {
      true: 'bg-primary-light text-primary hover:bg-primary-light/80',
      false: 'bg-white hover:bg-gray-100',
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

type EditorMenuButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof editorMenuButtonVariants>;

export default function EditorMenuButton({
  isActive,
  children,
  className,
  ...restProps
}: EditorMenuButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={!!isActive}
      className={cn(editorMenuButtonVariants({ isActive }), className)}
      {...restProps}
    >
      {children}
    </button>
  );
}
