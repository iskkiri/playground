import {
  Controller,
  type Control,
  type FieldArrayWithId,
  type UseFormReturn,
} from 'react-hook-form';
import Radio from '@repo/ui-tailwind/Radio/Radio';
import TextInput from '@repo/ui-tailwind/TextInput/TextInput';
import MultipleFileAttachment from '@/_features/file/components/MultipleFileAttachment/MultipleFileAttachment';
import ImageAttachment from '@/_features/image/components/ImageAttachment/ImageAttachment';
import Button from '@repo/ui-tailwind/Button/Button';
import dynamic from 'next/dynamic';
import type { NoticeRegisterSchema } from '../schemas/noticeRegister.schema';
import type { CKEditor } from '@ckeditor/ckeditor5-react';
import type { ClassicEditor } from 'ckeditor5';
import type { ImageSchema } from '@/_features/image/schemas/image.schema';
import { formatDateTime } from '@repo/utils/formatDate';
import { cn } from '@repo/utils/cn';

const Editor = dynamic(() => import('@repo/ui-third-party/Editor/CkEditor/CkEditor'), {
  ssr: false,
});

interface AdminNoticeFormProps {
  onGoBack: () => void;
  createdAt?: string; // 공지사항 수정(상세)
  control: Control<NoticeRegisterSchema>;
  register: UseFormReturn<NoticeRegisterSchema>['register'];
  fields: FieldArrayWithId<NoticeRegisterSchema>[];
  onInsertFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => () => void;
  insertedImageObj: ImageSchema;
  onInsertImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (e: React.MouseEvent) => void;
  editorRef: React.RefObject<CKEditor<ClassicEditor> | null>;
  onSubmit: (e: React.BaseSyntheticEvent) => void;
  isSubmitDisabled: boolean;
}

export default function NoticeForm({
  //
  onGoBack,
  createdAt,
  control,
  register,
  fields,
  onInsertFiles,
  onRemoveFile,
  insertedImageObj,
  onInsertImage,
  onRemoveImage,
  editorRef,
  onSubmit,
  isSubmitDisabled,
}: AdminNoticeFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-32">
      <div className="border border-gray-200">
        <div
          className={cn('grid border-b border-gray-200', createdAt ? 'grid-cols-2' : 'grid-cols-1')}
        >
          {!!createdAt && (
            <div className="grid grid-cols-[200px_auto] items-center">
              <div className="flex items-center self-stretch bg-gray-100 p-16">작성일자</div>
              <div className="p-16">{createdAt ? formatDateTime(createdAt) : ''}</div>
            </div>
          )}

          <div className="grid grid-cols-[200px_auto] items-center">
            <div className="flex items-center self-stretch bg-gray-100 p-16">노출 설정</div>
            <div className="flex gap-8 p-16">
              <Controller
                control={control}
                name="isShow"
                render={({ field: { onChange, value } }) => (
                  <Radio onChange={() => onChange(true)} checked={value === true}>
                    노출
                  </Radio>
                )}
              />

              <Controller
                control={control}
                name="isShow"
                render={({ field: { onChange, value } }) => (
                  <Radio onChange={() => onChange(false)} checked={value === false}>
                    숨김
                  </Radio>
                )}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
          <div className="flex items-center self-stretch bg-gray-100 p-16">게시글 제목</div>
          <div className="p-16">
            <TextInput {...register('title')} placeholder="제목을 입력해 주세요" />
          </div>
        </div>

        <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
          <div className="flex items-center self-stretch bg-gray-100 p-16">첨부 파일</div>
          <div className="flex flex-col items-start gap-8 p-16">
            <MultipleFileAttachment
              //
              fields={fields}
              onInsertFiles={onInsertFiles}
              onRemoveFile={onRemoveFile}
            />
          </div>
        </div>

        <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
          <div className="flex items-center self-stretch bg-gray-100 p-16">썸네일</div>
          <div className="p-16">
            <ImageAttachment
              //
              insertedImageObj={insertedImageObj}
              onInsertImage={onInsertImage}
              onRemoveImage={onRemoveImage}
            />
          </div>
        </div>

        <div className="p-16">
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, value } }) => (
              <Editor
                editorRef={editorRef}
                placeholder="내용을 입력해 주세요"
                onChange={(_event, editor) => {
                  const data = editor.getData();
                  onChange(data);
                }}
                data={value}
                height={600}
              />
            )}
          />
        </div>
      </div>

      <div className="mx-auto grid grid-cols-[120px_120px] gap-16">
        <Button onClick={onGoBack} type="button" variant="gray">
          취소
        </Button>
        <Button type="submit" disabled={isSubmitDisabled} variant="primary">
          저장하기
        </Button>
      </div>
    </form>
  );
}
