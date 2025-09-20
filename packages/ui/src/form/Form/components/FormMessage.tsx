import useFormField from '../hooks/useFormField';
import { cn } from '@repo/utils/cn';

export default function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-sm text-red-500', className)}
      {...props}
    >
      {body}
    </p>
  );
}
