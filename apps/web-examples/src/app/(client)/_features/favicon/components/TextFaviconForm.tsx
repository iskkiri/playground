import type { Control } from 'react-hook-form';
import type { TextFaviconSchema } from '../schemas/textFavicon.schema';
import Form from '@repo/ui/form/Form/Form';

interface TextFaviconFormProps {
  control: Control<TextFaviconSchema>;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
}

export default function TextFaviconForm({ control, onSubmit }: TextFaviconFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-16">
      <Form.Field
        control={control}
        name="text"
        render={({ field }) => (
          <Form.Item>
            <Form.Label>텍스트 (첫 글자만 사용됩니다)</Form.Label>
            <Form.Control>
              <input
                {...field}
                placeholder="예: A, 홈, 회사"
                className="rounded-8 focus:ring-primary w-full border border-gray-300 px-12 py-8 focus:outline-none focus:ring-2"
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={control}
        name="backgroundColor"
        render={({ field }) => (
          <Form.Item>
            <Form.Label>배경색</Form.Label>
            <div className="flex items-center space-x-8">
              <input
                type="color"
                value={field.value}
                onChange={field.onChange}
                className="rounded-4 h-40 w-48 cursor-pointer border border-gray-300"
              />
              <Form.Control>
                <input
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-8 focus:ring-primary flex-1 border border-gray-300 px-12 py-8 focus:outline-none focus:ring-2"
                  placeholder="#000000"
                />
              </Form.Control>
            </div>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={control}
        name="textColor"
        render={({ field }) => (
          <Form.Item>
            <Form.Label>텍스트 색상</Form.Label>
            <div className="flex items-center space-x-8">
              <input
                type="color"
                value={field.value}
                onChange={field.onChange}
                className="rounded-4 h-40 w-48 cursor-pointer border border-gray-300"
              />
              <Form.Control>
                <input
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-8 focus:ring-primary flex-1 border border-gray-300 px-12 py-8 focus:outline-none focus:ring-2"
                  placeholder="#ffffff"
                />
              </Form.Control>
            </div>
            <Form.Message />
          </Form.Item>
        )}
      />

      <button className="rounded-8 bg-primary hover:bg-primary-dark focus:ring-primary w-full px-16 py-8 text-white focus:outline-none focus:ring-2">
        파비콘 생성
      </button>
    </form>
  );
}
