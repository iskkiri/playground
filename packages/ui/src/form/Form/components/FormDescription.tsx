import useFormField from '../hooks/useFormField';
import { cn } from '@repo/utils/cn';

export default function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-sm text-gray-500', className)}
      {...props}
    />
  );
}
