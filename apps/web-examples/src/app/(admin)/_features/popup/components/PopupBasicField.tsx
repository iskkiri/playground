import TextInput from '@repo/ui/form/TextInput/TextInput';
import { UseFormRegister } from 'react-hook-form';
import type { PopupRegisterSchema } from '../schemas/popupRegister.schema';

interface PopupBasicFieldProps {
  register: UseFormRegister<PopupRegisterSchema>;
}

export default function PopupBasicField({ register }: PopupBasicFieldProps) {
  return (
    <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
      <div className="flex items-center self-stretch bg-gray-100 p-16">팝업명</div>
      <div className="p-16">
        <TextInput {...register('title')} placeholder="팝업명을 입력해 주세요" />
      </div>
    </div>
  );
}
