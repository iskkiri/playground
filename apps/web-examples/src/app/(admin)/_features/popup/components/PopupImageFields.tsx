import Radio from '@repo/ui/form/Radio/Radio';
import TextInput from '@repo/ui/form/TextInput/TextInput';
import ImageAttachment from '@/_features/image/components/ImageAttachment/ImageAttachment';
import { Controller, type Control } from 'react-hook-form';
import type { PopupRegisterSchema } from '../schemas/popupRegister.schema';
import Form from '@repo/ui/form/Form/Form';
import { insertImage, removeImage } from '@/_features/image/utils/image.utils';

interface PopUpImageUrlFieldsProps {
  control: Control<PopupRegisterSchema>;
}

export default function PopupImageFields({ control }: PopUpImageUrlFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
        <label className="flex items-center self-stretch bg-gray-100 p-16">팝업 이미지</label>
        {/*  */}
        <div className="flex flex-col gap-8 p-16">
          <Form.Field
            control={control}
            name="popupImage"
            render={({ field }) => (
              <ImageAttachment
                insertedImageObj={field.value}
                onInsertImage={insertImage({
                  onChange: field.onChange,
                  fileSizeLimit: 10,
                  storageImage: field.value?.storageImage,
                })}
                onRemoveImage={removeImage({
                  onChange: field.onChange,
                  storageImage: field.value?.storageImage,
                })}
              />
            )}
          />

          <Form.Field
            control={control}
            name="link"
            render={({ field }) => (
              <Form.Control>
                <TextInput {...field} placeholder="링크를 입력해 주세요" />
              </Form.Control>
            )}
          />
        </div>
      </div>

      <Form.Field
        control={control}
        name="popupWidthStatus"
        render={({ field: popupWidthStatusField }) => (
          <Form.Item className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
            <Form.Label className="flex items-center self-stretch bg-gray-100 p-16">
              이미지 너비
            </Form.Label>

            <div className="flex flex-col gap-8 p-16">
              <div className="flex gap-8">
                <Form.Control>
                  <Radio
                    name="popupWidthStatus"
                    value={'AUTO'}
                    onChange={popupWidthStatusField.onChange}
                    checked={popupWidthStatusField.value === 'AUTO'}
                  >
                    자동
                  </Radio>
                </Form.Control>

                <Controller
                  control={control}
                  name="popupWidthStatus"
                  render={({ field: popupWidthStatusField }) => (
                    <Radio
                      name="popupWidthStatus"
                      value={'DIRECT'}
                      onChange={popupWidthStatusField.onChange}
                      checked={popupWidthStatusField.value === 'DIRECT'}
                      aria-label="이미지 너비 직접 입력"
                    >
                      직접 입력
                    </Radio>
                  )}
                />
              </div>

              {popupWidthStatusField.value === 'DIRECT' && (
                <Form.Field
                  control={control}
                  name="imageWidth"
                  render={({ field: imageWidthField }) => (
                    <div className="flex items-center gap-8">
                      <TextInput placeholder="이미지 너비(px)" type="number" {...imageWidthField} />
                      <span>px</span>
                    </div>
                  )}
                />
              )}
            </div>
          </Form.Item>
        )}
      />
    </>
  );
}
