import { useCallback } from 'react';
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

interface UseClearFieldParams<TFieldValues extends FieldValues> {
  resetField: UseFormReturn<TFieldValues>['resetField'];
}

export default function useClearField<TFieldValues extends FieldValues>({
  resetField,
}: UseClearFieldParams<TFieldValues>) {
  const onClearField = useCallback(
    (name: FieldPath<TFieldValues>) => () => resetField(name),
    [resetField]
  );

  return { onClearField };
}
