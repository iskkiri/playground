import { useEffect } from 'react';
import type { Notice } from '../api/dtos/getNoticeDetail.dto';
import type { NoticeRegisterSchema } from '../schemas/noticeRegister.schema';
import type { UseFormReset } from 'react-hook-form';

interface UseInitializeNoticeFormParams {
  noticeDetail: Notice | undefined;
  reset: UseFormReset<NoticeRegisterSchema>;
}

export default function useInitializeNoticeForm({
  noticeDetail,
  reset,
}: UseInitializeNoticeFormParams) {
  useEffect(() => {
    if (!noticeDetail) return;

    reset({
      isShow: noticeDetail.isShow,
      title: noticeDetail.title,
      attachedFiles: noticeDetail.files.map((file) => ({
        filename: file.fileName,
        storageFileUrl: file.fileUrl,
      })),
      thumbnail: {
        storageImage: noticeDetail.thumbnail,
      },
      content: noticeDetail.content,
    });
  }, [noticeDetail, reset]);
}
