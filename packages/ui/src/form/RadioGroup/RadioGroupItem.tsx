import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { cn } from '@repo/utils/cn';
import FeatherIcons from '@repo/icons/featherIcons';

export default function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'shadow-xs aspect-square size-24 shrink-0 rounded-full border-2 border-gray-300 outline-none transition-[color,box-shadow]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-checked:border-primary',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <FeatherIcons.Circle className="fill-primary absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}
