import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useCreateNotice, useUpdateNotice } from './react-query/useNotice';
import type { NoticeRegisterSchema } from '../schemas/noticeRegister.schema';
import type useUploadImage from '@/_features/image/hooks/react-query/useUploadImage';
import type useUploadFile from '@/_features/file/hooks/react-query/useUploadFile';
import type { AttachedFile } from '@/_features/file/api/dtos/attachedFile.dto';
import { isStorageFileTypeGuard } from '@/_features/file/types/file.types';
import type { CreateNoticeRequestDto } from '../api/dtos/createNotice.dto';

interface UseNoticeSubmitParams {
  id?: string;
  uploadImageAsync: ReturnType<typeof useUploadImage>['mutateAsync'];
  uploadFileAsync: ReturnType<typeof useUploadFile>['mutateAsync'];
  onUploadImageWhenSubmit: (params: { category: string }) => Promise<string>;
}

export default function useNoticeSubmit({
  id,
  uploadImageAsync,
  uploadFileAsync,
  onUploadImageWhenSubmit,
}: UseNoticeSubmitParams) {
  // 공지사항 생성
  const { mutate: createNotice, isPending: isCreateNoticePending } = useCreateNotice();
  // 공지사항 수정
  const { mutate: updateNotice, isPending: isUpdateNoticePending } = useUpdateNotice();

  // 공지사항 생성 및 수정
  const onSubmit: SubmitHandler<NoticeRegisterSchema> = useCallback(
    async (values) => {
      // 이미지 업로드
      let thumbnail = values.thumbnail?.storageImage ?? '';

      // insert된 이미지가 존재할 경우에만 스토리지에 이미지 업로드
      if (values.thumbnail?.file) {
        const formData = new FormData();
        formData.append('file', values.thumbnail.file);
        thumbnail = await uploadImageAsync({ formData, category: 'notice' });
      }

      // 첨부 파일 업로드
      // 공지사항 수정 시 이미 업로드된 파일들을 처리
      // 1. 이미 스토리지에 저장된 파일들만 필터링
      // 2. 필터링된 각 파일을 AttachedFile 형식으로 변환
      const files: AttachedFile[] = values.attachedFiles
        .filter(isStorageFileTypeGuard)
        .map((attachedFile) => ({
          fileName: attachedFile.filename,
          fileUrl: attachedFile.storageFileUrl,
        }));

      // insert된 파일이 존재할 경우에만 스토리지에 파일 업로드
      for (const { file } of values.attachedFiles) {
        if (!file) continue;

        const formData = new FormData();
        formData.append('file', file);

        const { fileUrl } = await uploadFileAsync({
          formData,
          category: 'notice',
        });
        files.push({ fileName: file.name, fileUrl });
      }

      // 에디터 이미지 업로드
      const content = await onUploadImageWhenSubmit({ category: 'notice' });

      const payload = {
        isShow: values.isShow,
        title: values.title,
        content,
        thumbnail,
        files,
      } satisfies CreateNoticeRequestDto;

      if (id) {
        updateNotice({ id, ...payload });
      } else {
        createNotice(payload);
      }
    },
    [createNotice, id, onUploadImageWhenSubmit, updateNotice, uploadFileAsync, uploadImageAsync]
  );

  return {
    onSubmit,
    isCreateNoticePending,
    isUpdateNoticePending,
  };
}
