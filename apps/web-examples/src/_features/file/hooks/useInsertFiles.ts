import { useCallback } from 'react';
import type { FileSchema } from '../schemas/file.schema';
import { validateFileSize } from '@repo/utils/validateFileSize';
import { useAlertModal } from '@/_hooks/useDialogModals';

interface UseInsertFilesParams {
  append: (value: FileSchema | FileSchema[]) => void;
  remove: (index?: number | number[]) => void;
  /** 파일 크기 제한 (MB) */
  fileSizeLimit?: number;
}

export default function useInsertFiles({ append, remove, fileSizeLimit }: UseInsertFilesParams) {
  const { openAlertModal, closeAlertModal } = useAlertModal();

  const onInsertFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (!files) return;

      for (const file of files) {
        if (fileSizeLimit && !validateFileSize({ fileSize: file.size, fileSizeLimit })) {
          openAlertModal({
            title: '파일 크기 초과',
            content: `파일 크기는 ${fileSizeLimit}MB를 초과할 수 없습니다.`,
            onClose: closeAlertModal,
          });
          continue;
        }

        append({ file, filename: file.name });
      }
    },
    [append, fileSizeLimit, openAlertModal, closeAlertModal]
  );

  const onRemoveFile = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove]
  );

  return { onInsertFiles, onRemoveFile };
}
