import { Editor } from '@tiptap/react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { linkFormSchema, type LinkFormData } from '../../schemas/link.schema';
import TextInput from '#src/form/TextInput/TextInput';
import Button from '#src/general/Button/Button';

interface LinkFormControlProps {
  url: string;
  editor: Editor;
  isSelected: boolean;
  onCloseForm: () => void;
}

export default function LinkFormControl({
  url,
  editor,
  isSelected,
  onCloseForm,
}: LinkFormControlProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkFormSchema),
    mode: 'onChange',
    defaultValues: {
      url,
    },
  });

  // 링크 설정 함수
  const onSubmit: SubmitHandler<LinkFormData> = ({ url }) => {
    // url이 비어있으면 링크 제거
    if (!url) {
      editor.chain().focus().unsetLink().run();
      onCloseForm();
      return;
    }

    if (!isSelected) {
      // 선택된 텍스트가 없으면 링크가 포함된 텍스트를 직접 삽입
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`)
        .run();
    } else {
      // 선택된 텍스트에 링크만 설정
      editor
        .chain()
        .focus()
        .setLink({
          href: url,
          target: '_blank',
          rel: 'noopener noreferrer',
        })
        .run();
    }

    // 폼 닫기
    onCloseForm();
  };

  // Enter 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
    if (e.key === 'Escape') {
      onCloseForm();
    }
  };

  return (
    <form className="w-300 z-10 flex flex-col gap-12 border border-gray-100 bg-white p-16 shadow-sm">
      <div>
        <label className="flex flex-col gap-8">
          <span className="text-14 block font-medium text-neutral-900">링크 URL</span>

          <TextInput
            {...register('url')}
            id="link-url"
            type="url"
            onKeyDown={handleKeyPress}
            placeholder="https://example.com"
            autoFocus
            classNames={{
              wrapper: 'rounded-4 h-40 px-8',
            }}
          />
        </label>

        {errors.url && (
          <p className="text-12 text-danger mt-4 whitespace-pre-wrap">{errors.url.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-8">
        <Button variant="gray" size={40} onClick={onCloseForm}>
          취소
        </Button>

        <Button variant="primary" size={40} onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          {url ? '수정' : '확인'}
        </Button>
      </div>
    </form>
  );
}
