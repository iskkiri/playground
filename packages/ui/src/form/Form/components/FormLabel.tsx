import { Label as LabelPrimitive } from 'radix-ui';
import useFormField from '../hooks/useFormField';
import Label from '../../Label/Label';
import { cn } from '@repo/utils/cn';

interface FormLabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  isRequired?: boolean;
  requiredPosition?: 'before' | 'after';
}

export default function FormLabel({
  className,
  children,
  isRequired = false,
  requiredPosition = 'after',
  ...props
}: FormLabelProps) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('flex gap-4 text-sm font-bold text-gray-700', className)}
      htmlFor={formItemId}
      {...props}
    >
      {isRequired && requiredPosition === 'before' && <RequiredIndicator />}

      {children}

      {isRequired && requiredPosition === 'after' && <RequiredIndicator />}
    </Label>
  );
}

function RequiredIndicator() {
  return <span className="font-bold text-red-500">*</span>;
}
