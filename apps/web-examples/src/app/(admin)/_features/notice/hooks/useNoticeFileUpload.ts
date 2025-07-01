import useUploadFile from '@/_features/file/hooks/react-query/useUploadFile';
import useInsertFiles from '@/_features/file/hooks/useInsertFiles';
import { useFieldArray, type Control } from 'react-hook-form';
import type { NoticeRegisterSchema } from '../schemas/noticeRegister.schema';

interface UseNoticeFileUploadParams {
  control: Control<NoticeRegisterSchema>;
}

export default function useNoticeFileUpload({ control }: UseNoticeFileUploadParams) {
  // 다중 파일 insert
  const { fields, append, remove } = useFieldArray({ control, name: 'attachedFiles' });
  const { onInsertFiles, onRemoveFile } = useInsertFiles({ append, remove });

  // 파일 업로드
  const { mutateAsync: uploadFileAsync, isPending: isUploadFilePending } = useUploadFile();

  return {
    fields,
    onInsertFiles,
    onRemoveFile,
    uploadFileAsync,
    isUploadFilePending,
  };
}
