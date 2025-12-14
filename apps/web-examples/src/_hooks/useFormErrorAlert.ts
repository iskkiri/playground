import { useCallback, useEffect } from 'react';
import { useAlertModal } from './useDialogModals';
import type { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form';

interface UseFormErrorAlertParams<TFieldValues extends FieldValues> {
  errors: FieldErrors;
  clearErrors?: UseFormReturn<TFieldValues>['clearErrors'];
}

export default function useFormErrorAlert<TFieldValues extends FieldValues>({
  errors,
  clearErrors,
}: UseFormErrorAlertParams<TFieldValues>) {
  const { openAlertModal } = useAlertModal();

  // errors의 depth를 알 수 없는 경우를 대비하여 재귀적으로 에러 메시지를 찾는 함수
  const findErrorMessage = useCallback((errorObj: FieldErrors): string => {
    for (const key in errorObj) {
      if (typeof errorObj[key]?.message === 'string') {
        return errorObj[key].message;
      }

      if (typeof errorObj[key] === 'object') {
        const nestedMessage = findErrorMessage(errorObj[key] as FieldErrors);

        if (nestedMessage) return nestedMessage;
      }
    }

    return '';
  }, []);

  useEffect(() => {
    if (!Object.keys(errors).length) return;

    const errorMessage = findErrorMessage(errors);
    if (!errorMessage) return;

    openAlertModal({
      title: '안내',
      content: errorMessage,
    }).then(() => clearErrors?.());
  }, [clearErrors, errors, findErrorMessage, openAlertModal]);
}
