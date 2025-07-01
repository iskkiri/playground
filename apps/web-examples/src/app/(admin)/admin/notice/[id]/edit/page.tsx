'use client';

import { useGetNoticeDetail } from '@/app/(admin)/_features/notice/hooks/react-query/useNotice';
import GoBack from '@/_components/GoBack';
import { useMemo, useRef } from 'react';
import type { CKEditor } from '@ckeditor/ckeditor5-react';
import type { ClassicEditor } from 'ckeditor5';
import NoticeForm from '@/app/(admin)/_features/notice/components/NoticeForm';
import useNoticeForm from '@/app/(admin)/_features/notice/hooks/useNoticeForm';
import useInitializeNoticeForm from '@/app/(admin)/_features/notice/hooks/useInitializeNoticeForm';
import useNoticeSubmit from '@/app/(admin)/_features/notice/hooks/useNoticeSubmit';
import useNoticeThumbnailUpload from '@/app/(admin)/_features/notice/hooks/useNoticeThumbnailUpload';
import useNoticeFileUpload from '@/app/(admin)/_features/notice/hooks/useNoticeFileUpload';
import useGoBack from '@/_hooks/useGoBack';
import useCkEditorUploadImages from '@/_features/image/hooks/useCkEditorUploadImages';
import useGetIdParam from '@/_hooks/useGetIdParam';

export default function NoticeEditPage() {
  const id = useGetIdParam();
  const { onGoBack } = useGoBack();

  // 에디터
  const editorRef = useRef<CKEditor<ClassicEditor> | null>(null);
  const { onUploadImageWhenSubmit } = useCkEditorUploadImages({ editorRef });

  // 공지사항 폼
  const { control, register, watch, setValue, reset, handleSubmit } = useNoticeForm();

  // 공지사항 상세 조회
  const { data: noticeDetail, isLoading: isGetNoticeLoading } = useGetNoticeDetail(id);

  // 썸네일 업로드
  const { insertedImageObj, onInsertImage, onRemoveImage, uploadImageAsync, isUploadImagePending } =
    useNoticeThumbnailUpload({
      watch,
      setValue,
      storageImage: noticeDetail?.thumbnail,
    });

  // 파일 업로드
  const { fields, onInsertFiles, onRemoveFile, uploadFileAsync, isUploadFilePending } =
    useNoticeFileUpload({ control });

  /**
   * @docs https://github.com/react-hook-form/react-hook-form/issues/3378
   * race condition
   * 반드시 useFieldArray 선언 이후에 초기화
   */
  useInitializeNoticeForm({ noticeDetail, reset });

  // 공지사항 생성 및 수정
  const { onSubmit, isCreateNoticePending, isUpdateNoticePending } = useNoticeSubmit({
    id,
    uploadImageAsync,
    uploadFileAsync,
    onUploadImageWhenSubmit,
  });

  // 버튼 비활성 여부
  const isSubmitDisabled = useMemo(() => {
    return (
      isUploadImagePending || isUploadFilePending || isCreateNoticePending || isUpdateNoticePending
    );
  }, [isCreateNoticePending, isUpdateNoticePending, isUploadImagePending, isUploadFilePending]);

  return (
    <div className="flex flex-col gap-32 px-20 py-40">
      <div className="flex items-center gap-8">
        <GoBack />
        <h1 className="typography-h4-36b">공지사항 수정</h1>
      </div>

      {(() => {
        if (isGetNoticeLoading) return null;

        return (
          <NoticeForm
            createdAt={noticeDetail?.createdAt}
            control={control}
            register={register}
            fields={fields}
            onInsertFiles={onInsertFiles}
            onRemoveFile={onRemoveFile}
            insertedImageObj={insertedImageObj}
            onInsertImage={onInsertImage}
            onRemoveImage={onRemoveImage}
            editorRef={editorRef}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitDisabled={isSubmitDisabled}
            onGoBack={onGoBack}
          />
        );
      })()}
    </div>
  );
}
