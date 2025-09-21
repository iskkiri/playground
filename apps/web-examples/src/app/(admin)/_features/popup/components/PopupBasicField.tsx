import TextInput from '@repo/ui/form/TextInput/TextInput';
import { type Control } from 'react-hook-form';
import type { PopupRegisterSchema } from '../schemas/popupRegister.schema';
import Form from '@repo/ui/form/Form/Form';

interface PopupBasicFieldProps {
  control: Control<PopupRegisterSchema>;
}

export default function PopupBasicField({ control }: PopupBasicFieldProps) {
  return (
    <Form.Field
      control={control}
      name="title"
      render={({ field }) => (
        <Form.Item className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
          <Form.Label className="flex items-center self-stretch bg-gray-100 p-16">
            팝업명
          </Form.Label>
          <Form.Control>
            <div className="p-16">
              <TextInput {...field} />
            </div>
          </Form.Control>
        </Form.Item>
      )}
    />
  );
}
