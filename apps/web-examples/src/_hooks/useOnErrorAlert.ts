import { useCallback } from 'react';
import { isBaseError } from '@/_api/dtos/base.dto';

import { useAlertModal } from './useDialogModals';

export default function useOnErrorAlert() {
  const { openAlertModal, closeAlertModal } = useAlertModal();

  const onError = useCallback(
    (error: unknown) => {
      if (isBaseError(error) && error.response?.data) {
        openAlertModal({
          title: '안내',
          content: error.response.data.message,
          onClose: closeAlertModal,
        });
      }

      if (error instanceof Error) {
        openAlertModal({
          title: '안내',
          content: error.message,
          onClose: closeAlertModal,
        });
      }
    },
    [closeAlertModal, openAlertModal]
  );

  return { onError };
}
