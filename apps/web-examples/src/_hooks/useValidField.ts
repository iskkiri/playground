import { useCallback } from 'react';
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

interface UseValidFieldParams<TFieldValues extends FieldValues> {
  getFieldState: UseFormReturn<TFieldValues>['getFieldState'];
}

export default function useValidField<TFieldValues extends FieldValues>({
  getFieldState,
}: UseValidFieldParams<TFieldValues>) {
  const getIsValidField = useCallback(
    (field: FieldPath<TFieldValues>) => {
      return getFieldState(field).isDirty && !getFieldState(field).invalid;
    },
    [getFieldState]
  );

  return { getIsValidField };
}
