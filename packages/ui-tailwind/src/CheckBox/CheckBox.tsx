import { cn } from '@repo/utils/cn';
import { cva } from 'class-variance-authority';
import FeatherIcons from '@repo/icons/featherIcons';

export type CheckBoxProps = React.ComponentProps<'input'>;

const checkBoxVariants = cva(
  cn(
    'flex w-fit cursor-pointer items-center gap-6 typography-p3-16r text-neutral-400',
    'focus-visible:[&>svg]:rounded-4 focus-visible:[&>svg]:outline-2 focus-visible:[&>svg]:outline-offset-2 focus-visible:[&>svg]:outline-primary'
  ),
  {
    variants: {
      checked: {
        true: 'text-gray-900',
        false: '',
      },
      disabled: {
        true: 'cursor-not-allowed text-neutral-300',
        false: '',
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  }
);

const checkBoxIconVariants = cva('', {
  variants: {
    checked: {
      true: 'text-primary',
      false: '',
    },
    disabled: {
      true: 'text-neutral-300',
      false: '',
    },
  },
  defaultVariants: {
    checked: false,
    disabled: false,
  },
});

export default function CheckBox({
  children,
  checked,
  disabled,
  className,
  ...restProps
}: CheckBoxProps) {
  return (
    <label className={cn(checkBoxVariants({ checked, disabled }), className)}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="sr-only"
        {...restProps}
      />
      <FeatherIcons.CheckSquare
        className={cn(checkBoxIconVariants({ checked, disabled }))}
        aria-hidden="true"
      />
      {children && children}
    </label>
  );
}
