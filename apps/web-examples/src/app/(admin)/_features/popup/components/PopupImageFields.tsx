import Radio from '@repo/ui/Radio/Radio';
import TextInput from '@repo/ui/TextInput/TextInput';
import ImageAttachment from '@/_features/image/components/ImageAttachment/ImageAttachment';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { PopupRegisterSchema } from '../schemas/popupRegister.schema';
import type { ImageSchema } from '@/_features/image/schemas/image.schema';

interface PopUpImageUrlFieldsProps {
  control: UseFormReturn<PopupRegisterSchema>['control'];
  register: UseFormReturn<PopupRegisterSchema>['register'];
  insertedImageObj: ImageSchema;
  onInsertImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (e: React.MouseEvent) => void;
  isDirectImageWidth: boolean;
}

export default function PopupImageFields({
  control,
  register,
  insertedImageObj,
  onInsertImage,
  onRemoveImage,
  isDirectImageWidth,
}: PopUpImageUrlFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
        <div className="flex items-center self-stretch bg-gray-100 p-16">팝업 이미지</div>
        <div className="flex flex-col gap-8 p-16">
          <ImageAttachment
            insertedImageObj={insertedImageObj}
            onInsertImage={onInsertImage}
            onRemoveImage={onRemoveImage}
          />
          <TextInput {...register('link')} placeholder="링크를 입력해 주세요" />
        </div>
      </div>

      <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
        <div className="flex items-center self-stretch bg-gray-100 p-16">이미지 너비</div>
        <div className="flex flex-col gap-8 p-16">
          <div className="flex gap-8">
            <Controller
              control={control}
              name="popupWidthStatus"
              render={({ field: { onChange, value } }) => (
                <Radio
                  name="popupWidthStatus"
                  value={'AUTO'}
                  onChange={onChange}
                  checked={value === 'AUTO'}
                >
                  자동
                </Radio>
              )}
            />

            <Controller
              control={control}
              name="popupWidthStatus"
              render={({ field: { onChange, value } }) => (
                <Radio
                  name="popupWidthStatus"
                  value={'DIRECT'}
                  onChange={onChange}
                  checked={value === 'DIRECT'}
                  aria-label="이미지 너비 직접 입력"
                >
                  직접 입력
                </Radio>
              )}
            />
          </div>

          {isDirectImageWidth && (
            <div className="flex items-center gap-8">
              <TextInput placeholder="이미지 너비(px)" {...register('imageWidth')} type="number" />
              <span>px</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
