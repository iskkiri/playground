import { type FieldArrayWithId, type UseFormReturn } from 'react-hook-form';
import Radio from '@repo/ui/form/Radio/Radio';
import TextInput from '@repo/ui/form/TextInput/TextInput';
import MultipleFileAttachment from '@/_features/file/components/MultipleFileAttachment/MultipleFileAttachment';
import ImageAttachment from '@/_features/image/components/ImageAttachment/ImageAttachment';
import Button from '@repo/ui/general/Button/Button';
import dynamic from 'next/dynamic';
import type { NoticeRegisterSchema } from '../schemas/noticeRegister.schema';
import type { CKEditor } from '@ckeditor/ckeditor5-react';
import type { ClassicEditor } from 'ckeditor5';
import { formatDateTime } from '@repo/utils/formatDate';
import { cn } from '@repo/utils/cn';
import Form from '@repo/ui/form/Form/Form';
import { insertImage, removeImage } from '@/_features/image/utils/image.utils';

const Editor = dynamic(() => import('@repo/ui/rich-content/CkEditor/CkEditor'), {
  ssr: false,
});

interface AdminNoticeFormProps {
  form: UseFormReturn<NoticeRegisterSchema>;
  fields: FieldArrayWithId<NoticeRegisterSchema>[];
  onInsertFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => () => void;
  editorRef: React.RefObject<CKEditor<ClassicEditor> | null>;
  onSubmit: (e: React.BaseSyntheticEvent) => void;
  isSubmitDisabled: boolean;
  createdAt?: string; // 공지사항 수정(상세)
  onGoBack: () => void;
}

export default function NoticeForm({
  //
  form,
  onGoBack,
  createdAt,
  fields,
  onInsertFiles,
  onRemoveFile,
  editorRef,
  onSubmit,
  isSubmitDisabled,
}: AdminNoticeFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-32">
        <div className="border border-gray-200">
          {/* 노출 설정 */}
          <div
            className={cn(
              'grid border-b border-gray-200',
              createdAt ? 'grid-cols-2' : 'grid-cols-1'
            )}
          >
            {!!createdAt && (
              <div className="grid grid-cols-[200px_auto] items-center">
                <div className="flex items-center self-stretch bg-gray-100 p-16">작성일자</div>
                <div className="p-16">{createdAt ? formatDateTime(createdAt) : ''}</div>
              </div>
            )}

            <div className="grid grid-cols-[200px_auto] items-center">
              <div className="flex items-center self-stretch bg-gray-100 p-16">노출 설정</div>
              <Form.Field
                control={form.control}
                name="isShow"
                render={({ field: { onChange, value } }) => (
                  <div className="flex gap-8 p-16">
                    <Radio onChange={() => onChange(true)} checked={value === true}>
                      노출
                    </Radio>

                    <Radio onChange={() => onChange(false)} checked={value === false}>
                      숨김
                    </Radio>
                  </div>
                )}
              />
            </div>
          </div>

          {/* 게시글 제목 */}
          <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
            <div className="flex items-center self-stretch bg-gray-100 p-16">게시글 제목</div>
            <Form.Field
              control={form.control}
              name="title"
              render={({ field }) => (
                <div className="p-16">
                  <TextInput {...field} placeholder="제목을 입력해 주세요" />
                </div>
              )}
            />
          </div>

          {/* 첨부 파일 */}
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

          {/* 썸네일 */}
          <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
            <div className="flex items-center self-stretch bg-gray-100 p-16">썸네일</div>
            <Form.Field
              control={form.control}
              name="thumbnail"
              render={({ field }) => {
                console.log(field.value);

                return (
                  <div className="p-16">
                    <ImageAttachment
                      //
                      insertedImageObj={field.value}
                      onInsertImage={insertImage({
                        onChange: field.onChange,
                        fileSizeLimit: 5,
                        storageImage: field.value?.storageImage,
                      })}
                      onRemoveImage={removeImage({
                        onChange: field.onChange,
                        storageImage: field.value?.storageImage,
                      })}
                    />
                  </div>
                );
              }}
            />
          </div>

          {/* 내용 */}
          <Form.Field
            control={form.control}
            name="content"
            render={({ field }) => (
              <div className="p-16">
                <Editor
                  editorRef={editorRef}
                  placeholder="내용을 입력해 주세요"
                  onChange={(_event, editor) => {
                    const data = editor.getData();
                    field.onChange(data);
                  }}
                  data={field.value}
                  height={600}
                />
              </div>
            )}
          />
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
    </Form>
  );
}
