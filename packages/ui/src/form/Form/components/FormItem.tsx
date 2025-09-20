import React from 'react';
import FormItemContext from '../context/FormItemContext';
import { cn } from '@repo/utils/cn';

export default function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn('grid gap-8', className)} {...props} />
    </FormItemContext.Provider>
  );
}
