import TextInput from '@repo/ui/form/TextInput/TextInput';
import Button from '@repo/ui/general/Button/Button';
import ImageAttachment from '@/_features/image/components/ImageAttachment/ImageAttachment';
import type { UseFormReturn } from 'react-hook-form';
import type { BannerRegisterSchema } from '../schemas/bannerRegister.schema';
import type { ImageSchema } from '@/_features/image/schemas/image.schema';

interface BannerFormProps {
  onGoBack: () => void;
  register: UseFormReturn<BannerRegisterSchema>['register'];
  insertedMobileImageFile: ImageSchema;
  onInsertMobileImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveMobileImage: (e: React.MouseEvent) => void;
  insertedPcImageFile: ImageSchema;
  onInsertPcImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePcImage: (e: React.MouseEvent) => void;
  onSubmit: (e: React.BaseSyntheticEvent) => void;
  isSubmitDisabled: boolean;
}

export default function BannerForm({
  onGoBack,
  register,
  insertedMobileImageFile,
  onInsertMobileImage,
  onRemoveMobileImage,
  insertedPcImageFile,
  onInsertPcImage,
  onRemovePcImage,
  onSubmit,
  isSubmitDisabled,
}: BannerFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-32">
      <div className="rounded-8 border border-gray-200">
        <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
          <div className="flex items-center self-stretch bg-gray-100 p-16">배너명</div>
          <div className="p-16">
            <TextInput {...register('title')} placeholder="배너명을 입력해 주세요" />
          </div>
        </div>

        <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
          <div className="flex items-center self-stretch bg-gray-100 p-16">모바일용 이미지</div>
          <div className="flex flex-col gap-8 p-16">
            <ImageAttachment
              insertedImageObj={insertedMobileImageFile}
              onInsertImage={onInsertMobileImage}
              onRemoveImage={onRemoveMobileImage}
              ariaLabel="모바일용 배너 이미지 첨부"
            />
            <TextInput {...register('mobileLink')} placeholder="링크를 입력해 주세요" />
          </div>
        </div>

        <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
          <div className="flex items-center self-stretch bg-gray-100 p-16">PC용 이미지</div>
          <div className="flex flex-col gap-8 p-16">
            <ImageAttachment
              insertedImageObj={insertedPcImageFile}
              onInsertImage={onInsertPcImage}
              onRemoveImage={onRemovePcImage}
              ariaLabel="PC용 배너 이미지 첨부"
            />
            <TextInput {...register('pcLink')} placeholder="링크를 입력해 주세요" />
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
  );
}
