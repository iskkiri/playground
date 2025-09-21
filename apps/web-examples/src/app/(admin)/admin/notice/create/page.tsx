'use client';

import { useMemo, useRef } from 'react';
import GoBack from '@/_components/GoBack';
import type { CKEditor } from '@ckeditor/ckeditor5-react';
import type { ClassicEditor } from 'ckeditor5';
import NoticeForm from '@/app/(admin)/_features/notice/components/NoticeForm';
import useNoticeForm from '@/app/(admin)/_features/notice/hooks/useNoticeForm';
import useNoticeFileUpload from '@/app/(admin)/_features/notice/hooks/useNoticeFileUpload';
import useNoticeSubmit from '@/app/(admin)/_features/notice/hooks/useNoticeSubmit';
import useGoBack from '@/_hooks/useGoBack';
import useCkEditorUploadImages from '@/_features/image/hooks/useCkEditorUploadImages';
import useUploadImage from '@/_features/image/hooks/react-query/useUploadImage';

export default function NoticeCreatePage() {
  const { onGoBack } = useGoBack();

  // 에디터
  const editorRef = useRef<CKEditor<ClassicEditor> | null>(null);
  const { onUploadImageWhenSubmit } = useCkEditorUploadImages({ editorRef });

  // 공지사항 폼
  const form = useNoticeForm();

  // 썸네일 업로드
  const { mutateAsync: uploadImageAsync, isPending: isUploadImagePending } = useUploadImage();

  // 파일 업로드
  const { fields, onInsertFiles, onRemoveFile, uploadFileAsync, isUploadFilePending } =
    useNoticeFileUpload({ control: form.control });

  // 공지사항 생성
  const { onSubmit, isCreateNoticePending, isUpdateNoticePending } = useNoticeSubmit({
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
        <h1 className="typography-h4-36b">공지사항 생성</h1>
      </div>

      <NoticeForm
        //
        form={form}
        fields={fields}
        onInsertFiles={onInsertFiles}
        onRemoveFile={onRemoveFile}
        editorRef={editorRef}
        onSubmit={form.handleSubmit(onSubmit)}
        isSubmitDisabled={isSubmitDisabled}
        onGoBack={onGoBack}
      />
    </div>
  );
}
