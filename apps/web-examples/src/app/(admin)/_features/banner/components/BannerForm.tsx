import TextInput from '@repo/ui/form/TextInput/TextInput';
import Button from '@repo/ui/general/Button/Button';
import ImageAttachment from '@/_features/image/components/ImageAttachment/ImageAttachment';
import type { UseFormReturn } from 'react-hook-form';
import type { BannerRegisterSchema } from '../schemas/bannerRegister.schema';
import Form from '@repo/ui/form/Form/Form';
import { insertImage, removeImage } from '@/_features/image/utils/image.utils';

interface BannerFormProps {
  form: UseFormReturn<BannerRegisterSchema>;
  isSubmitDisabled: boolean;
  onSubmit: (e: React.BaseSyntheticEvent) => void;
  onGoBack: () => void;
}

export default function BannerForm({
  form,
  isSubmitDisabled,
  onSubmit,
  onGoBack,
}: BannerFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-32">
        <div className="rounded-8 border border-gray-200">
          <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
            <div className="flex items-center self-stretch bg-gray-100 p-16">배너명</div>
            <Form.Field
              control={form.control}
              name="title"
              render={({ field }) => (
                <div className="p-16">
                  <TextInput {...field} placeholder="배너명을 입력해 주세요" />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
            <div className="flex items-center self-stretch bg-gray-100 p-16">모바일용 이미지</div>
            <div className="flex flex-col gap-8 p-16">
              <Form.Field
                control={form.control}
                name="mobileImage"
                render={({ field }) => (
                  <ImageAttachment
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
                    ariaLabel="모바일용 배너 이미지 첨부"
                  />
                )}
              />

              <Form.Field
                control={form.control}
                name="mobileLink"
                render={({ field }) => (
                  <Form.Control>
                    <TextInput
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      placeholder="링크를 입력해 주세요"
                    />
                  </Form.Control>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
            <div className="flex items-center self-stretch bg-gray-100 p-16">PC용 이미지</div>
            <div className="flex flex-col gap-8 p-16">
              <Form.Field
                control={form.control}
                name="pcImage"
                render={({ field }) => (
                  <ImageAttachment
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
                    ariaLabel="PC용 배너 이미지 첨부"
                  />
                )}
              />

              <Form.Field
                control={form.control}
                name="pcLink"
                render={({ field }) => (
                  <Form.Control>
                    <TextInput
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      placeholder="링크를 입력해 주세요"
                    />
                  </Form.Control>
                )}
              />
            </div>
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
    </Form>
  );
}
